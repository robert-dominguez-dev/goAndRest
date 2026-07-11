import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
import Firebase
import AVFoundation

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?

  var reactNativeDelegate: ReactNativeDelegate?
  var reactNativeFactory: RCTReactNativeFactory?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    FirebaseApp.configure()
    do {
        try AVAudioSession.sharedInstance().setCategory(
            .playback,
            options: [.mixWithOthers, .duckOthers]
        )
        try AVAudioSession.sharedInstance().setActive(true)
    } catch {
        print("Error setting up audio session: \(error)")
    }

    let delegate = ReactNativeDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()

    reactNativeDelegate = delegate
    reactNativeFactory = factory

    window = UIWindow(frame: UIScreen.main.bounds)

    factory.startReactNative(
      withModuleName: "GoAndRest",
      in: window,
      launchOptions: launchOptions
    )

    return true
  }
  
  func application(
      _ application: UIApplication,
      supportedInterfaceOrientationsFor window: UIWindow?
  ) -> UIInterfaceOrientationMask {
      return Orientation.getOrientation()
  }
}



class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  // Metro runs on 8083 (so this app coexists with other RN projects on the
  // default 8081 / 8082). Point the debug bundle at it explicitly on launch,
  // otherwise a real device can't reach Metro and you can't even open the Dev
  // Menu to fix it (the bundle never loads — chicken and egg).
  //   Simulator → localhost. Real device → this Mac's LAN IP; UPDATE this if the
  //   Mac's IP changes (System Settings › Wi-Fi › Details). Device + Mac must be
  //   on the same Wi-Fi. DEBUG-only, so release/CI use the embedded bundle.
#if targetEnvironment(simulator)
  private static let metroHost = "localhost:8083"
#else
  private static let metroHost = "192.168.1.19:8083"
#endif

  override func bundleURL() -> URL? {
#if DEBUG
    RCTBundleURLProvider.sharedSettings().jsLocation = ReactNativeDelegate.metroHost
    return RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    return Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}
