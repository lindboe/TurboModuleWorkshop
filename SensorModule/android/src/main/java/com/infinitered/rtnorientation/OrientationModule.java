package com.infinitered.rtnorientation;

import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.SystemClock;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
// don't technically need this, same package
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.infinitered.rtnorientation.NativeOrientationSpec;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

public class OrientationModule extends NativeOrientationSpec implements SensorEventListener {
    // Based on https://github.com/react-native-sensors/react-native-sensors
    private final ReactApplicationContext reactContext;
    public static String NAME = "RTNOrientation";
    private final SensorManager sensorManager;
    private final Sensor sensor;
    private double lastReading = (double) System.currentTimeMillis();
    private int interval = 1000;
    private String eventName = "orientation";

    OrientationModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
        this.sensorManager = (SensorManager)reactContext.getSystemService(reactContext.SENSOR_SERVICE);
        this.sensor = this.sensorManager.getDefaultSensor(Sensor.TYPE_ORIENTATION);
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    @Override
    public void addListener(String requestedEventName) {
        // kind of silly, but helps ensure event names are consistent across platforms
        eventName = requestedEventName;
        sensorManager.registerListener(this, sensor, SensorManager.SENSOR_DELAY_NORMAL);
    }

    @Override
    public void removeListeners(double count) {
        sensorManager.unregisterListener(this);
    }

    private void sendEvent(String eventName, @Nullable WritableMap params) {
        try {
            this.reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(eventName, params);
        } catch (RuntimeException e) {
            Log.e("ERROR", "java.lang.RuntimeException: Trying to invoke Javascript before CatalystInstance has been set!");
        }
    }

    private static double sensorTimestampToEpochMilliseconds(long elapsedTime) {
        // elapsedTime = The time in nanoseconds at which the event happened.
        return System.currentTimeMillis() + ((elapsedTime- SystemClock.elapsedRealtimeNanos())/1000000L);
    }

    @Override
    public void onSensorChanged(SensorEvent sensorEvent) {
        double tempMs = (double) System.currentTimeMillis();
        if (tempMs - lastReading >= interval) {
            lastReading = tempMs;
            WritableMap map = Arguments.createMap();
            map.putDouble("yaw", sensorEvent.values[0]);
            map.putDouble("pitch", sensorEvent.values[1]);
            map.putDouble("roll", sensorEvent.values[2]);
            this.sendEvent("orientation", map);
        }
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {
    }
}