import React, {ReactNode} from 'react';
import {Pressable, StyleProp, Text, TextStyle} from 'react-native';

const palette = {
  neutral100: '#FFFFFF',
  neutral200: '#F4F2F1',
  neutral300: '#D7CEC9',
  neutral400: '#B6ACA6',
  neutral500: '#978F8A',
  neutral600: '#564E4A',
  neutral700: '#3C3836',
  neutral800: '#191015',
  neutral900: '#000000',

  primary100: '#F4E0D9',
  primary200: '#E8C1B4',
  primary300: '#DDA28E',
  primary400: '#D28468',
  primary500: '#C76542',
  primary600: '#A54F31',

  secondary100: '#DCDDE9',
  secondary200: '#BCC0D6',
  secondary300: '#9196B9',
  secondary400: '#626894',
  secondary500: '#41476E',

  accent100: '#FFEED4',
  accent200: '#FFE1B2',
  accent300: '#FDD495',
  accent400: '#FBC878',
  accent500: '#FFBB50',

  angry100: '#F2D6CD',
  angry500: '#C03403',

  overlay20: 'rgba(25, 16, 21, 0.2)',
  overlay50: 'rgba(25, 16, 21, 0.5)',
} as const;

type DemoTextProps = {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
};

export function DemoText({children, style = {}}: DemoTextProps) {
  return <Text style={[{fontSize: 16, padding: 6}, style]}>{children}</Text>;
}

type DemoPressableProps = {
  text: string;
  onPress: () => void;
};

export function DemoPressable({text, onPress}: DemoPressableProps) {
  return (
    <Pressable
      style={({pressed}) => [
        {
          padding: 12,
          margin: 12,
          borderRadius: 12,
          backgroundColor: pressed ? palette.neutral500 : palette.neutral300,
        },
      ]}
      onPress={onPress}>
      <DemoText>{text}</DemoText>
    </Pressable>
  );
}
