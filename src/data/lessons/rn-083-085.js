export const lesson = {
  id: 'rn-083-085',
  version: '0.83-0.85',
  title: 'Hermes V1、预编译与动画后端',
  subtitle: '性能默认值继续前移，调试和测试包边界更清楚',
  period: '2025-2026',
  level: 'Latest',
  theme: '性能与工具',
  whyItMatters:
    '截至 2026-05-04，本课程覆盖到 React Native 0.85。0.83-0.85 的重点是把性能和工具链改进继续前移到默认路径：React 19.2、Hermes V1 默认、iOS 预编译二进制、DevTools 增强、新动画后端、Jest preset 独立。它们共同说明 RN 正在减少“每个项目自己调性能和工具”的成本，但也要求团队持续维护 Node、测试、构建和动画依赖的版本边界。',
  features: [
    {
      title: 'React 19.2 与 DevTools',
      body: '0.83 更新到 React 19.2，并继续增强 RN DevTools。React 错误栈、调试能力和 renderer 行为会逐步与 React 最新能力对齐，但应用仍要关注 RN renderer 的支持范围。'
    },
    {
      title: 'Hermes V1 by default',
      body: '0.84 将 Hermes V1 设为默认 JS 引擎，让编译器和 VM 改进成为新项目默认收益。对性能敏感项目，要重新建立启动、TTI、内存和长任务基线，而不是沿用旧 Hermes 结论。'
    },
    {
      title: 'Precompiled iOS binaries',
      body: '0.84 默认使用 iOS 预编译二进制，减少首次构建和 native dependency 编译成本。这会改变 CI 时间、缓存策略和排查原生编译问题的方式。'
    },
    {
      title: 'New Animation Backend',
      body: '0.85 引入共享动画后端，让 Animated 和 Reanimated 底层能力更统一。Animated 可以用 native driver 驱动更多布局属性动画，减少 JS 线程参与带来的掉帧风险。'
    },
    {
      title: 'Jest preset 独立',
      body: '0.85 将 Jest preset 从 react-native 包中拆到 @react-native/jest-preset。这个变化看似小，但体现出核心包边界收缩，测试工具链也需要显式维护。'
    },
    {
      title: 'Node 与工具链最低线',
      body: '0.85 放弃 EOL Node 版本支持。RN 项目升级时，Node、Xcode、JDK、Gradle、CocoaPods、Jest 都可能成为前置条件。'
    }
  ],
  deepDive: [
    {
      title: '性能默认值变化后怎么学习',
      items: [
        'Hermes V1 默认后，要重新记录项目的冷启动、首屏、内存、bundle load 和交互可用时间。',
        '动画后端增强不等于所有动画自动流畅。布局频繁变更、大量重渲染、图片解码和 JS 长任务仍会造成掉帧。',
        '预编译二进制减少构建成本，但如果项目有自定义 native patch 或源码调试需求，要理解如何回退或调整构建方式。'
      ]
    },
    {
      title: '模板维护清单',
      items: [
        'Jest preset 改为 @react-native/jest-preset，并确认 transform、mock、setupFiles 没有依赖旧包路径。',
        'Node 版本满足 RN 要求，CI 与本地版本一致，避免“本地能跑 CI 失败”。',
        'Metro TLS、DevTools 多连接、debugOptimized 等工具能力可以进入团队开发模板，而不是每个项目临时配置。'
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
