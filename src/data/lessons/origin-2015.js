export const lesson = {
  id: 'origin-2015',
  version: '2015',
  title: 'React Native 诞生',
  subtitle: '把 React 的声明式模型带到原生移动端',
  period: '2015',
  level: 'Foundation',
  theme: '跨端 UI',
  whyItMatters:
    'React Native 的核心价值不是“用 JavaScript 写一个移动网页”，而是把 React 的声明式 UI、组件组合和状态驱动模型接到平台原生视图上。学习这个阶段要先建立正确心智：JS 负责描述界面和业务状态，iOS/Android 负责真实控件、触摸、滚动、文字排版和平台能力。理解这条边界，后面学习性能、新架构、原生模块和升级问题时才不会把 RN 误解成浏览器环境。',
  features: [
    {
      title: '原生视图渲染',
      body: 'View、Text、Image 不是 div、span、img，而是 React Native 对平台视图能力的抽象。React 负责决定组件树长什么样，RN renderer 再把它映射到 native view hierarchy。布局、触摸反馈、滚动惯性和文本渲染因此可以使用系统能力。'
    },
    {
      title: 'Learn once, write anywhere',
      body: 'RN 不是承诺“一份代码完全无差异跑所有平台”，而是复用 React 的开发模型，同时允许你在必要时为 iOS/Android 写平台差异。真正成熟的 RN 项目通常共享业务和大部分 UI，同时保留 Platform 分支、平台文件和原生能力入口。'
    },
    {
      title: 'Bridge 通信模型',
      body: '早期架构中，JS 与 Native 通过异步 Bridge 传递序列化消息。这个模型让 RN 可以跨语言工作，但频繁跨边界调用、传递大量数据或依赖同步返回值时会暴露性能和架构限制。后来的 JSI、TurboModules、Fabric 都是在改进这条边界。'
    },
    {
      title: '移动端约束不同于 Web',
      body: '移动应用有启动时间、内存、低端设备、离线、系统权限、App Store 发布和原生崩溃等约束。RN 学习不能只学组件写法，还要理解打包、原生工程、调试和性能测量这些移动端工程问题。'
    }
  ],
  deepDive: [
    {
      title: '核心心智',
      items: [
        'JSX 在 RN 中描述的是 native component tree，不是 DOM tree；因此没有 CSS cascade、DOM API、浏览器事件模型这些默认能力。',
        'React state 更新会触发 reconciliation，但最终是否流畅还取决于 native view 更新、layout 计算、主线程压力和 JS 线程是否被阻塞。',
        '跨平台复用的边界要主动设计：业务逻辑、数据请求、状态管理通常高度共享；导航、权限、支付、相机等能力常需要平台意识。'
      ]
    },
    {
      title: '常见误区',
      items: [
        '不要把 RN 当成“移动端 React DOM”。遇到布局、文本、省略、滚动、输入法时，优先查 RN 文档和平台行为。',
        '不要过早追求 100% 共享代码。适当的平台差异可以换来更自然的用户体验和更低的维护成本。',
        '不要只在模拟器里判断体验。触摸延迟、启动速度、内存和低端机掉帧都需要真机验证。'
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
    }
  ],
  checklist: ['能解释 RN 不是 WebView。', '能说清 JS 和 Native 的职责边界。', '能写出第一个原生组件树。'],
  sourceUrls: ['https://reactnative.dev/blog/2015/03/26/react-native-bringing-modern-web-techniques-to-mobile']
};
