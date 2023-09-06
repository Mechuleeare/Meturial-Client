import React, {ReactNode} from 'react';
import {Text, TextProps, TextStyle} from 'react-native';

interface TxtProps extends TextProps {
  typography?: keyof typeof FontStyle;
  children: ReactNode;
  color?: string;
}

const Txt = ({
  typography = 'BodyMedium',
  color = 'black',
  children,
  ...props
}: TxtProps) => {
  return (
    <Text
      style={{
        color: color,
        ...(FontStyle[typography] as unknown as TextStyle),
      }}
      {...props}>
      {children}
    </Text>
  );
};

export default Txt;

const FontStyle = {
  DisplayLarge: {
    fontWeight: 400,
    fontSize: 57,
    lineHeight: 64,
    letterSpacing: -0.25,
  },
  DisplayMedium: {
    fontWeight: 400,
    fontSize: 45,
    lineHeight: 52,
    letterSpacing: 0,
  },
  DisplaySmall: {
    fontWeight: 400,
    fontSize: 36,
    lineHeight: 44,
    letterSpacing: 0,
  },
  HeadlineLarge: {
    fontWeight: 400,
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: 0,
  },
  HeadlineMedium: {
    fontWeight: 400,
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: 0,
  },
  HeadlineSmall: {
    fontWeight: 400,
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0,
  },
  TitleLarge: {
    fontWeight: 400,
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: 0,
  },
  TitleMedium: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  TitleSmall: {
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  LabelLarge: {
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  LabelMedium: {
    fontWeight: 700,
    fontSize: '57px',
    lineHeight: '64px',
    letterSpacing: '-0.25%',
  },
  LabelSmall: {
    fontWeight: 700,
    fontSize: '57px',
    lineHeight: '64px',
    letterSpacing: '-0.25%',
  },
  BodyLarge: {
    fontWeight: 700,
    fontSize: '57px',
    lineHeight: '64px',
    letterSpacing: '-0.25%',
  },
  BodyMedium: {
    fontWeight: 700,
    fontSize: 57,
    lineHeight: 64,
    letterSpacing: -0.25,
  },
  BodySmall: {
    fontWeight: 700,
    fontSize: '57px',
    lineHeight: '64px',
    letterSpacing: '-0.25%',
  },
};
