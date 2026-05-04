export const lesson = {
  id: 'rn-060',
  version: '0.60',
  title: '自动链接与现代化工程',
  subtitle: 'Native 依赖接入成本显著下降',
  period: '2019',
  level: 'Core',
  theme: '工程化',
  whyItMatters:
    'React Native 项目一半是 JavaScript，一半是原生工程。0.60 的意义在于把“安装一个带原生代码的库”从大量手工链接，推进到可被工具识别和自动配置的流程。它让 RN 生态更接近现代包管理体验，也让升级排查更系统：看模板差异、看 native dependency、看 Pod/Gradle 结果，而不是凭记忆修改工程文件。',
  features: [
    {
      title: 'Autolinking',
      body: '库可以通过 package metadata 暴露 native module 信息，CLI 在 iOS/Android 构建阶段自动发现并接入。它减少了 react-native link、手动改 Xcode project、手动改 settings.gradle 的频率，但不是魔法：Pod install、Gradle sync、平台权限配置仍然需要你理解。'
    },
    {
      title: 'AndroidX 迁移',
      body: 'AndroidX 让 Android 支持库体系进入新命名空间，也意味着旧依赖如果没迁移会出现编译冲突。学习这一段要理解 RN 项目会继承 Android 生态变动，很多“JS 没改但 Android 挂了”的问题来自原生依赖树。'
    },
    {
      title: 'Upgrade Helper',
      body: 'Upgrade Helper 把模板差异变成可审查的补丁。升级 RN 时，先比较目标版本模板，再叠加自己的业务改动，是比“删掉重建项目”更可控的方式。大型项目尤其需要记录每次 native 文件为何改变。'
    },
    {
      title: '原生依赖成为一等公民',
      body: '从这一阶段开始，学习 RN 不能只停留在 npm install。你需要知道 JS package、CocoaPods、Gradle、平台权限、build cache 和 CI 环境如何互相影响。'
    }
  ],
  deepDive: [
    {
      title: '安装原生库时发生了什么',
      items: [
        'npm/yarn/pnpm 只把库下载到 node_modules；iOS 还需要 CocoaPods 把 native code 接入 Xcode build graph。',
        'Android 侧通常通过 Gradle settings、plugin 和 autolinking 生成的配置把 native module 加入编译。',
        '如果库还要求权限、Info.plist、AndroidManifest、ProGuard/R8 或 Gradle 属性，autolinking 不会替你理解这些业务配置。'
      ]
    },
    {
      title: '升级判断方法',
      items: [
        '先用 Upgrade Helper 看模板差异，再决定哪些改动要合并到现有项目。',
        '把升级问题分层：JS API 变化、native template 变化、三方库兼容、构建环境变化，不要混在一起排查。',
        '遇到构建失败时优先读第一条 root cause，而不是只看最后的 npm error。'
      ]
    }
  ],
  code: `# 安装原生模块后的典型流程。
# JS 包进入 node_modules，但 native 侧还需要各平台构建系统接入。
npm install react-native-device-info

# iOS: 根据 Podspec 安装/更新 native dependency。
cd ios && pod install

# 0.60 之后，多数库不再需要手动 react-native link。
# 但权限、Info.plist、AndroidManifest 仍要按库文档配置。`,
  codeExamples: [
    {
      title: '安装原生模块时的完整检查顺序',
      description:
        'Autolinking 只负责发现和接入 native module。真正排查安装问题时，要按 JS 包、iOS Pods、Android Gradle、平台权限和清缓存的顺序看。',
      code: `# 1. 安装 JS 包，确认 lockfile 被更新。
npm install react-native-device-info

# 2. iOS 需要让 CocoaPods 读取库的 podspec。
cd ios
bundle exec pod install
cd ..

# 3. Android 通常由 Gradle + autolinking 接入。
# 如果失败，优先看 android/settings.gradle 和 app/build.gradle 的错误。
npx react-native run-android

# 4. 只有在确认配置正确但缓存异常时才清缓存。
npx react-native start --reset-cache`
    },
    {
      title: '用 react-native config 理解 autolinking',
      description:
        '当你不确定一个库有没有被 CLI 识别时，先看 config 输出。它能帮助你判断问题在“没被发现”还是“被发现但编译失败”。',
      code: `# 查看 CLI 识别到的项目和依赖配置。
npx react-native config

# 重点检查:
# dependencies.react-native-device-info.platforms.ios
# dependencies.react-native-device-info.platforms.android

# 如果 dependency 不存在，通常是包安装或 package metadata 问题。
# 如果存在但构建失败，通常是 Pod、Gradle、权限或版本兼容问题。`
    }
  ],
  checklist: ['能解释 autolinking。', '知道什么时候还需要 pod install。', '会用 Upgrade Helper 看升级补丁。'],
  sourceUrls: ['https://reactnative.dev/blog/2019/07/03/version-60']
};
