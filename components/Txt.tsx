import React, {ReactNode} from 'react';
import {Text, TextProps, TextStyle} from 'react-native';

interface TxtProps extends TextProps {
  typography?: keyof typeof FontStyle;
  children: ReactNode;
  color?: string;
  numberOfLines?: number;
}

const Txt = ({
  typography = 'BodyMedium',
  color = 'black',
  numberOfLines,
  children,
  ...props
}: TxtProps) => {
  return (
    <Text
      numberOfLines={numberOfLines}
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
    fontFamily: 'Pretendard-Regular',
    lineHeight: 64,
    letterSpacing: -0.25,
  },
  DisplayMedium: {
    fontWeight: 400,
    fontSize: 45,
    fontFamily: 'Pretendard-Regular',
    lineHeight: 52,
    letterSpacing: 0,
  },
  DisplaySmall: {
    fontWeight: 400,
    fontSize: 36,
    fontFamily: 'Pretendard-Regular',
    lineHeight: 44,
    letterSpacing: 0,
  },
  HeadlineLarge: {
    fontWeight: 400,
    fontSize: 32,
    fontFamily: 'Pretendard-Regular',
    lineHeight: 40,
    letterSpacing: 0,
  },
  HeadlineMedium: {
    fontWeight: 400,
    fontSize: 28,
    fontFamily: 'Pretendard-Regular',
    lineHeight: 36,
    letterSpacing: 0,
  },
  HeadlineSmall: {
    fontWeight: 400,
    fontSize: 24,
    fontFamily: 'Pretendard-Regular',
    lineHeight: 32,
    letterSpacing: 0,
  },
  TitleLarge: {
    fontWeight: 400,
    fontSize: 22,
    fontFamily: 'Pretendard-Regular',
    lineHeight: 28,
    letterSpacing: 0,
  },
  TitleMedium: {
    fontWeight: 500,
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  TitleSmall: {
    fontWeight: 500,
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  LabelLarge: {
    fontWeight: 500,
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  LabelMedium: {
    fontWeight: 500,
    fontSize: 12,
    fontFamily: 'Pretendard-Medium',
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  LabelSmall: {
    fontWeight: 500,
    fontSize: 11,
    fontFamily: 'Pretendard-Medium',
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  BodyLarge: {
    fontWeight: 400,
    fontSize: 16,
    fontFamily: 'Pretendard-Regular',
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  BodyMedium: {
    fontWeight: 400,
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  BodySmall: {
    fontWeight: 400,
    fontSize: 12,
    fontFamily: 'Pretendard-Regular',
    lineHeight: 16,
    letterSpacing: 0.4,
  },
};
