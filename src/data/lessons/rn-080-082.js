export const lesson = {
  id: 'rn-080-082',
  version: '0.80-0.82',
  title: '稳定 JS API 与新架构唯一化',
  subtitle: '深层导入告警、Strict TypeScript API、New Architecture only',
  period: '2025',
  level: 'Architecture',
  theme: '稳定 API',
  whyItMatters:
    '0.80-0.82 是 RN 从“兼容历史灵活性”走向“稳定公共边界”的关键阶段。深层导入告警和 Strict TypeScript API 是在收紧 JS API；0.82 New Architecture only 则是在收紧架构边界。对于长期维护项目，这意味着升级不再只是改版本号，而是要清理内部 API 依赖、验证新架构兼容、让类型和模块入口都对齐官方公共 contract。',
  features: [
    {
      title: 'Deep imports deprecation',
      body: '从 react-native/Libraries/* 导入内部文件会产生告警，因为这些路径不是稳定 API。过去这样做可能解决短期问题，但会把应用绑到 RN 内部目录结构上，升级时非常脆弱。'
    },
    {
      title: 'Strict TypeScript API',
      body: 'Strict TypeScript API 让类型更接近官方想稳定暴露的 JS API。它不只是“类型更严格”，而是在帮助应用提前发现依赖私有 API、错误类型假设和未来不可用入口。'
    },
    {
      title: 'New Architecture only',
      body: '0.82 开始 New Architecture 成为唯一架构，Legacy Architecture 开关不再提供逃生门。迁移工作必须在升级前完成，尤其是三方 native modules 和自研 native components。'
    },
    {
      title: 'DOM Node APIs',
      body: 'native component refs 开始提供部分类 DOM 节点 API，例如树遍历和布局测量。这让 Web 与 RN 的部分底层模型靠近，但它仍然不是浏览器 DOM，能力范围和性能成本都要按 RN 文档理解。'
    },
    {
      title: 'Android debugOptimized',
      body: '0.82 引入/回传 debugOptimized 构建类型，让开发时获得更接近 release 的渲染和动画性能，同时仍保留 JS 调试能力。'
    }
  ],
  deepDive: [
    {
      title: '公共 API 为什么重要',
      items: [
        '公共 API 是 RN 团队承诺维护的边界；内部路径可能改名、移动、删除或改变行为。',
        '依赖内部 API 的代码通常隐藏在工具函数、patch、三方库 fork 中，升级前要用搜索和 lint 先清出来。',
        '类型收紧不是麻烦，而是提前暴露升级风险。越晚修，越可能和架构迁移、React 升级混在一起。'
      ]
    },
    {
      title: '0.82 升级路线',
      items: [
        '先在 0.81 或 Expo SDK 54 这类仍可迁移的版本启用新架构并跑全量验证。',
        '清理 deep imports、自研 native module 旧接口、未适配 Fabric 的 UI 组件。',
        '升级到 0.82 后重点观察启动、导航、动画、列表、崩溃监控和 native module 调用。'
      ]
    }
  ],
  code: `// Before: 依赖内部路径，升级风险高。
import { Alert } from 'react-native/Libraries/Alert/Alert';

// After: 使用公共入口，让代码依赖 RN 承诺维护的 API。
import { Alert } from 'react-native';`,
  codeExamples: [
    {
      title: '清理 deep imports',
      description:
        '这类改动看起来小，但它是升级 0.80+ 的基础卫生。公共入口才是 RN 承诺维护的 API 边界。',
      code: `// Before: 依赖内部路径，升级风险高。
import { Alert } from 'react-native/Libraries/Alert/Alert';

// After: 使用公共入口，让代码依赖 RN 承诺维护的 API。
import { Alert } from 'react-native';

export function showDeleteConfirm() {
  Alert.alert('Delete item?', 'This action cannot be undone.');
}`
    },
    {
      title: '用脚本扫描风险导入',
      description:
        '真实项目里 deep import 往往藏在工具文件或旧组件里。升级前可以先用搜索脚本列出风险点，再逐个替换。',
      code: `# 搜索 react-native 内部路径导入。
rg "react-native/Libraries|react-native/.+/.*" src

# 常见处理方式:
# 1. 能从 react-native 根入口导出的，改成根入口。
# 2. 根入口没有的，确认是否应该自己实现封装。
# 3. 三方库触发的，升级库或给上游提 PR。`
    }
  ],
  checklist: ['能解释为什么要稳定 JS API。', '知道 0.82 的 New Architecture only 意味着什么。', '会识别深层导入风险。'],
  sourceUrls: [
    'https://reactnative.dev/blog/2025/06/12/react-native-0.80',
    'https://reactnative.dev/blog/2025/06/12/moving-towards-a-stable-javascript-api',
    'https://reactnative.dev/blog/2025/10/08/react-native-0.82'
  ]
};
