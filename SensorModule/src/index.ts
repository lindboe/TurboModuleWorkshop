import NativeOrientation, {Spec} from './NativeOrientation';
import {
  NativeEventEmitter,
} from 'react-native';

// Data sent in the native event
export type OrientationData = {
  yaw: number,
  pitch: number,
  roll: number
}

let RTNOrientation: NativeEventEmitter;

if (NativeOrientation === null) {
   console.error("NativeOrientation module could not be loaded.");
   // Add "empty" versions of the methods so calls won't error
   RTNOrientation = {
    addListener: (...rest: any) => null,
    removeListeners: (...rest: any) => null,
   };
} else {
  // cast so we don't have to keep using safe access
  RTNOrientation = new NativeEventEmitter(NativeOrientation);
}

export default RTNOrientation;
