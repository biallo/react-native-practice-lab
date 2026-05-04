export const lesson = {
  id: 'rn-072-073',
  version: '0.72-0.73',
  title: '包解析与调试基础升级',
  subtitle: '现代 npm、monorepo 与符号链接支持更稳',
  period: '2023',
  level: 'Tooling',
  theme: 'Metro',
  whyItMatters:
    'RN 项目的打包器不是 Webpack/Vite，而是 Metro。随着 npm 生态越来越依赖 package exports、workspace、symlink 和 monorepo，Metro 能否正确解析包，直接决定大型项目能否稳定开发。0.72/0.73 让 RN 更靠近现代包分发规则，也让“依赖解析”成为每个 RN 工程师必须掌握的底层知识。',
  features: [
    {
      title: 'Package Exports',
      body: 'package.json 的 exports 字段允许包作者明确暴露哪些入口。Metro 支持它之后，现代库更容易在 RN 中工作；但它也会让过去依赖内部路径的 deep import 失效或解析到不同文件。'
    },
    {
      title: 'Stable symlink support',
      body: 'workspace 常通过 symlink 连接本地包。稳定 symlink 支持让 monorepo 中的 app、design system、shared utils 能更自然地协作，减少复制包、手写 alias 和 watch 配置的脆弱方案。'
    },
    {
      title: '调试改进',
      body: 'Metro 报错质量会影响排障速度。解析失败、重复 React、平台文件选择、source map 和 transform cache 都可能让问题看起来像业务 bug。更好的调试基础能帮助你先定位构建层，而不是误改业务代码。'
    },
    {
      title: '平台入口选择',
      body: 'RN 支持 .ios.js、.android.js、.native.js 等平台扩展。和 exports 结合后，包作者需要明确平台入口，应用作者也要理解 resolver 最终选中了哪个文件。'
    }
  ],
  deepDive: [
    {
      title: 'Resolver 心智',
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
        '清理 Metro cache 只能作为验证步骤；根因通常是入口、版本或依赖树。'
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
