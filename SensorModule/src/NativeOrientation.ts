import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  startSensor(): Promise<void>;
  stopSensor(): Promise<void>;
  getLastRecordedOrientation(): Promise<{yaw: number, pitch: number, roll: number}>;
}

export default TurboModuleRegistry.get<Spec>('RTNOrientation');