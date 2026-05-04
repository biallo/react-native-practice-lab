export const lesson = {
  id: 'rn-064-070',
  version: '0.64-0.70',
  title: 'Hermes 成为默认引擎',
  subtitle: '启动性能、内存占用和 Android 包体积进入主线优化',
  period: '2021-2022',
  level: 'Performance',
  theme: '运行时',
  whyItMatters:
    'Hermes 把 JavaScript 引擎从"可替换的运行时细节"变成 RN 性能路线的核心部分。它面向移动端启动、内存和字节码加载优化；当它逐步覆盖 iOS 并成为默认引擎后，RN 项目的性能基线发生了变化。学习这一段要理解：性能不是只靠少写 render，JS 引擎、bundle 形式、调试方式、构建模式都会影响用户感知。\n\nHermes 的核心创新包括：1) 字节码预编译：在构建时把 JS 编译成字节码，运行时直接加载，避免解析成本；2) 低内存占用：字节码更紧凑，GC 算法针对移动设备优化；3) 更小的 bundle 体积：字节码可以被优化和压缩；4) 快速启动：无需 JIT 预热，启动快速且稳定。这些特性对移动应用至关重要，因为用户不会容忍超过 3 秒的启动时间。',
  features: [
    {
      title: 'Hermes on iOS',
      body: '0.64 让 iOS 也能使用 Hermes，减少 Android 与 iOS 在 JS 引擎上的差异。跨平台行为更一致后，团队可以用更统一的方式分析启动、内存和 runtime bug。\n\n这个变化的意义：1) 之前 Android 用 Hermes、iOS 用 JSC 导致行为差异，比如某个 JS bug 只在 Android 上出现；2) 现在双平台都能用 Hermes，一致的运行环境更易调试；3) iOS 的性能基线提高，启动时间缩短；4) Hermes 的工具链（bytecode 编译、内存分析）可以跨平台应用。'
    },
    {
      title: 'Hermes 默认启用',
      body: '0.70 之后 Hermes 成为默认选择，新项目默认获得字节码预编译和移动端运行时优化。默认值很重要：它让生态库、调试工具和性能分析都围绕 Hermes 作为主路径演进。\n\n默认启用带来的影响：1) 用户期望 RN 应用的启动速度基准提高；2) 库开发者需要在 Hermes 下测试，包括 native 模块的兼容性；3) 调试链路改变，Remote JS Debugging 不再等同于真实运行环境；4) 优化策略改变，比如原来靠 JIT 预热的工作流不再适用。'
    },
    {
      title: '调试链路变化',
      body: '使用 Hermes 时，调试不再等同于"把 JS 放到 Chrome 里跑"。旧 Remote JS Debugging 会改变运行环境，可能掩盖真实设备上的 Hermes 行为。后续 DevTools 路线就是为了在更接近真实 runtime 的环境里调试。\n\n调试链路的关键差异：1) Hermes 的字节码调试：你实际在调试字节码，而不是源代码（需要 source map）；2) Hot Module Replacement 在 Hermes 下可能失效或行为不同；3) 性能分析工具需要适配 Hermes 的内存模型；4) Chrome DevTools 的 performance timeline 可能无法准确反映 Hermes 上的时间分布。'
    },
    {
      title: '性能测量基线',
      body: 'Hermes 对启动和内存有帮助，但业务代码仍可能阻塞 JS 线程。性能分析要区分引擎收益、bundle 体积、首屏渲染、网络等待和主线程布局压力。\n\n性能分解很重要：1) 冷启动时间 = bundle load + JS 初始化 + 首屏render + native view layout。每个环节有不同的优化策略；2) Hermes 主要优化前两项，其他需要业务代码优化；3) 内存峰值可能在启动、滚动或加载大数据时出现，需要针对场景分析；4) 没有量化测量的优化都是盲目的，需要建立完整的性能监控。'
    }
  ],
  deepDive: [
    {
      title: 'JS 引擎会影响什么',
      items: [
        '启动阶段：bundle 解析、字节码加载、模块初始化都会影响 Time to Interactive。',
        '运行阶段：GC、对象分配、长任务和同步计算会影响 JS 线程响应。',
        '调试阶段：不同 debugger 可能让代码运行在不同 JS 引擎里，结论不能直接外推到 release。',
        'Hermes 的字节码预编译阶段发生在构建时，所以运行时不需要解析，减少了启动时间。但字节码化也意味着失去了部分运行时优化机会（如 JIT）。',
        'JS 引擎的内存管理很重要：Hermes 使用不同的 GC 策略（更激进的清理），对于内存受限的移动设备意义重大。但 GC 过度清理也会导致频繁的内存重分配。'
      ]
    },
    {
      title: '性能测试原则',
      items: [
        '优先用真机和 release 或接近 release 的构建测启动、内存和滚动体验。',
        '不要只看平均值。低端 Android、冷启动、首次安装后启动和大列表页面更能暴露问题。',
        '先定位瓶颈在哪条线程，再决定优化 JS、native、图片、网络还是布局。',
        '使用 React Profiler 和 Hermes 的 --dump-heap 等工具做定量分析，避免凭感觉优化。',
        '建立性能基线，追踪关键指标（TTFI、FCP、内存峰值），用数据驱动优化决策。'
      ]
    },
    {
      title: 'Hermes 的优化边界',
      items: [
        'Hermes 解决的是引擎层的问题（字节码加载、GC、内存占用）。它不能优化业务代码的渲染、网络请求或复杂计算。',
        '如果应用的瓶颈是"首屏渲染需要网络数据"，Hermes 帮不了。需要实现预加载、离线缓存或骨架屏。',
        '长 JS 任务会阻塞 JS 线程，导致事件处理延迟、动画掉帧，不管用什么 JS 引擎都解决不了。需要把任务分割、使用 Worker 或优化算法。',
        'Hermes 针对移动设备优化，但不是"魔法"。仍需要合理的代码分割、懒加载和增量渲染策略。'
      ]
    }
  ],
  code: `// 在应用启动早期记录 JS 引擎信息，方便排查线上差异。
const isHermes = Boolean(global.HermesInternal);

if (isHermes) {
  const runtime = global.HermesInternal.getRuntimeProperties?.();

  console.log('Running on Hermes', {
    // 版本信息有助于定位“只有某个 RN/Hermes 组合出问题”的 bug。
    version: runtime?.['OSS Release Version']
  });
} else {
  console.log('Running on another JavaScript engine');
}`,
  codeExamples: [
    {
      title: '记录 Hermes runtime 信息',
      description:
        '性能和线上问题常常只出现在特定 RN/Hermes 组合里。启动时记录 runtime 信息，可以让 crash 和性能日志更容易关联版本。',
      code: `// 在应用启动早期记录 JS 引擎信息，方便排查线上差异。
const isHermes = Boolean(global.HermesInternal);

if (isHermes) {
  const runtime = global.HermesInternal.getRuntimeProperties?.();

  console.log('Running on Hermes', {
    // 版本信息有助于定位特定 RN/Hermes 组合的问题。
    version: runtime?.['OSS Release Version']
  });
} else {
  console.log('Running on another JavaScript engine');
}`
    },
    {
      title: '用启动埋点区分 JS 初始化和首屏渲染',
      description:
        'Hermes 改善 runtime 基线，但业务仍可能在 JS 初始化阶段阻塞。用简单埋点拆开阶段，才能知道应该优化引擎、bundle 还是业务初始化。',
      code: `const startupMarks = [];

export function markStartupStep(name) {
  startupMarks.push({
    name,
    // performance.now 在现代 RN 中更适合做相对耗时记录。
    time: global.performance?.now?.() ?? Date.now()
  });
}

markStartupStep('js_bundle_loaded');

export function reportStartupSteps() {
  console.table(startupMarks);
  // 真实项目应上报到性能平台，而不是只看本地 console。
}`
    },
    {
      title: '避免 JS 长任务阻塞线程',
      description:
        'Hermes 优化的是启动和内存，但业务代码导致的 JS 阻塞它解决不了。这个例子演示如何识别和拆分长任务。',
      code: `import { useState, useCallback } from 'react';
import { Pressable, Text, View } from 'react-native';

export function DataProcessor() {
  const [result, setResult] = useState(null);

  // 坏的做法：同步处理大数组，会阻塞 JS 线程，导致动画卡顿
  const processDataSynchronously = useCallback(() => {
    const largeData = Array.from({ length: 100000 }, (_, i) => i);
    const result = largeData.reduce((acc, val) => acc + val, 0);
    setResult(result);
  }, []);

  // 更好的做法：分批处理，让出线程给动画和用户交互
  const processDataAsync = useCallback(async () => {
    const largeData = Array.from({ length: 100000 }, (_, i) => i);
    let result = 0;
    const batchSize = 10000;

    for (let i = 0; i < largeData.length; i += batchSize) {
      const batch = largeData.slice(i, i + batchSize);
      result += batch.reduce((acc, val) => acc + val, 0);
      
      // 让出事件循环，让其他任务运行
      await new Promise(resolve => setTimeout(resolve, 0));
    }
    
    setResult(result);
  }, []);

  return (
    <View>
      <Pressable onPress={processDataSynchronously}>
        <Text>Process Sync (会卡)</Text>
      </Pressable>
      <Pressable onPress={processDataAsync}>
        <Text>Process Async (不会卡)</Text>
      </Pressable>
    </View>
  );
}`
    },
    {
      title: '使用 useMemo 避免重复计算',
      description:
        '虽然 Hermes 优化了运行时性能，但不必要的重渲染和计算仍会消耗 JS 线程。这个例子展示如何选择性地使用 useMemo。',
      code: `import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export function ListWithComplexItems({ items }) {
  const [filter, setFilter] = useState('');

  // 计算量大的操作应该被 memoize
  const filteredAndSorted = useMemo(() => {
    return items
      .filter(item => item.name.includes(filter))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [items, filter]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.name}</Text>
    </View>
  );

  return (
    <FlatList
      data={filteredAndSorted}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      // 对大列表，指定 maxToRenderPerBatch 减轻主线程压力
      maxToRenderPerBatch={10}
      // updateCellsBatchingPeriod 让 FlatList 分批渲染
      updateCellsBatchingPeriod={50}
    />
  );
}

const styles = StyleSheet.create({
  item: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#ddd' }
});`
    }
  ],
  checklist: ['能说清 Hermes 的价值。', '知道如何判断当前是否运行在 Hermes。', '理解调试工具会受 JS 引擎影响。'],
  sourceUrls: [
    'https://reactnative.dev/blog/2021/03/12/version-0.64',
    'https://reactnative.dev/blog/2022/09/05/version-070'
  ]
};
