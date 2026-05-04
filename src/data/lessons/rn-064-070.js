export const lesson = {
  id: 'rn-064-070',
  version: '0.64-0.70',
  title: 'Hermes 成为默认引擎',
  subtitle: '启动性能、内存占用和 Android 包体积进入主线优化',
  period: '2021-2022',
  level: 'Performance',
  theme: '运行时',
  whyItMatters:
    'Hermes 把 JavaScript 引擎从“可替换的运行时细节”变成 RN 性能路线的核心部分。它面向移动端启动、内存和字节码加载优化；当它逐步覆盖 iOS 并成为默认引擎后，RN 项目的性能基线发生了变化。学习这一段要理解：性能不是只靠少写 render，JS 引擎、bundle 形式、调试方式、构建模式都会影响用户感知。',
  features: [
    {
      title: 'Hermes on iOS',
      body: '0.64 让 iOS 也能使用 Hermes，减少 Android 与 iOS 在 JS 引擎上的差异。跨平台行为更一致后，团队可以用更统一的方式分析启动、内存和 runtime bug。'
    },
    {
      title: 'Hermes 默认启用',
      body: '0.70 之后 Hermes 成为默认选择，新项目默认获得字节码预编译和移动端运行时优化。默认值很重要：它让生态库、调试工具和性能分析都围绕 Hermes 作为主路径演进。'
    },
    {
      title: '调试链路变化',
      body: '使用 Hermes 时，调试不再等同于“把 JS 放到 Chrome 里跑”。旧 Remote JS Debugging 会改变运行环境，可能掩盖真实设备上的 Hermes 行为。后续 DevTools 路线就是为了在更接近真实 runtime 的环境里调试。'
    },
    {
      title: '性能测量基线',
      body: 'Hermes 对启动和内存有帮助，但业务代码仍可能阻塞 JS 线程。性能分析要区分引擎收益、bundle 体积、首屏渲染、网络等待和主线程布局压力。'
    }
  ],
  deepDive: [
    {
      title: 'JS 引擎会影响什么',
      items: [
        '启动阶段：bundle 解析、字节码加载、模块初始化都会影响 Time to Interactive。',
        '运行阶段：GC、对象分配、长任务和同步计算会影响 JS 线程响应。',
        '调试阶段：不同 debugger 可能让代码运行在不同 JS 引擎里，结论不能直接外推到 release。'
      ]
    },
    {
      title: '性能测试原则',
      items: [
        '优先用真机和 release 或接近 release 的构建测启动、内存和滚动体验。',
        '不要只看平均值。低端 Android、冷启动、首次安装后启动和大列表页面更能暴露问题。',
        '先定位瓶颈在哪条线程，再决定优化 JS、native、图片、网络还是布局。'
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
    }
  ],
  checklist: ['能说清 Hermes 的价值。', '知道如何判断当前是否运行在 Hermes。', '理解调试工具会受 JS 引擎影响。'],
  sourceUrls: [
    'https://reactnative.dev/blog/2021/03/12/version-0.64',
    'https://reactnative.dev/blog/2022/09/05/version-070'
  ]
};
