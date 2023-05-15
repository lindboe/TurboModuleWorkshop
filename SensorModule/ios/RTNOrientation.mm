#import "RTNOrientation.h"
#import "RTNOrientationSpec.h"

@implementation RTNOrientation {
    CMMotionManager *_motionManager;
    bool sensorOn;
    double yaw;
    double pitch;
    double roll;
}

RCT_EXPORT_MODULE()

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
(const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeOrientationSpecJSI>(params);
}


- (id) init {
    self = [super init];
    
    if (self) {
        self->_motionManager = [[CMMotionManager alloc] init];
    }
    return self;
}

+ (BOOL)requiresMainQueueSetup
{
    return NO;
}

- (void)getLastRecordedOrientation:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    if (sensorOn) {
      NSDictionary* toSend = @{@"yaw":@(self->yaw), @"pitch":@(self->pitch), @"roll":@(self->roll)};
      resolve(toSend);
    } else {
      reject(@"Orientation Error", @"Sensor is not enabled. Did you start the sensor with `startSensor`?", nil);
    }
    
}

- (NSDictionary *)getLastRecordedOrientationSync {
    NSDictionary* toSend = @{@"yaw":@(self->yaw), @"pitch":@(self->pitch), @"roll":@(self->roll)};
    return toSend;
}

- (void)startSensor:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    NSLog(@"Starting sensor");
    [self->_motionManager setShowsDeviceMovementDisplay:YES];
    /* Receive the orientation data on this block */
    NSOperationQueue *queue = [[NSOperationQueue alloc] init];
    RTNOrientation * __weak weakSelf = self;
    [self->_motionManager startDeviceMotionUpdatesToQueue:queue withHandler:^(CMDeviceMotion *deviceMotion, NSError *error)
     {
        CMAttitude *attitude = deviceMotion.attitude;
        
        self->pitch = attitude.pitch;
        self->roll = attitude.roll;
        self->yaw = attitude.yaw;
    }];
    sensorOn = true;
    
}


- (void)stopSensor:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    [self->_motionManager stopDeviceMotionUpdates];
    sensorOn = false;
}

@end
