export const lesson = {
  id: 'rn-074-076',
  version: '0.74-0.76',
  title: 'New Architecture 进入默认时代',
  subtitle: 'Fabric、TurboModules、Bridgeless 与 RN DevTools 汇合',
  period: '2024',
  level: 'Architecture',
  theme: '新架构',
  whyItMatters:
    'New Architecture 是 RN 从旧 Bridge 时代走向 JSI、Fabric、TurboModules 和 Bridgeless 的系统性重构。\n0.76 默认启用意味着它不再只是高级选项，而是主路径。\n学习这一段要从"怎么打开开关"深入到"为什么架构要换"：渲染系统要支持 React 并发能力，原生模块调用要减少序列化和异步边界限制，三方库也要围绕新 contract 重新适配。\n\nNew Architecture 的核心动机包括：\n1) 旧 Bridge 是异步的，频繁跨边界调用会积累延迟，新 JSI 提供同步访问能力；\n2) 旧渲染流程中 JS 和 Native 是分离的，新 Fabric 统一调度，支持 React 并发；\n3) 原生模块的加载是"all or nothing"的，TurboModules 支持按需加载和tree-shaking；\n4) 整个生态需要一个清晰的现代化方向，不能永远维护两套系统。',
  features: [
    {
      title: 'Yoga 3.0',
      body: 'Yoga 是 RN 的跨平台布局引擎。\nYoga 3.0 带来更现代的 Flexbox 行为和修正，也提醒我们：RN 布局不是浏览器 CSS 引擎，布局变化可能影响真实页面，需要视觉回归和关键页面验证。\n\nYoga 3.0 的关键变化：\n1) gap 支持改进，现在更接近 CSS Flexbox 规范；\n2) 百分比单位处理更精确；\n3) 某些边界情况的布局结果改变，这可能导致页面显示位置微调；\n4) 性能改进，布局计算更快。即使是"小改"也需要在 release 前全面验证。'
    },
    {
      title: 'Bridgeless New Architecture',
      body: 'Bridgeless 减少旧 Bridge 依赖，让 JS 与 Native 通过 JSI 等机制更直接互操作。\n这不是单个性能开关，而是模块系统、渲染系统、事件和调度方式共同变化。\n\nBridgeless 意味着：\n1) 没有 MessageQueue，JS 和 Native 可以同步调用（前提是通过 JSI）；\n2) native module 的注册和加载流程改变，从"启动时注册所有"变成"按需加载"；\n3) 事件流程简化，某些需要 bridge 中转的交互可以直接进行；\n4) 调试工具链变化，旧的远程调试方式不再适用。'
    },
    {
      title: 'React Native DevTools',
      body: '新的官方 DevTools 延续"在真实 RN runtime 附近调试"的方向。\n它减少旧 Remote JS Debugging 带来的环境偏差，对 Hermes、新架构和后续性能工具更重要。\n\nDevTools 的改进包括：\n1) 更准确的性能度量，直接从 Hermes 或原生 runtime 采集数据；\n2) React Debugger 集成，可以在真实设备上进行 React Profiler 分析；\n3) 网络和存储检查工具；\n4) 减少了环境差异，代码在调试时的行为更接近生产。'
    },
    {
      title: 'Fabric 与 TurboModules',
      body: 'Fabric 是新 renderer，负责 native UI tree 与 React tree 的协作。\nTurboModules 是新 native module 系统，让模块按需加载并通过更清晰的类型 contract 暴露能力。\n\n两者的关键作用：\n1) Fabric 通过 Shadow Tree 在 JS thread 做 layout，再批量 commit 给 main thread，降低主线程压力；\n2) Fabric 支持 React Concurrent 特性，比如 Suspense、transition；\n3) TurboModules 通过 TypeScript/Flow 定义接口，编译时生成 Glue Code，减少运行时开销；\n4) TurboModules 按需加载，只有调用时才被实例化，减少启动成本。'
    }
  ],
  deepDive: [
    {
      title: '架构组件怎么分工',
      items: [
        'JSI 是 JS engine 与 C++/Native 交互的基础层，绕开旧 Bridge 的 JSON 序列化模型。',
        'Fabric 关注 UI 渲染、Shadow Tree、布局和 commit；它为 React 并发渲染能力铺路。',
        'TurboModules 关注 native module 的注册、懒加载和类型化调用边界。',
        'JSI 让 JS 和 Native 可以互相引用对象，而不是序列化成 JSON。这允许实时数据绑定、事件流和回调而不需要复制数据。',
        'Fabric 的 Shadow Tree 是 UI 树的中间表示，在 JS thread 计算 layout 后提交给 main thread 应用。这比旧方式（JS thread 计算后通过 Bridge 序列化）性能高得多。',
        'TurboModules 的类型定义使得 native 和 JS 侧的调用可以在编译时验证，减少运行时错误和类型混淆。'
      ]
    },
    {
      title: '迁移策略',
      items: [
        '先清点所有 native dependency：UI component、native module、navigation、gesture、animation、storage 都要检查兼容性。',
        '优先在 0.76/0.81 这类允许观察和迁移的版本中验证，再进入 New Architecture only 的版本。',
        '不要只跑 happy path。要覆盖冷启动、导航、列表滚动、手势、动画、权限和崩溃监控。',
        '设立性能基线，对比新旧架构的启动时间、内存占用、列表滚动帧率。新架构应该更好，如果没有改进要排查问题。',
        '新架构下，某些原来在 Bridge 侧的性能 hotspot 可能移到 Fabric 侧，需要重新分析性能数据。',
        '三方库的兼容性差异大。优先用官方支持的库，对不兼容的库要么升级要么替换，不要试图同时维护旧新两种适配。'
      ]
    },
    {
      title: '新架构的陷阱',
      items: [
        'Fabric 没有完全向后兼容旧 renderer。某些边界情况（如特殊样式组合、嵌套复杂）可能行为不同。需要全量验证。',
        'JSI 引入的是同步调用能力，但不是所有 native 操作都应该同步。IO、网络、长计算仍然应该异步。误用会导致卡顿。',
        '新架构下 debugger 不再是"暂停 JS thread 后看状态"那样简单，因为 native UI 更新和 JS 调度更紧密。调试时要理解这种新的执行模型。',
        'TurboModules 的懒加载和 tree-shaking 很好，但调试时可能因为 module 尚未加载而看不到。需要确保被调用时才需要存在。'
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
    },
    {
      title: '理解 Fabric 中的 Shadow Tree',
      description:
        'Fabric 的核心概念是 Shadow Tree，它在 JS thread 计算布局，再提交给 main thread。这个模式对性能至关重要。',
      code: `// Shadow Tree 的执行流程可以这样理解：

// 1. JS thread: 组件状态改变 → React reconciliation
// 2. JS thread: 生成新的 Shadow Tree（虚拟视图树）
// 3. JS thread: Yoga 引擎计算布局（width、height、position）
// 4. JS thread: 生成 commit（所有改动的批处理）
// 5. main thread: 接收 commit，应用到真实 native view
// 6. main thread: 触发屏幕刷新

// 这样做的好处：
// - JS thread 不会阻塞 main thread 的触摸、动画响应
// - 布局计算和 native update 分离，性能更可控
// - 支持 React 并发特性（Suspense、transition）

// 实践中要注意：
// - 不要在 render 中做昂贵计算，Shadow Tree 生成时仍然会执行
// - useMemo 等优化仍然有效，因为它减少了 reconciliation 的范围
// - 新架构下某些"在旧架构无感的性能问题"会暴露，需要重新分析 profile`
    },
    {
      title: '正确使用 JSI 对象引用',
      description:
        'JSI 允许 JS 直接引用 native 对象而不需要序列化。但这也意味着生命周期和内存管理有新的考虑。',
      code: `// 旧方式（Bridge）：每次调用都序列化
// JS:
//   { id: 1, name: "device" }
//                    ↓
//         JSON 序列化 → 网络 Bridge
//                    ↓
// Native: JSON 反序列化 → { id: 1, name: "device" }

// JSI 方式：直接对象引用
import { NativeModules } from 'react-native';

const nativeDevice = NativeModules.Device;

// 不要频繁保存 native 对象引用
let cachedDevice = null; // ❌ 可能导致生命周期问题

export function getBatterySync() {
  // ✓ 每次调用时获取，让 JSI binding 管理生命周期
  return NativeModules.Device.getBatteryLevel();
}

// 对于需要长期保持的引用，用 useRef
import { useRef } from 'react';

export function useBatteryMonitor() {
  const deviceRef = useRef(NativeModules.Device);
  
  // 这样在组件生命周期内保持稳定的引用
  return deviceRef.current;
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
