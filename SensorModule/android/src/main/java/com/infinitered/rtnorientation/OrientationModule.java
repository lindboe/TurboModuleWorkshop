package com.infinitered.rtnorientation;

import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;

import androidx.annotation.NonNull;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
// don't technically need this, same package
import com.infinitered.rtnorientation.NativeOrientationSpec;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

public class OrientationModule extends NativeOrientationSpec implements SensorEventListener {
    private final ReactApplicationContext reactContext;
    public static String NAME = "RTNOrientation";
    private final SensorManager sensorManager;
    private final Sensor sensor;
    private float yaw;
    private float pitch;
    private float roll;
    private boolean sensorOn = false;

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
    public void startSensor(Promise promise) {
        sensorManager.registerListener(this, sensor, SensorManager.SENSOR_DELAY_UI);
        sensorOn = true;
    }

    @Override
    public void stopSensor(Promise promise) {
        sensorManager.unregisterListener(this);
        sensorOn = false;
    }

    @Override
    public void getLastRecordedOrientation(Promise promise) {
        // if it's set, resolve; if no value, reject with error string
        if (sensorOn == true) {
            WritableMap toSend = Arguments.createMap();
            // no guarantees these values are all from the same event :/
            toSend.putDouble("yaw", yaw);
            toSend.putDouble("pitch", pitch);
            toSend.putDouble("roll", roll);
            promise.resolve(toSend);
        } else {
            promise.reject("Orientation Error", "Sensor is not enabled. Did you start the sensor with `startSensor`?");
        }
    }

    @Override
    public WritableMap getLastRecordedOrientationSync() {
        WritableMap toSend = Arguments.createMap();
        toSend.putDouble("yaw", yaw);
        toSend.putDouble("pitch", pitch);
        toSend.putDouble("roll", roll);
        return toSend;
    }

    @Override
    public void onSensorChanged(SensorEvent sensorEvent) {
        // store most recent value in local state so it can be fetched on-demand
        yaw = sensorEvent.values[0];
        pitch = sensorEvent.values[1];
        roll = sensorEvent.values[2];
    }
    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {
    }
}