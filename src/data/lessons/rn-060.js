export const lesson = {
  id: 'rn-060',
  version: '0.60',
  title: '自动链接与现代化工程',
  subtitle: 'Native 依赖接入成本显著下降',
  period: '2019',
  level: 'Core',
  theme: '工程化',
  whyItMatters:
    'React Native 项目一半是 JavaScript，一半是原生工程。0.60 的意义在于把"安装一个带原生代码的库"从大量手工链接，推进到可被工具识别和自动配置的流程。它让 RN 生态更接近现代包管理体验，也让升级排查更系统：看模板差异、看 native dependency、看 Pod/Gradle 结果，而不是凭记忆修改工程文件。\n\n在 0.60 之前，安装一个带原生代码的库意味着：手动运行 react-native link，手动改 Xcode 工程文件，手动修改 settings.gradle。这导致了大量人工操作和不确定性。0.60 引入的 Autolinking 机制允许库通过 package.json 的 metadata 自动被 CLI 发现，解决了包管理和工程配置的分离问题，也为后续更复杂的工程场景（workspace、monorepo、CI/CD）奠定了基础。',
  features: [
    {
      title: 'Autolinking',
      body: '库可以通过 package metadata 暴露 native module 信息，CLI 在 iOS/Android 构建阶段自动发现并接入。它减少了 react-native link、手动改 Xcode project、手动改 settings.gradle 的频率，但不是魔法：Pod install、Gradle sync、平台权限配置仍然需要你理解。\n\n具体实现原理：1) 库在 package.json 的 react-native 字段或根目录 react.json 暴露其入口；2) RN CLI 在初始化时扫描 node_modules 发现这些信息；3) iOS 侧，Cocoapods 根据 Podspec 自动把源码或预编译库加入工程；4) Android 侧，Gradle plugin 根据 build.gradle 配置自动注册 modules。但权限、初始化逻辑、资源文件等仍需手动配置。'
    },
    {
      title: 'AndroidX 迁移',
      body: 'AndroidX 让 Android 支持库体系进入新命名空间，也意味着旧依赖如果没迁移会出现编译冲突。学习这一段要理解 RN 项目会继承 Android 生态变动，很多"JS 没改但 Android 挂了"的问题来自原生依赖树。\n\nAndroidX 的关键问题：1) 旧命名空间是 android.support.*，新命名空间是 androidx.*；2) 如果项目里混用了旧和新库，会产生编译冲突或运行时 ClassDefNotFound；3) RN core 库从 0.60 开始使用 AndroidX，这意味着你的项目也必须升级；4) 许多三方库的老版本仍然使用旧命名空间，需要更新或替换。这是升级 RN 时最常见的卡点。'
    },
    {
      title: 'Upgrade Helper',
      body: 'Upgrade Helper 把模板差异变成可审查的补丁。升级 RN 时，先比较目标版本模板，再叠加自己的业务改动，是比"删掉重建项目"更可控的方式。大型项目尤其需要记录每次 native 文件为何改变。\n\nUpgrade Helper 工作流：1) 从当前 RN 版本到目标版本的所有模板文件变化被展示；2) 你可以逐文件审查每个改动；3) 关键是理解"为什么改"——更新 Gradle 版本、更改权限配置、新增初始化代码；4) 选择性应用改动，避免覆盖自己的自定义配置。这对大型项目的稳定升级至关重要。'
    },
    {
      title: '原生依赖成为一等公民',
      body: '从这一阶段开始，学习 RN 不能只停留在 npm install。你需要知道 JS package、CocoaPods、Gradle、平台权限、build cache 和 CI 环境如何互相影响。\n\n实际工程中需要理解：1) package.json 的 dependencies 和 native 依赖不是 1:1 的，一个 npm 包可能有多个 native dependencies；2) CocoaPods 的版本冲突解决逻辑和 npm 不同；3) Gradle 依赖的 transitive dependency resolution 可能导致意外升级；4) CI 环境的 build cache 配置不当会导致本地能跑、CI 失败；5) 平台权限在打包时需要明确声明。'
    }
  ],
  deepDive: [
    {
      title: '安装原生库时发生了什么',
      items: [
        'npm/yarn/pnpm 只把库下载到 node_modules；iOS 还需要 CocoaPods 把 native code 接入 Xcode build graph。',
        'Android 侧通常通过 Gradle settings、plugin 和 autolinking 生成的配置把 native module 加入编译。',
        '如果库还要求权限、Info.plist、AndroidManifest、ProGuard/R8 或 Gradle 属性，autolinking 不会替你理解这些业务配置。',
        'iOS 的 Pods 需要 pod install（不是 pod update），这会锁定版本在 Podfile.lock 中，类似于 package-lock.json。',
        'Android 的 Gradle 依赖可能产生 transitive dependency，即 A 依赖 B，B 依赖 C，版本冲突会在打包时暴露。'
      ]
    },
    {
      title: '升级判断方法',
      items: [
        '先用 Upgrade Helper 看模板差异，再决定哪些改动要合并到现有项目。',
        '把升级问题分层：JS API 变化、native template 变化、三方库兼容、构建环境变化，不要混在一起排查。',
        '遇到构建失败时优先读第一条 root cause，而不是只看最后的 npm error。',
        '验证升级的关键是清除缓存重新构建：rm -rf node_modules && npm install，rm -rf ~/Library/Developer/Xcode/DerivedData/，清除 Gradle cache。',
        '升级前做好 git commit，升级后保留一个"升级后的干净状态"分支，便于回滚和问题排查。'
      ]
    },
    {
      title: '工程配置陷阱',
      items: [
        'Gradle 的 minSdkVersion 和 targetSdkVersion 冲突很常见。库可能要求 minSdkVersion ≥ 21，但你的应用是 19。这需要在 app/build.gradle 中明确覆盖。',
        'iOS 的 deployment target 也容易冲突。同时依赖多个库时，它们的最小部署版本取最大值。',
        '原生库的二进制大小：检查库是否包含了不必要的架构（如为了向后兼容而包含 32-bit）或资源。这会显著增加应用体积。',
        'CocoaPods 的多工作空间（workspace）可能导致符号冲突或链接失败。遇到这种问题要理解 xcworkspace 的链接顺序。'
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
# 如果存在但构建失败，通常是 Pod、Gradle、权限或版本兼容问题。`    },
    {
      title: '处理 AndroidX 版本冲突',
      description:
        'AndroidX 迁移是升级 RN 时最常见的卡点。这个例子展示如何在 Gradle 中强制使用 AndroidX，同时管理旧库的兼容性。',
      code: `// android/app/build.gradle
android {
    compileSdkVersion 31
    buildToolsVersion "31.0.0"
    
    defaultConfig {
        minSdkVersion 21
        targetSdkVersion 31
        // 关键: 启用 AndroidX 支持库映射，让旧的 android.support.* 库自动映射到 androidx.*
        // 这让依然使用旧命名空间的库能够编译
    }
}

dependencies {
    // 新项目直接使用 AndroidX
    implementation 'androidx.appcompat:appcompat:1.4.0'
    implementation 'androidx.annotation:annotation:1.3.0'
    
    // 如果某些三方库还没更新到 AndroidX，Gradle 可能会自动兼容或冲突
    // 冲突时需要升级库版本或排除依赖
}

// 在 gradle.properties 中启用 AndroidX 迁移
org.gradle.jvmargs=-Xmx512m
android.useAndroidX=true
android.enableJetifier=true`
    },
    {
      title: 'iOS Podfile 的高级配置',
      description:
        'Podfile 决定了 iOS 的所有 native 依赖。理解如何手动配置 Podfile 对解决依赖问题至关重要。',
      code: `# ios/Podfile
platform :ios, '12.0'

target 'MyApp' do
  config = use_native_modules!

  use_react_native!(
    path: config[:react_native_path],
    hermes_enabled: true,
    fabric_enabled: true
  )

  # 显式处理版本冲突
  # 例如，两个库都依赖 Firebase，但版本不同
  pod 'Firebase/Core', '~> 8.0'

  post_install do |installer|
    # 这里可以处理构建时的问题
    # 例如，禁用某些库的特定功能，或修改 build settings
    installer.pods_project.targets.each do |target|
      flutter_additional_ios_build_settings(target)
    end
  end
end`    }
  ],
  checklist: ['能解释 autolinking。', '知道什么时候还需要 pod install。', '会用 Upgrade Helper 看升级补丁。'],
  sourceUrls: ['https://reactnative.dev/blog/2019/07/03/version-60']
};
