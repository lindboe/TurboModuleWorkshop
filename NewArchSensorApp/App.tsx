import React, {useCallback, useEffect, useState} from 'react';
import RTNOrientation from 'orientation-sensor';
import {SafeAreaView} from 'react-native';
import {DemoText, DemoPressable} from './src/DemoComponents';

function App(): JSX.Element {
  const [sensorOn, setSensorOn] = useState(false);
  const [sensorData, setSensorData] = useState({
    pitch: undefined,
    roll: undefined,
    yaw: undefined,
  });

  const toggleEvents = useCallback(() => {
    if (RTNOrientation) {
      if (sensorOn) {
        RTNOrientation.stopSensor();
        setSensorOn(false);
      } else {
        RTNOrientation.startSensor();
        setSensorOn(true);
      }
    }
  }, [sensorOn]);

  const getLastOrientation = useCallback(() => {
    if (RTNOrientation) {
      const fn = async () => {
        // @ts-ignore
        const last = await RTNOrientation.getLastRecordedOrientation();
        setSensorData(last);
      };
      fn();
    }
  }, []);

  // ensure sensor stops
  // @ts-ignore
  useEffect(() => {
    return () => RTNOrientation?.stopSensor();
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
