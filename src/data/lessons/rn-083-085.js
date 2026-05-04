export const lesson = {
  id: 'rn-083-085',
  version: '0.83-0.85',
  title: 'Hermes V1、预编译与动画后端',
  subtitle: '性能默认值继续前移，调试和测试包边界更清楚',
  period: '2025-2026',
  level: 'Latest',
  theme: '性能与工具',
  whyItMatters:
    '截至 2026-05-04，本课程覆盖到 React Native 0.85。\n0.83-0.85 的重点是把性能和工具链改进继续前移到默认路径：React 19.2、Hermes V1 默认、iOS 预编译二进制、DevTools 增强、新动画后端、Jest preset 独立。\n它们共同说明 RN 正在减少"每个项目自己调性能和工具"的成本，但也要求团队持续维护 Node、测试、构建和动画依赖的版本边界。\n\n这个阶段的特殊意义在于 RN 的发展方向变得越来越清晰：\n1) 核心包（react-native）的职责进一步聚焦，工具链分散到专门的包（jest-preset、devtools 等）；\n2) 性能默认值不断前移，新项目开箱即用的性能基线提高；\n3) 依赖的外部工具越来越多（Node、Xcode、JDK），项目团队需要维护更复杂的工具链；\n4) 调试和测试能力内置化，开发体验改进；\n5) 大版本升级变得更复杂，需要同时升级多个工具链组件。',
  features: [
    {
      title: 'React 19.2 与 DevTools',
      body: '0.83 更新到 React 19.2，并继续增强 RN DevTools。React 错误栈、调试能力和 renderer 行为会逐步与 React 最新能力对齐，但应用仍要关注 RN renderer 的支持范围。\n\nReact 19 的新特性：\n1) use() hook：更优雅的异步数据处理；\n2) Server Components：为后续离线和边界计算做准备；\n3) ref callback cleanup：更精确的资源管理；\n4) 改进的错误栈：更容易定位问题。但这些特性在 RN renderer 中的支持程度需要检查。'
    },
    {
      title: 'Hermes V1 by default',
      body: '0.84 将 Hermes V1 设为默认 JS 引擎，让编译器和 VM 改进成为新项目默认收益。\n对性能敏感项目，要重新建立启动、TTI、内存和长任务基线，而不是沿用旧 Hermes 结论。\n\nHermes V1 的改进包括：\n1) 更快的字节码编译；\n2) 改进的 JIT 编译（允许在某些情况下 JIT 优化）；\n3) 更激进的内存压缩和 GC；\n4) 更好的 source map 支持；\n5) 开发模式性能改进。但这也意味着某些原来在 JSC 或旧 Hermes 上的性能假设需要重新验证。'
    },
    {
      title: 'Precompiled iOS binaries',
      body: '0.84 默认使用 iOS 预编译二进制，减少首次构建和 native dependency 编译成本。\n这会改变 CI 时间、缓存策略和排查原生编译问题的方式。\n\n预编译二进制的含义：\n1) 第一次 pod install 会下载预构建的 .xcframework，而不是从源码编译；\n2) CI 时间大幅减少（从 10+ 分钟到 1 分钟）；\n3) 但这也意味着无法直接修改 RN 源码调试；\n4) 如果需要自定义 RN build，需要回退到从源码编译的模式；\n5) 二进制版本和源码版本需要保持一致。'
    },
    {
      title: 'New Animation Backend',
      body: '0.85 引入共享动画后端，让 Animated 和 Reanimated 底层能力更统一。\nAnimated 可以用 native driver 驱动更多布局属性动画，减少 JS 线程参与带来的掉帧风险。\n\n新动画后端的能力：\n1) useNativeDriver 现在支持更多属性（如 width、height）；\n2) 动画帧率和主线程脱耦；\n3) 复杂手势动画（如 PanResponder + Animated）可以更顺滑；\n4) Reanimated 的性能改进；\n5) 但某些高阶用法仍需要监控性能。'
    },
    {
      title: 'Jest preset 独立',
      body: '0.85 将 Jest preset 从 react-native 包中拆到 @react-native/jest-preset。\n这个变化看似小，但体现出核心包边界收缩，测试工具链也需要显式维护。\n\n独立的原因和影响：\n1) 解耦 RN 版本和 Jest 版本迭代；\n2) Jest 可以独立快速迭代，不需要等 RN 大版本；\n3) 项目需要显式安装和更新 jest-preset；\n4) babel、ts-jest 等集成可能需要调整；\n5) 旧配置的 react-native preset 不再工作。'
    },
    {
      title: 'Node 与工具链最低线',
      body: '0.85 放弃 EOL Node 版本支持。\nRN 项目升级时，Node、Xcode、JDK、Gradle、CocoaPods、Jest 都可能成为前置条件。\n\n完整工具链的维护成本：\n1) Node：>=20；\n2) Xcode：>=15 (iOS)；\n3) JDK：>=17 (Android)；\n4) Gradle：>=8.0；\n5) CocoaPods：>=1.14；\n6) Jest：>=29；\n7) CLI 工具：>=0.85。团队需要有明确的升级计划和验证流程，而不是随意升级导致 CI 失败。'
    }
  ],
  deepDive: [
    {
      title: '性能默认值变化后怎么学习',
      items: [
        'Hermes V1 默认后，要重新记录项目的冷启动、首屏、内存、bundle load 和交互可用时间。',
        '动画后端增强不等于所有动画自动流畅。布局频繁变更、大量重渲染、图片解码和 JS 长任务仍会造成掉帧。',
        '预编译二进制减少构建成本，但如果项目有自定义 native patch 或源码调试需求，要理解如何回退或调整构建方式。',
        '性能改进来自多个方向（引擎、二进制、动画），无法通过单一对比验证。需要对比老版本的完整基线。',
        '新动画后端可能改变某些动画的行为，需要在实际场景中做 A/B 测试和用户反馈收集。'
      ]
    },
    {
      title: '模板维护清单',
      items: [
        'Jest preset 改为 @react-native/jest-preset，并确认 transform、mock、setupFiles 没有依赖旧包路径。',
        'Node 版本满足 RN 要求，CI 与本地版本一致，避免"本地能跑 CI 失败"。',
        'Metro TLS、DevTools 多连接、debugOptimized 等工具能力可以进入团队开发模板，而不是每个项目临时配置。',
        '团队的工具链版本应该有明确的升级计划：Node、Xcode、JDK、Gradle、CocoaPods 应该同步升级到 RN 支持的版本。',
        '性能监控应该跟进引擎变化，建立新的基线而不是复用旧数据。'
      ]
    },
    {
      title: '升级建议',
      items: [
        '从 0.73 升级到 0.85 涉及架构（New Architecture）、引擎（Hermes V1）、工具链（Jest preset）、构建（预编译）等多个方向，需要分阶段升级。',
        '先升级到 0.76 New Architecture optional 版本，验证核心功能和关键三方库兼容性。',
        '再升级到 0.83，检查 React 19 的新特性适配和 DevTools 集成。',
        '最后升级到 0.85，同时升级 Node、Jest preset、工具链。',
        '升级后需要重新做性能测量、视觉测试和关键交互链路测试。'
      ]
    }
  ],
  code: `// React Native 0.85: Jest preset 迁移。
// jest.config.js
export default {
  // preset 不再来自 react-native 包本身。
  preset: '@react-native/jest-preset',

  // setup 文件集中放测试环境 mock，例如 NativeModules、gesture、storage。
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
};`,
  codeExamples: [
    {
      title: 'Jest preset 迁移到独立包',
      description:
        '0.85 后测试配置要显式依赖 @react-native/jest-preset。升级时要同步检查 setup、mock 和 transform 配置。',
      code: `// React Native 0.85: Jest preset 迁移。
// jest.config.js
export default {
  // preset 不再来自 react-native 包本身。
  preset: '@react-native/jest-preset',

  // setup 文件集中放测试环境 mock，例如 NativeModules、gesture、storage。
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
};`
    },
    {
      title: '动画后端能力增强后的 Animated 写法',
      description:
        '新动画后端让更多布局相关动画可以走 native driver。学习重点是：哪些值可以脱离 JS 线程，哪些业务逻辑仍会阻塞交互。',
      code: `import { Animated, Pressable, StyleSheet } from 'react-native';
import { useRef } from 'react';

export function ExpandableBar() {
  const width = useRef(new Animated.Value(120)).current;

  const expand = () => {
    Animated.timing(width, {
      toValue: 280,
      duration: 280,
      // 新动画后端让更多布局属性可以由 native driver 驱动。
      useNativeDriver: true
    }).start();
  };

  return (
    <Pressable onPress={expand}>
      <Animated.View style={[styles.bar, { width }]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 40,
    borderRadius: 20,
    backgroundColor: '#94d2bd'
  }
});`
    },
    {
      title: '升级前检查 Node 与工具链版本',
      description:
        '近期 RN 版本对 Node 和原生工具链要求更明确。把版本检查写进 CI，可以减少“本地能跑、CI 失败”的时间损耗。',
      code: `# package.json
{
  "engines": {
    "node": ">=20.19.4"
  },
  "scripts": {
    "doctor": "npx react-native doctor",
    "test": "jest"
  }
}

# CI 中先检查 Node，再安装依赖。
node --version
npm ci
npm run doctor`
    }
  ],
  checklist: ['知道 0.85 是当前课程覆盖的最新稳定版本。', '能说出 Hermes V1 默认化的意义。', '了解 Jest preset 独立带来的配置变化。'],
  sourceUrls: [
    'https://reactnative.dev/blog/2025/12/10/react-native-0.83',
    'https://reactnative.dev/blog/2026/02/11/react-native-0.84',
    'https://reactnative.dev/blog/2026/04/07/react-native-0.85'
  ]
};
