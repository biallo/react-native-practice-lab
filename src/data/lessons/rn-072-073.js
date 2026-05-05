export const lesson = {
  id: 'rn-072-073',
  version: '0.72-0.73',
  title: '包解析与调试基础升级',
  subtitle: '现代 npm、monorepo 与符号链接支持更稳',
  period: '2023',
  level: 'Tooling',
  theme: 'Metro',
  whyItMatters:
    'RN 项目的打包器不是 Webpack/Vite，而是 Metro。\n随着 npm 生态越来越依赖 package exports、workspace、symlink 和 monorepo，Metro 能否正确解析包，直接决定大型项目能否稳定开发。\n0.72/0.73 让 RN 更靠近现代包分发规则，也让"依赖解析"成为每个 RN 工程师必须掌握的底层知识。\n\nMetro 的核心职责包括：\n1) 模块解析（module resolution）：在 node_modules 中查找模块；\n2) 依赖图构建（dependency graph）：递归收集所有依赖；\n3) 代码转换（transformation）：通过 babel 等工具转换代码；\n4) Bundle 分割（bundle splitting）：生成多个入口对应的 bundles；\n5) 缓存管理（caching）：增量编译。其中模块解析是最容易出问题的地方。',
  features: [
    {
      title: 'Package Exports',
      body: 'package.json 的 exports 字段允许包作者明确暴露哪些入口。\nMetro 支持它之后，现代库更容易在 RN 中工作；但它也会让过去依赖内部路径的 deep import 失效或解析到不同文件。\n\nExports 的关键作用：\n1) 树摇：打包工具只 bundle 导出的内容，剔除内部实现和 dead code；\n2) API 边界清晰：包作者控制哪些 API 稳定，哪些是内部的；\n3) 平台差异：可以为 react-native、browser 等指定不同入口；\n4) 重定向：比如 /theme 可以映射到不同文件；\n5) 版本兼容：通过 exports 做渐进式 API 迁移。'
    },
    {
      title: 'Stable symlink support',
      body: 'workspace 常通过 symlink 连接本地包。\n稳定 symlink 支持让 monorepo 中的 app、design system、shared utils 能更自然地协作，减少复制包、手写 alias 和 watch 配置的脆弱方案。\n\nSymlink 的问题包括：\n1) 循环依赖：A → B → A 的 symlink 导致无限递归；\n2) 缓存失效：Metro 的缓存可能跟不上 symlink 更新；\n3) Node 解析差异：symlink 的真实路径和指向路径可能被不同对待；\n4) 权限问题：某些环境不支持 symlink。0.72+ 改进了这些场景的处理。'
    },
    {
      title: '调试改进',
      body: 'Metro 报错质量会影响排障速度。\n解析失败、重复 React、平台文件选择、source map 和 transform cache 都可能让问题看起来像业务 bug。\n更好的调试基础能帮助你先定位构建层，而不是误改业务代码。\n\n调试工具包括：\n1) react-native config：查看 CLI 发现的配置；\n2) Metro 的 debug logs：--verbose 输出详细的解析过程；\n3) 手动 resolve：npx metro-resolver 模拟解析；\n4) 依赖图可视化：某些工具可以展示完整的依赖关系。'
    },
    {
      title: '平台入口选择',
      body: 'RN 支持 .ios.js、.android.js、.native.js 等平台扩展。\n和 exports 结合后，包作者需要明确平台入口，应用作者也要理解 resolver 最终选中了哪个文件。\n\n平台解析的规则：\n1) 扩展优先级：.ios.js > .native.js > .js；\n2) 目录也支持平台后缀；\n3) exports 和 platform extension 的组合需要谨慎设计，避免解析到错误的平台版本；\n4) 某些库在某个平台没有实现时，需要明确的 fallback 逻辑。'
    }
  ],
  deepDive: [
    {
      title: 'Resolver 的工作原理',
      items: [
        'Metro resolver 负责把 import specifier 解析成真实文件，并考虑平台后缀、exports、node_modules 和 watch roots。',
        '同一个包在 Node、Web bundler、Metro 中可能解析到不同入口。遇到“只有 RN 报错”时，先查实际入口。',
        'monorepo 中重复安装 React 或 react-native 会导致 hook、renderer、native module 等难查问题。'
      ]
    },
    {
      title: '排查依赖解析问题',
      items: [
        '检查包的 package.json：main、module、react-native、exports 字段分别指向哪里。',
        '确认 Metro watchFolders 覆盖 workspace 源码，同时 blockList/extraNodeModules 没有制造重复依赖。',
        '清理 Metro cache 只能作为验证步骤；根因通常是入口、版本或依赖树。',
        '重复的 React 问题最常见：npm ls react 看是否出现多个版本。Monorepo 需要在 root package.json 中明确 resolutions。',
        'Watch 监听失败导致热更新不工作：确认文件变更时 Metro 的 watch list 包含该文件，某些 IDE 的保存机制可能不会触发 fs watch。'
      ]
    },
    {
      title: 'Metro 配置陷阱',
      items: [
        'projectRoot 和 watchFolders 配置不当导致文件找不到或监听范围错误。',
        'transformer 配置可能影响非 JS 文件（如 JSON）的处理，导致 import json 报错。',
        'resolver 的 blockList 用于排除某些文件或目录，但过宽会导致无意中屏蔽需要的文件。',
        'getTransformOptions 返回的选项会影响每个文件的转换，不当使用导致某些模块无法正确编译。'
      ]
    }
  ],
  code: `// 一个面向 RN 的共享包可以明确暴露公共入口。
// package.json
{
  "name": "@acme/mobile-ui",
  "exports": {
    ".": "./src/index.ts",
    // 只暴露稳定 API，避免应用层 deep import 到内部文件。
    "./theme": "./src/theme.ts"
  }
}

// app code
import { Button } from '@acme/mobile-ui';
import { colors } from '@acme/mobile-ui/theme';`,
  codeExamples: [
    {
      title: '用 package exports 约束公共入口',
      description:
        'exports 的重点不是多写配置，而是声明哪些路径是稳定 API。这样应用层不会随意 deep import 到包内部实现。',
      code: `// 一个面向 RN 的共享包可以明确暴露公共入口。
// package.json
{
  "name": "@acme/mobile-ui",
  "exports": {
    ".": "./src/index.ts",
    // 只暴露稳定 API，避免应用层 deep import 到内部文件。
    "./theme": "./src/theme.ts"
  }
}

// app code
import { Button } from '@acme/mobile-ui';
import { colors } from '@acme/mobile-ui/theme';`
    },
    {
      title: 'Monorepo 中的 Metro watchFolders',
      description:
        'workspace 项目常见问题是 Metro 看不到本地包源码，或解析到了重复依赖。这个配置片段展示排查方向。',
      code: `// metro.config.js
const path = require('path');
const { getDefaultConfig } = require('@react-native/metro-config');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');
const config = getDefaultConfig(projectRoot);

// 让 Metro 监听 workspace 中的共享包源码。
config.watchFolders = [workspaceRoot];

// 避免 monorepo 中出现多个 react-native 实例。
config.resolver.extraNodeModules = {
  'react-native': path.join(projectRoot, 'node_modules/react-native')
};

module.exports = config;`
    }
  ],
  checklist: ['理解 exports 的意义。', '知道 Metro 是 RN 的打包器。', '能排查常见依赖解析问题。'],
  sourceUrls: [
    'https://reactnative.dev/blog/2023/06/21/package-exports-support',
    'https://reactnative.dev/blog/2023/12/06/0.73-debugging-improvements-stable-symlinks'
  ]
};
