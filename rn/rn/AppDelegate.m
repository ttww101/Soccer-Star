//
//  AppDelegate.m
//  rn
//
//  Created by Jack on 2019/10/18.
//  Copyright © 2019 com. All rights reserved.
//

#import "AppDelegate.h"
#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "BridgeDelegate.h"

@interface AppDelegate ()

@property (nonatomic, strong) BridgeDelegate *bridgeDelegate;

@end

@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    // Override point for customization after application launch.
    _bridgeDelegate = [BridgeDelegate new];
    RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self.bridgeDelegate launchOptions:launchOptions];
    RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                     moduleName:@"Game"
                                              initialProperties:nil];

    rootView.backgroundColor = [UIColor whiteColor];

    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    UIViewController *rootViewController = [UIViewController new];
    rootViewController.view = rootView;
    self.window.rootViewController = rootViewController;
    [self.window makeKeyAndVisible];
    return YES;
}

@end
