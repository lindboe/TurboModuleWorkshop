#import "RTNOrientation.h"
#import "RTNOrientationSpec.h"

@implementation RTNOrientation {
    CMMotionManager *_motionManager;
    bool sensorOn;
}

RCT_EXPORT_MODULE()

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
(const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeOrientationSpecJSI>(params);
}


- (NSArray<NSString *> *)supportedEvents
{
    return @[ @"orientation" ];
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

- (void)stopSensor:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    [self->_motionManager stopDeviceMotionUpdates];
    sensorOn = false;
}

// addListener and removeAllListeners are handled by RCTEventEmitter.
// startObserving and stopObserving define what do when they're called.
- (void)startObserving {
    [self->_motionManager setShowsDeviceMovementDisplay:YES];
    [self->_motionManager setDeviceMotionUpdateInterval:1];
    
    /* Receive the orientation data on this block */
    NSOperationQueue *queue = [[NSOperationQueue alloc] init];
    [self->_motionManager startDeviceMotionUpdatesToQueue:queue withHandler:^(CMDeviceMotion *deviceMotion, NSError *error)
     {
        CMAttitude *attitude = deviceMotion.attitude;
        
        double pitch = attitude.pitch;
        double roll = attitude.roll;
        double yaw = attitude.yaw;
        
        [self sendEventWithName:@"orientation" body:@{
            @"pitch" : [NSNumber numberWithDouble:pitch],
            @"roll" : [NSNumber numberWithDouble:roll],
            @"yaw" : [NSNumber numberWithDouble:yaw],
        }];
    }];
}

- (void)stopObserving {
    [self->_motionManager stopDeviceMotionUpdates];
}

@end
