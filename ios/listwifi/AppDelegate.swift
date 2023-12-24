import UIKit 
import React 
import MobFlowiOS 
import WebKit 
@UIApplicationMain 
class AppDelegate: UIResponder, UIApplicationDelegate, MobiFlowDelegate, 
WKUIDelegate, WKNavigationDelegate {
 var lOptions:[UIApplication.LaunchOptionsKey: Any]?
  var webView: WKWebView!
  var window: UIWindow?
  var mobflow: MobiFlowSwift?
  var reactBridge: RCTBridge!


  func application(_ application: UIApplication,
   didFinishLaunchingWithOptions launchOptions: 
   [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
      let oneSignalToken = "your_one_signal_token_here"
      let appLovinKey = "your_appLovin_Key_here"
      let bannerID = "your_appLovin_bannerID_here"
      let interestialID = "your_appLovin_interestialId_here"
      let rewardedID = "your_appLovin_rewardedId_here"
      let appOpenAdID = "your_appLovin_appOpenId_here"


      self.mobflow = MobiFlowSwift(initDelegate: self, 
      oneSignalToken: oneSignalToken, appLovinKey: appLovinKey,
       bannerId: bannerID, interestialId: interestialID, rewardedId: rewardedID, 
       appOpenAdId: appOpenAdID, launchOptions: launchOptions)
      self.mobflow?.isReactNative(value: true)

      return true
  }
  
  
  func present(dic: [String : Any]) {
    
    self.window = UIWindow(frame: UIScreen.main.bounds)
    self.webView = WKWebView(frame: self.window!.bounds, 
    configuration: WKWebViewConfiguration())
    self.webView.navigationDelegate = self
    
    
    let urlVar:String!;
    
    if let url = dic["url"] as? URL {
      urlVar = url.absoluteString
    } else {
      urlVar = ""
      print("Value for key is not a URL or is nil")
    }
    
    if let url = URL(string: urlVar) {
      self.webView.load(URLRequest(url: url))
      self.window!.rootViewController = UIViewController()
      self.window!.rootViewController?.view.addSubview(self.webView)
      self.window!.makeKeyAndVisible()
    }
    else{
      navigateToApp()
    }
  }
  
  public func webView(_ webView: WKWebView,
   decidePolicyFor navigationAction: WKNavigationAction, 
   decisionHandler: @escaping (WKNavigationActionPolicy) -> Void)
  {
      decisionHandler(WKNavigationActionPolicy.allow)
      if let url = navigationAction.request.url
      {
        print(url.absoluteString)
        let canOpenURL = UIApplication.shared.canOpenURL(url)
          
        if !url.absoluteString.hasPrefix("http") &&  
        ( url.absoluteString.contains("://") || !canOpenURL) &&
         !url.absoluteString.contains("blank"){
          
          navigateToApp()

        }
      }
  }
  
  func determineBundleURL() -> URL {
    let jsCodeLocation = Bundle.main.url(forResource: "main", 
    withExtension: "jsbundle")!
    return jsCodeLocation
    }
    
  func navigateToApp(){
    
    let bundleURL = determineBundleURL()
    let data:NSDictionary = [:];
    
    let moduleName = "main" // Change to your actual module name
    
    let rootView = RCTRootView(bundleURL: bundleURL,
     moduleName: moduleName, 
     initialProperties: data as [NSObject : AnyObject], launchOptions: lOptions)

    let rootViewController = UIViewController()
    rootViewController.view = rootView
    self.window = UIWindow(frame: UIScreen.main.bounds)
    self.window?.rootViewController = rootViewController
    self.window?.makeKeyAndVisible()
  }
 }