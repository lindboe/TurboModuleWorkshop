import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

// Types must live in the same file as the spec or they will not be properly parsed by codegen:
// https://github.com/reactwg/react-native-new-architecture/discussions/91#discussioncomment-4282452
export type OrientationData = {
  yaw: number,
  pitch: number,
  roll: number
}

export interface Spec extends TurboModule {
  startSensor(): Promise<void>;
  stopSensor(): Promise<void>;
  getLastRecordedOrientation(): Promise<{yaw: number, pitch: number, roll: number}>;
}

export default TurboModuleRegistry.get<Spec>('RTNNotAModule');