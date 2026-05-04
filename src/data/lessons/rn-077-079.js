export const lesson = {
  id: 'rn-077-079',
  version: '0.77-0.79',
  title: '样式、React 19 与工具链加速',
  subtitle: '从 UI 细节到 Metro 启动速度的连续改进',
  period: '2025',
  level: 'Tooling',
  theme: '效率',
  whyItMatters:
    '0.77-0.79 展示了 RN 成熟期的升级方向：不只是大架构变化，也持续补齐样式表达、React 版本能力和工具链速度。\n对真实项目来说，这些改进会影响 UI 还原、React API 可用性、Metro 冷启动、CI 时间和现代包兼容性。\n学习这一段要培养“版本升级收益评估”能力：哪些收益直接改善业务，哪些需要模板和依赖配合，哪些会暴露潜在兼容问题。',
  features: [
    {
      title: '新样式能力',
      body: '0.77 带来 display: contents、boxSizing、mixBlendMode、outline 等样式补齐。\n它们让 RN 更容易表达复杂 UI，但每个样式都要理解平台支持和降级方式，尤其是 Android/iOS 渲染差异。'
    },
    {
      title: 'React 19',
      body: '0.78 引入 React 19，让 RN 可以逐步获得新的 React 能力、错误栈和并发相关改进。\n但 RN 与 React DOM 的支持节奏不同，学习时要区分 React 核心特性、RN renderer 支持和框架集成。'
    },
    {
      title: 'Metro deferred hashing',
      body: '0.79 中 Metro 使用 deferred hashing 改善启动速度，尤其对大项目和 monorepo 更明显。\n工具链速度提升会直接减少开发等待和 CI 成本，是团队生产力的一部分。'
    },
    {
      title: 'JSC 社区化与调试迁移',
      body: '0.79/0.80 附近，JSC 支持和 Remote JS Debugging 的路线都发生变化。\n项目要把默认引擎、调试工具和三方库兼容性纳入升级计划。'
    }
  ],
  deepDive: [
    {
      title: '样式补齐如何影响 UI 工程',
      items: [
        '新增样式能力可以减少额外 wrapper 或平台分支，但仍要用 RN 支持矩阵判断能否用于生产。',
        '视觉差异要在 iOS/Android 都验证，尤其是混合、轮廓、文本和布局边界。',
        '团队可以把“最低 RN 版本支持的样式集合”写进设计系统文档，避免组件库使用过新的样式。'
      ]
    },
    {
      title: 'React 与 Metro 升级心智',
      items: [
        'React 版本升级不等于 Web 示例可以照搬到 RN；要看 RN renderer 是否支持对应能力。',
        'Metro 变快不会修复依赖结构问题。exports/imports 稳定后，深层导入和非标准包结构更容易暴露问题。',
        'CI 中缓存策略、lockfile、Node 版本和 Metro cache 会共同影响构建稳定性。'
      ]
    }
  ],
  code: `// 0.79 后 package exports/imports 解析稳定启用。
// 应用层应该导入包公开的入口，而不是依赖内部文件路径。
import { createClient } from '@acme/mobile-sdk';

const client = createClient({
  // 配置集中在应用层，SDK 内部实现可以随版本调整。
  platform: 'react-native'
});

// 避免:
// import createClient from '@acme/mobile-sdk/dist/native/client';
// 这类 deep import 在 exports 收紧后很容易失效。`,
  codeExamples: [
    {
      title: '只依赖现代包的公开入口',
      description:
        '0.79 后 exports/imports 解析更稳定，应用层应主动避免 deep import。这样升级 Metro 或依赖版本时更不容易炸。',
      code: `// 0.79 后 package exports/imports 解析稳定启用。
// 应用层应该导入包公开的入口，而不是依赖内部文件路径。
import { createClient } from '@acme/mobile-sdk';

const client = createClient({
  // 配置集中在应用层，SDK 内部实现可以随版本调整。
  platform: 'react-native'
});

// 避免:
// import createClient from '@acme/mobile-sdk/dist/native/client';
// 这类 deep import 在 exports 收紧后很容易失效。`
    },
    {
      title: '样式补齐后的组件写法',
      description:
        '新增样式能力可以让组件更简洁，但要确认项目最低 RN 版本支持。设计系统组件尤其应该标注样式依赖的 RN 版本。',
      code: `import { StyleSheet, Text, View } from 'react-native';

export function NoticeCard({ title, body }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 8,
    padding: 16,
    borderRadius: 12,
    outlineWidth: 1,
    outlineColor: '#d9dfd5'
  },
  title: {
    fontWeight: '700'
  },
  body: {
    color: '#53615d'
  }
});`
    }
  ],
  checklist: ['能描述 0.77 样式补齐方向。', '知道 0.78 和 React 19 的关系。', '理解 0.79 对 Metro 的影响。'],
  sourceUrls: [
    'https://reactnative.dev/blog/2025/01/21/version-0.77',
    'https://reactnative.dev/blog/2025/02/19/react-native-0.78',
    'https://reactnative.dev/blog/2025/04/08/react-native-0.79'
  ]
};
