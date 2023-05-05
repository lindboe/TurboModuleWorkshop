/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useEffect, useState} from 'react';
import {Button, SafeAreaView, Text} from 'react-native';
import RTNOrientation from 'orientation-sensor';

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
      <Button title={'Toggle events'} onPress={toggleEvents} />
      <Button title={'Get last orientation'} onPress={getLastOrientation} />
      <Text>Sensor on:</Text>
      <Text>{JSON.stringify(sensorOn)}</Text>
      <Text>Roll</Text>
      <Text>{sensorData.roll}</Text>
      <Text>Pitch</Text>
      <Text>{sensorData.pitch}</Text>
      <Text>Yaw</Text>
      <Text>{sensorData.yaw}</Text>
    </SafeAreaView>
  );
}

export default App;
