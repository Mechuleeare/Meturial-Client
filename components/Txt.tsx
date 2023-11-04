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
    fontWeight: 700,
    fontSize: 57,
    fontFamily: 'Pretendard-Bold',
    lineHeight: 64,
    letterSpacing: -0.25,
  },
  DisplayMedium: {
    fontWeight: 700,
    fontSize: 45,
    fontFamily: 'Pretendard-Bold',
    lineHeight: 52,
    letterSpacing: 0,
  },
  DisplaySmall: {
    fontWeight: 700,
    fontSize: 36,
    fontFamily: 'Pretendard-Bold',
    lineHeight: 44,
    letterSpacing: 0,
  },
  HeadlineLarge: {
    fontWeight: 600,
    fontSize: 32,
    fontFamily: 'Pretendard-SemiBold',
    lineHeight: 40,
    letterSpacing: 0,
  },
  HeadlineMedium: {
    fontWeight: 600,
    fontSize: 28,
    fontFamily: 'Pretendard-SemiBold',
    lineHeight: 36,
    letterSpacing: 0,
  },
  HeadlineSmall: {
    fontWeight: 600,
    fontSize: 24,
    fontFamily: 'Pretendard-SemiBold',
    lineHeight: 32,
    letterSpacing: 0,
  },
  TitleLarge: {
    fontWeight: 600,
    fontSize: 22,
    fontFamily: 'Pretendard-SemiBold',
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
