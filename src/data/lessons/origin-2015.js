export const lesson = {
  id: 'origin-2015',
  version: '2015',
  title: 'React Native 诞生',
  subtitle: '把 React 的声明式模型带到原生移动端',
  period: '2015',
  level: 'Foundation',
  theme: '跨端 UI',
  whyItMatters:
    'React Native 的核心价值不是"用 JavaScript 写一个移动网页"，而是把 React 的声明式 UI、组件组合和状态驱动模型接到平台原生视图上。学习这个阶段要先建立正确心智：JS 负责描述界面和业务状态，iOS/Android 负责真实控件、触摸、滚动、文字排版和平台能力。理解这条边界，后面学习性能、新架构、原生模块和升级问题时才不会把 RN 误解成浏览器环境。\n\nReact Native 的出现解决了移动开发的一个核心痛点：开发者希望复用 Web 生态的开发模式（声明式 UI、热更新、快速迭代），但又不想用 WebView 因为这会损失原生性能。RN 的设计思路是在 JS 和 Native 之间建立清晰的通信边界，让 JS 仅负责业务逻辑和 UI 描述，而把渲染和性能关键路径交给 Native。这个架构设计对后续所有版本的优化都有指导意义。',
  features: [
    {
      title: '原生视图渲染',
      body: 'View、Text、Image 不是 div、span、img，而是 React Native 对平台视图能力的抽象。React 负责决定组件树长什么样，RN renderer 再把它映射到 native view hierarchy。布局、触摸反馈、滚动惯性和文本渲染因此可以使用系统能力。\n\n这意味着：1) CSS 没有 cascade，只有 Flexbox 布局；2) 样式来自 StyleSheet 定义的集合，不是任意 CSS 属性；3) 没有 DOM API，改用 React Ref 和组件 props 通信；4) 触摸事件不同于浏览器（onResponderGrant vs onMouseDown）；5) 列表滚动由原生控件处理，性能接近原生应用。这种设计让 RN 应用的流畅度能接近真正的原生应用。'
    },
    {
      title: 'Learn once, write anywhere',
      body: 'RN 不是承诺"一份代码完全无差异跑所有平台"，而是复用 React 的开发模型，同时允许你在必要时为 iOS/Android 写平台差异。真正成熟的 RN 项目通常共享业务和大部分 UI，同时保留 Platform 分支、平台文件和原生能力入口。\n\n实践中这通常意味着：1) 业务逻辑、数据处理、状态管理 100% 共享；2) 通用 UI 组件共享，平台特异性强的组件（如输入法、日期选择）做平台版本；3) 原生能力封装成统一 JS API，但可能因平台不同有不同实现；4) 导航框架通常需要平台特化（iOS UIViewController vs Android Activity）；5) 性能优化策略也因平台而异。这是一种务实的跨端方案，既避免了代码重复，又保留了对每个平台的优化空间。'
    },
    {
      title: 'Bridge 通信模型',
      body: '早期架构中，JS 与 Native 通过异步 Bridge 传递序列化消息。这个模型让 RN 可以跨语言工作，但频繁跨边界调用、传递大量数据或依赖同步返回值时会暴露性能和架构限制。后来的 JSI、TurboModules、Fabric 都是在改进这条边界。\n\nBridge 架构的关键问题包括：1) 所有通信都是异步的，JS 调用原生方法需要排队等待回调；2) 消息需要序列化（JSON），大数据量传输低效；3) 无法实现高频率的同步调用（如响应触摸事件的精细控制）；4) Bridge 队列堆积会导致 JS 线程和 Native 线程同时阻塞；5) 调试困难，因为跨越了语言和进程边界。理解 Bridge 的瓶颈对后续学习新架构、性能优化和原生模块集成至关重要。'
    },
    {
      title: '移动端约束不同于 Web',
      body: '移动应用有启动时间、内存、低端设备、离线、系统权限、App Store 发布和原生崩溃等约束。RN 学习不能只学组件写法，还要理解打包、原生工程、调试和性能测量这些移动端工程问题。\n\n具体约束包括：1) 启动时间：用户期望应用在 1-3 秒内显示首屏，超过则容易被卸载；2) 内存：移动设备内存远小于服务器，过多的 JS bundle 和运行时内存会触发系统杀进程；3) 低端设备：必须在搭载 2-3 年前 CPU 和 2GB 内存的设备上流畅运行；4) 离线优先：网络不稳定是常态，需要本地缓存和离线容错；5) 系统权限：摄像头、地理位置等权限需要用户明确授予且随时可撤销；6) App Store 发布：iOS 有 App Store Review，Android 有用户权限和恶意软件检查；7) 原生崩溃：JS 异常可以被捕获，但原生层崩溃会直接导致应用退出。这些约束往往决定了应用的质量和用户体验。'
    }
  ],
  deepDive: [
    {
      title: '核心心智',
      items: [
        'JSX 在 RN 中描述的是 native component tree，不是 DOM tree；因此没有 CSS cascade、DOM API、浏览器事件模型这些默认能力。',
        'React state 更新会触发 reconciliation，但最终是否流畅还取决于 native view 更新、layout 计算、主线程压力和 JS 线程是否被阻塞。',
        '跨平台复用的边界要主动设计：业务逻辑、数据请求、状态管理通常高度共享；导航、权限、支付、相机等能力常需要平台意识。',
        'React 的 Fiber 架构在 RN 中同样存在，state 更新会被分割成可中断的任务，但由于涉及 native bridge 调用，中断带来的延迟可能比 Web 更明显。',
        '理解 RN 的运行流程至关重要：JS bundle 加载 → JS engine 初始化 → Native bridge 建立 → 首屏组件挂载 → Native view 渲染到屏幕。每个环节的瓶颈不同。'
      ]
    },
    {
      title: '常见误区',
      items: [
        '不要把 RN 当成"移动端 React DOM"。遇到布局、文本、省略、滚动、输入法时，优先查 RN 文档和平台行为。',
        '不要过早追求 100% 共享代码。适当的平台差异可以换来更自然的用户体验和更低的维护成本。',
        '不要只在模拟器里判断体验。触摸延迟、启动速度、内存和低端机掉帧都需要真机验证。',
        'RN 的热重载（Hot Reload）和 Fast Refresh 是开发便利，但在生产构建中这些机制会被禁用，性能表现会明显不同。',
        '原生模块的引入是"不可逆"的，需要重新编译和打包。轻易引入重的原生依赖可能导致应用体积暴增和升级成本增加。'
      ]
    },
    {
      title: 'Bridge 通信深入',
      items: [
        'Bridge 是同步序列化发送的：JS 调用 Native 方法时，JS 会被暂停直到消息被放入队列，然后继续执行其他工作。这个"暂停"时间虽然很短，但在高频调用（如滚动回调）时会累积。',
        '序列化的开销不容忽视。传递大的对象或数组时（如高分辨率图片的像素数据），序列化成 JSON 再在 Native 侧反序列化会产生显著延迟和内存压力。',
        'Callback 机制：JS 调用 Native 后需要 callback，这个 callback 会被保存在 Bridge 的映射表中，直到 Native 侧返回。如果 callback 永不被调用（Native 侧 bug），JS 侧会内存泄漏。',
        '理解 MessageQueue：RN 的 Bridge 实际上是两个消息队列的实现，Native 和 JS 各一个，它们通过定时的批量刷新进行同步。这解释了为什么 Native 回调不是立即执行的。'
      ]
    }
  ],
  code: `import { Platform, StyleSheet, Text, View } from 'react-native';

export function HelloNative() {
  return (
    <View style={styles.card}>
      {/* Text 会渲染成平台原生文本控件，不是 DOM 节点。 */}
      <Text style={styles.title}>Hello native UI from React</Text>

      {/* 平台差异可以保留在组件内部，避免到处散落 if 判断。 */}
      <Text style={styles.caption}>
        Running on {Platform.OS}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 24,
    borderRadius: 12,
    backgroundColor: '#ffffff'
  },
  title: {
    fontSize: 20,
    fontWeight: '700'
  },
  caption: {
    marginTop: 8,
    color: '#66706b'
  }
});`,
  codeExamples: [
    {
      title: '组件树映射到原生视图',
      description:
        '这个例子强调 RN 不是 DOM 环境。View/Text 会进入原生视图树，StyleSheet 约束的是 RN 支持的样式集合，Platform 用来保留必要的平台差异。',
      code: `import { Platform, StyleSheet, Text, View } from 'react-native';

export function HelloNative() {
  return (
    <View style={styles.card}>
      {/* Text 会渲染成平台原生文本控件，不是 DOM 节点。 */}
      <Text style={styles.title}>Hello native UI from React</Text>

      {/* 平台差异可以集中在组件内部，避免散落在业务页面里。 */}
      <Text style={styles.caption}>Running on {Platform.OS}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 24,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 12
      },
      android: {
        elevation: 4
      }
    })
  },
  title: {
    fontSize: 20,
    fontWeight: '700'
  },
  caption: {
    marginTop: 8,
    color: '#66706b'
  }
});`
    },
    {
      title: '把平台差异收敛成小函数',
      description:
        '复习 RN 时要特别注意：跨端不是消灭差异，而是管理差异。把平台分支封装起来，调用方就能保持稳定 API。',
      code: `import { Platform } from 'react-native';

export function getHitSlop(size = 8) {
  // Android 触摸目标通常更依赖 hitSlop 扩大可点区域。
  // iOS 也可使用，但真实体验要用真机检查。
  return Platform.select({
    ios: { top: size, right: size, bottom: size, left: size },
    android: { top: size * 1.5, right: size * 1.5, bottom: size * 1.5, left: size * 1.5 },
    default: { top: size, right: size, bottom: size, left: size }
  });
}`
    },
    {
      title: '理解状态驱动的重渲染',
      description:
        '这个例子演示 React state 的改变如何驱动 native view 的重新渲染。注意状态变化是同步的（在 JS 线程），但视图更新需要经过 layout 和 native 渲染。',
      code: `import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export function Counter() {
  const [count, setCount] = useState(0);
  
  const handlePress = () => {
    // 这是同步的 state 更新，会立即触发 reconciliation。
    setCount(prev => prev + 1);
    // console.log(count) 这里仍然是旧值，因为 state 更新是异步的。
  };

  return (
    <View style={styles.container}>
      <Text style={styles.count}>{count}</Text>
      <Pressable 
        onPress={handlePress}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed
        ]}
      >
        <Text>Press me</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  count: { fontSize: 24, marginBottom: 16 },
  button: { padding: 12, backgroundColor: '#007AFF', borderRadius: 8 },
  buttonPressed: { opacity: 0.7 }
});`
    },
    {
      title: '避免 Bridge 过载：批量操作',
      description:
        '频繁的 Bridge 调用会影响性能。这个例子展示如何通过批量操作减少跨边界通信次数。在处理大列表或频繁回调时这很重要。',
      code: `import { useEffect, useRef } from 'react';
import { NativeModules, ScrollView, StyleSheet, Text, View } from 'react-native';

export function ListPerformance() {
  const batchQueue = useRef([]);
  
  // 不好的做法：在每个 item 的 onViewableItemsChanged 里直接调用 Native
  const onItemViewableNaive = (viewableItems) => {
    viewableItems.forEach(item => {
      // 每个 item 都产生一次 Bridge 调用 ❌
      NativeModules.Logger?.logEvent?.('item_viewed', { id: item.key });
    });
  };
  
  // 更好的做法：收集然后批量发送
  const onItemViewableBetter = (viewableItems) => {
    batchQueue.current = [
      ...batchQueue.current,
      ...viewableItems.map(item => ({ id: item.key }))
    ];
    
    // 防抖，200ms 后一次性发送
    if (!batchQueue.current.timerId) {
      batchQueue.current.timerId = setTimeout(() => {
        if (batchQueue.current.length > 0) {
          // 单次 Bridge 调用，传递所有数据 ✓
          NativeModules.Logger?.logEvents?.('items_viewed', batchQueue.current);
          batchQueue.current = [];
        }
      }, 200);
    }
  };

  return <View style={styles.container}><Text>Batch is important</Text></View>;
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' }
});`
    },
    {
      title: '平台差异的最小化实践',
      description:
        '实际项目中，平台差异主要集中在三个地方：样式、组件选择和原生能力调用。这个模式可以推广到其他场景。',
      code: `import { Platform, StyleSheet, Text, View } from 'react-native';

// 把样式差异集中定义
const platformStyles = Platform.select({
  ios: StyleSheet.create({
    safeArea: {
      paddingTop: 12,
      paddingBottom: 12
    }
  }),
  android: StyleSheet.create({
    safeArea: {
      paddingTop: 8,
      paddingBottom: 8
    }
  })
});

// 把组件差异集中定义
const HeaderText = ({ children, style }) => {
  return (
    <Text 
      style={[
        {
          fontSize: Platform.select({ ios: 20, android: 18 }),
          fontWeight: Platform.select({ ios: '700', android: '600' })
        },
        style
      ]}
    >
      {children}
    </Text>
  );
};

// 业务页面保持平台无关
export function HomePage() {
  return (
    <View style={platformStyles.safeArea}>
      <HeaderText>Welcome</HeaderText>
    </View>
  );
}`
    }
  ],
  checklist: ['能解释 RN 不是 WebView。', '能说清 JS 和 Native 的职责边界。', '能写出第一个原生组件树。'],
  sourceUrls: ['https://reactnative.dev/blog/2015/03/26/react-native-bringing-modern-web-techniques-to-mobile']
};
