export const lesson = {
  id: 'rn-074-076',
  version: '0.74-0.76',
  title: 'New Architecture 进入默认时代',
  subtitle: 'Fabric、TurboModules、Bridgeless 与 RN DevTools 汇合',
  period: '2024',
  level: 'Architecture',
  theme: '新架构',
  whyItMatters:
    'New Architecture 是 RN 从旧 Bridge 时代走向 JSI、Fabric、TurboModules 和 Bridgeless 的系统性重构。0.76 默认启用意味着它不再只是高级选项，而是主路径。学习这一段要从“怎么打开开关”深入到“为什么架构要换”：渲染系统要支持 React 并发能力，原生模块调用要减少序列化和异步边界限制，三方库也要围绕新 contract 重新适配。',
  features: [
    {
      title: 'Yoga 3.0',
      body: 'Yoga 是 RN 的跨平台布局引擎。Yoga 3.0 带来更现代的 Flexbox 行为和修正，也提醒我们：RN 布局不是浏览器 CSS 引擎，布局变化可能影响真实页面，需要视觉回归和关键页面验证。'
    },
    {
      title: 'Bridgeless New Architecture',
      body: 'Bridgeless 减少旧 Bridge 依赖，让 JS 与 Native 通过 JSI 等机制更直接互操作。这不是单个性能开关，而是模块系统、渲染系统、事件和调度方式共同变化。'
    },
    {
      title: 'React Native DevTools',
      body: '新的官方 DevTools 延续“在真实 RN runtime 附近调试”的方向。它减少旧 Remote JS Debugging 带来的环境偏差，对 Hermes、新架构和后续性能工具更重要。'
    },
    {
      title: 'Fabric 与 TurboModules',
      body: 'Fabric 是新 renderer，负责 native UI tree 与 React tree 的协作；TurboModules 是新 native module 系统，让模块按需加载并通过更清晰的类型 contract 暴露能力。'
    }
  ],
  deepDive: [
    {
      title: '架构组件怎么分工',
      items: [
        'JSI 是 JS engine 与 C++/Native 交互的基础层，绕开旧 Bridge 的 JSON 序列化模型。',
        'Fabric 关注 UI 渲染、Shadow Tree、布局和 commit；它为 React 并发渲染能力铺路。',
        'TurboModules 关注 native module 的注册、懒加载和类型化调用边界。'
      ]
    },
    {
      title: '迁移策略',
      items: [
        '先清点所有 native dependency：UI component、native module、navigation、gesture、animation、storage 都要检查兼容性。',
        '优先在 0.76/0.81 这类允许观察和迁移的版本中验证，再进入 New Architecture only 的版本。',
        '不要只跑 happy path。要覆盖冷启动、导航、列表滚动、手势、动画、权限和崩溃监控。'
      ]
    }
  ],
  code: `// android/gradle.properties
# 打开 New Architecture 后，Android 会使用新架构构建路径。
newArchEnabled=true

// ios/Podfile install 时也需要保持新架构配置一致。
# RCT_NEW_ARCH_ENABLED=1 bundle exec pod install

// 迁移 checklist:
// 1. 所有 native modules 支持新架构。
// 2. 关键 UI components 在 Fabric 下表现一致。
// 3. 手势、动画、导航和 crash reporting 全路径验证。`,
  codeExamples: [
    {
      title: '开启新架构并记录迁移检查项',
      description:
        '新架构迁移不是只改一个开关。开关只是入口，真正的工作是检查 native modules、Fabric 组件和关键交互链路。',
      code: `// android/gradle.properties
# 打开 New Architecture 后，Android 会使用新架构构建路径。
newArchEnabled=true

// ios/Podfile install 时也需要保持新架构配置一致。
# RCT_NEW_ARCH_ENABLED=1 bundle exec pod install

// 迁移 checklist:
// 1. 所有 native modules 支持新架构。
// 2. 关键 UI components 在 Fabric 下表现一致。
// 3. 手势、动画、导航和 crash reporting 全路径验证。`
    },
    {
      title: 'Native Module 迁移时要稳定 JS API',
      description:
        '无论旧桥还是 TurboModule，应用层都应该依赖一个稳定封装。这样底层迁移时，业务页面不用感知 native module 注册方式变化。',
      code: `import { NativeModules } from 'react-native';

type DeviceModule = {
  getDeviceName: () => Promise<string>;
};

const NativeDevice = NativeModules.DeviceModule as DeviceModule;

export async function getDeviceName() {
  // 业务层只调用这个函数，不直接散落 NativeModules.DeviceModule。
  // 迁移到 TurboModule 时，只需要替换这里的底层实现。
  return NativeDevice.getDeviceName();
}`
    }
  ],
  checklist: ['能讲清 New Architecture 三个关键词。', '知道升级前要查三方库兼容。', '了解 RN DevTools 的定位。'],
  sourceUrls: [
    'https://reactnative.dev/blog/2024/04/22/release-0.74',
    'https://reactnative.dev/blog/2024/10/23/the-new-architecture-is-here',
    'https://reactnative.dev/blog/2024/10/23/release-0.76-new-architecture'
  ]
};
