export const lesson = {
  id: 'rn-061-063',
  version: '0.61-0.63',
  title: '开发体验提速',
  subtitle: 'Fast Refresh 与 LogBox 让调试更接近 React Web',
  period: '2019-2020',
  level: 'Core',
  theme: '调试',
  whyItMatters:
    '移动端开发最贵的成本之一是反馈循环：安装、启动、复现路径、读日志都比 Web 更慢。0.61-0.63 这一段的重点是让“修改代码 -> 看到结果 -> 定位错误”更可靠。Fast Refresh 改善 UI 迭代，LogBox 降低错误噪音。它们看起来是开发体验功能，但本质上会改变团队调试习惯和代码组织方式。',
  features: [
    {
      title: 'Fast Refresh',
      body: 'Fast Refresh 在组件边界可识别时尽量保留 React state，让你改样式、文案和渲染逻辑时不用反复走登录/导航流程。它鼓励把副作用收进组件或 hook 中，减少模块顶层不可控副作用。'
    },
    {
      title: 'LogBox',
      body: 'LogBox 重新组织 warning 和 error 的展示方式，突出可操作信息和调用栈。对团队来说，warning 不应该长期堆积；升级前清理 warning，往往能提前发现未来会变成 breaking change 的问题。'
    },
    {
      title: '更好的错误边界体验',
      body: 'RN 的错误可能来自 JS、Metro、native build、native runtime 或设备环境。更好的红屏、黄屏和堆栈信息让你能先判断错误层级，再决定该看 JS stack、Metro output、Xcode/Logcat 还是 crash report。'
    },
    {
      title: '调试纪律',
      body: 'Fast Refresh 不是完整重启。修改初始化逻辑、模块级缓存、原生配置或环境变量时，你仍然需要 reload、重装应用，甚至清理构建缓存。'
    }
  ],
  deepDive: [
    {
      title: 'Fast Refresh 如何影响代码组织',
      items: [
        '组件文件最好导出 React component 或 hook，避免在同一模块中混入大量一次性初始化逻辑。',
        '模块顶层代码只在模块重新执行时变化；如果你依赖它更新状态，Fast Refresh 的表现可能和完整 reload 不一致。',
        '当状态保留导致误判时，主动 reload 是正确动作，不是工具失败。'
      ]
    },
    {
      title: '排错顺序',
      items: [
        '先判断是 JS runtime error、Metro transform error、native build error 还是 native crash。',
        'JS 错误优先看组件栈和触发路径；native 构建错误优先看 Xcode/Gradle 第一条失败原因。',
        '团队项目可以约定 warning budget：主分支不允许新增未解释 warning。'
      ]
    }
  ],
  code: `import { useMemo } from 'react';
import { Text } from 'react-native';

export function CounterLabel({ count }) {
  // 纯渲染计算适合放在组件内部，Fast Refresh 后更容易保持一致。
  const label = useMemo(() => {
    return count === 1 ? '1 tap' : count + ' taps';
  }, [count]);

  return <Text>{label}</Text>;
}

// 如果修改的是模块初始化、环境变量或原生配置，
// 不要只依赖 Fast Refresh，应该完整 reload 或重新安装应用。`,
  codeExamples: [
    {
      title: '适合 Fast Refresh 的组件写法',
      description:
        '纯组件和 hook 内部逻辑通常能得到最稳定的刷新体验。状态保留能减少重复操作，但也要知道什么时候主动 reload。',
      code: `import { useMemo } from 'react';
import { Text } from 'react-native';

export function CounterLabel({ count }) {
  // 纯渲染计算适合放在组件内部，Fast Refresh 后更容易保持一致。
  const label = useMemo(() => {
    return count === 1 ? '1 tap' : count + ' taps';
  }, [count]);

  return <Text>{label}</Text>;
}`
    },
    {
      title: '区分可热刷新的代码和必须重载的代码',
      description:
        '模块顶层副作用、环境变量和原生配置经常需要完整 reload。复习调试时要能判断“刷新没生效”到底是不是工具问题。',
      code: `// appConfig.ts
// 模块顶层代码只在模块重新执行时变化。
// 修改这里后，如果 Fast Refresh 保留了旧状态，应该完整 reload。
export const API_HOST = process.env.API_HOST;

export function printDebugRuntime() {
  console.log('API host:', API_HOST);
  console.log('Remember: native config changes need rebuild.');
}`
    }
  ],
  checklist: ['能使用 Fast Refresh 迭代 UI。', '能读懂 LogBox 的堆栈。', '知道何时需要 reload。'],
  sourceUrls: [
    'https://reactnative.dev/blog/2019/09/18/version-0.61',
    'https://reactnative.dev/blog/2020/07/06/version-0.63'
  ]
};
