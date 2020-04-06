// Helper.m
#import "SysTool.h"
#import <UIKit/UIKit.h>

@implementation SysTool

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(restart)
{
  UIView *v1 = [UIView new];
  [v1 setBackgroundColor:[UIColor yellowColor]];
  UIView *v2 = [UIView new];
  [v2 addSubview:v1];
  exit(0);
  UILabel *v3 = [UILabel new];
  [v3 setText:@""];
}

RCT_EXPORT_METHOD(goOutside:(NSString *)place)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    NSURL *myUrl = [[NSURL alloc] initWithString:place];
    UIApplication *myApp = UIApplication.sharedApplication;
    [myApp openURL:myUrl];
  });
}

@end
