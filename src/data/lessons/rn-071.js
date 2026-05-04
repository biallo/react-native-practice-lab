export const lesson = {
  id: 'rn-071',
  version: '0.71',
  title: 'TypeScript 默认支持',
  subtitle: '类型、样式和 Web 对齐能力增强',
  period: '2023',
  level: 'Core',
  theme: '类型系统',
  whyItMatters:
    '0.71 把 TypeScript 推到默认模板，意味着 RN 官方承认类型系统是移动工程的基础设施，而不是可选增强。移动端 bug 的成本通常更高：发布慢、回滚慢、设备差异多。类型可以提前约束组件 props、导航参数、原生模块返回值和样式对象。与此同时，gap 与 Web-inspired props 说明 RN 正在向 Web 心智靠近，但仍保留原生平台边界。',
  features: [
    {
      title: 'TypeScript by default',
      body: '新项目默认使用 TS，让组件、hook、API response、navigation params 和 native module contract 都能被静态检查。对团队而言，类型是降低升级风险和跨端协作成本的共同语言。'
    },
    {
      title: 'Flexbox gap',
      body: 'gap 让列表、按钮组、表单行间距从“给每个子元素加 margin”变成父容器表达。这样更符合布局语义，也减少动态增删子元素时出现首尾 margin bug。'
    },
    {
      title: 'Web-inspired props',
      body: 'aria-*、src、tabIndex 等属性增强，降低 Web 开发者迁移成本，也让可访问性描述更统一。但它们最终仍映射到移动端 accessibility APIs，不能假设行为与浏览器完全一致。'
    },
    {
      title: '样式类型边界',
      body: 'StyleSheet 和 ViewStyle/TextStyle/ImageStyle 可以帮你发现无效属性。RN 支持的样式集合不是 CSS 全集，类型提示是避免 Web CSS 习惯误用的重要防线。'
    }
  ],
  deepDive: [
    {
      title: '类型应该覆盖哪些边界',
      items: [
        '组件 props：明确必填/可选字段，避免页面之间隐式依赖。',
        '导航参数：详情页 id、来源页面、可选 filters 等都应有类型，减少运行时 undefined。',
        '原生模块：Native 返回值经常跨语言边界，类型和运行时校验都要重视。'
      ]
    },
    {
      title: '从 Web 迁移时的注意点',
      items: [
        '不要把 HTMLElement、CSSProperties、onClick 这类 DOM 类型带进 RN；使用 Pressable、Gesture、ViewStyle 等 RN 语义。',
        '可访问性属性写完后要用 VoiceOver/TalkBack 验证，因为移动读屏顺序、焦点和手势与浏览器不同。',
        'gap 好用，但旧版本兼容和三方布局组件支持情况仍要看项目最低 RN 版本。'
      ]
    }
  ],
  code: `import { StyleSheet, Text, View, type ViewStyle } from 'react-native';

type ProfileCardProps = {
  name: string;
  role: string;
  // style 使用 RN 的 ViewStyle，而不是 Web 的 CSSProperties。
  style?: ViewStyle;
};

export function ProfileCard({ name, role, style }: ProfileCardProps) {
  return (
    <View style={[styles.card, style]}>
      {/* gap 定义在父容器，子元素不用各自维护 margin。 */}
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.role}>{role}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 8,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff'
  },
  name: {
    fontSize: 18,
    fontWeight: '700'
  },
  role: {
    color: '#66706b'
  }
});`,
  codeExamples: [
    {
      title: '用 RN 类型约束组件 Props 与样式',
      description:
        '这个示例复习 TypeScript 默认支持的实际价值：组件 API、样式类型和布局表达都能被静态检查，减少移动端运行时错误。',
      code: `import { StyleSheet, Text, View, type ViewStyle } from 'react-native';

type ProfileCardProps = {
  name: string;
  role: string;
  // style 使用 RN 的 ViewStyle，而不是 Web 的 CSSProperties。
  style?: ViewStyle;
};

export function ProfileCard({ name, role, style }: ProfileCardProps) {
  return (
    <View style={[styles.card, style]}>
      {/* gap 定义在父容器，子元素不用各自维护 margin。 */}
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.role}>{role}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 8,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff'
  },
  name: {
    fontSize: 18,
    fontWeight: '700'
  },
  role: {
    color: '#66706b'
  }
});`
    },
    {
      title: '给可访问性和事件参数加类型',
      description:
        'RN 类型不只用于样式。交互组件的事件、disabled 状态和 accessibilityRole 也应该进入类型设计，避免页面间约定靠记忆维护。',
      code: `import { Pressable, Text } from 'react-native';

type ActionButtonProps = {
  label: string;
  disabled?: boolean;
  onPress: () => void;
};

export function ActionButton({ label, disabled = false, onPress }: ActionButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
    >
      <Text>{label}</Text>
    </Pressable>
  );
}`
    }
  ],
  checklist: ['会写基础 RN Props 类型。', '知道 gap 适合哪些场景。', '能区分 Web 和 RN 的类型边界。'],
  sourceUrls: ['https://reactnative.dev/blog/2023/01/12/version-071']
};
