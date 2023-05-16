import React, {useCallback, useState} from 'react';
import RTNOrientation, {OrientationData} from 'orientation-sensor';
import {SafeAreaView} from 'react-native';
import {DemoText, DemoPressable} from './src/DemoComponents';

const initialState = {
  pitch: undefined,
  roll: undefined,
  yaw: undefined,
} as const;

const EVENT_NAME = 'orientation';

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
      RTNOrientation.removeAllListeners(EVENT_NAME);
      setSensorData({pitch: undefined, roll: undefined, yaw: undefined});
      setSensorOn(false);
    } else {
      RTNOrientation.addListener(EVENT_NAME, event => {
        setSensorData(event);
      });
      setSensorOn(true);
    }
  }, [sensorOn]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <DemoPressable text="Toggle events" onPress={toggleEvents} />
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
