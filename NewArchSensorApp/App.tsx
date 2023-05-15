import React, {useCallback, useEffect, useState} from 'react';
import RTNOrientation, {OrientationData} from 'orientation-sensor';
import {SafeAreaView} from 'react-native';
import {DemoText, DemoPressable} from './src/DemoComponents';

function isError(e: unknown): e is Error {
  return typeof e === 'object' && e !== null && 'message' in e;
}

const initialState = {
  pitch: undefined,
  roll: undefined,
  yaw: undefined,
} as const;

function App(): JSX.Element {
  const [sensorOn, setSensorOn] = useState(false);
  const [sensorData, setSensorData] = useState<
    OrientationData | typeof initialState
  >({
    pitch: undefined,
    roll: undefined,
    yaw: undefined,
  });

  const toggleEvents = useCallback(() => {
    if (sensorOn) {
      RTNOrientation.stopSensor();
      setSensorOn(false);
    } else {
      RTNOrientation.startSensor();
      setSensorOn(true);
    }
  }, [sensorOn]);

  const getLastOrientation = useCallback(() => {
    const fn = async () => {
      try {
        const last = await RTNOrientation.getLastRecordedOrientation();
        setSensorData(last);
      } catch (e) {
        console.log("Couldn't get sensor data: ", isError(e) ? e.message : e);
      }
    };
    fn();
  }, []);

  const getLastOrientationSync = useCallback(() => {
    const last = RTNOrientation.getLastRecordedOrientationSync();
    setSensorData(last);
  }, []);

  // ensure sensor stops
  useEffect(() => {
    return () => {
      RTNOrientation.stopSensor();
    };
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <DemoPressable text="Toggle events" onPress={toggleEvents} />
      <DemoPressable text="Get last orientation" onPress={getLastOrientation} />
      <DemoPressable
        text="Get last orientation: synchronous"
        onPress={getLastOrientationSync}
      />
      <DemoText>Sensor on:</DemoText>
      <DemoText>{JSON.stringify(sensorOn)}</DemoText>
      <DemoText>Roll</DemoText>
      <DemoText>{sensorData.roll}</DemoText>
      <DemoText>Pitch</DemoText>
      <DemoText>{sensorData.pitch}</DemoText>
      <DemoText>Yaw</DemoText>
      <DemoText>{sensorData.yaw}</DemoText>
    </SafeAreaView>
  );
}

export default App;
