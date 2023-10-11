import React, { ReactNode } from 'react';
import { Text, TextProps, TextStyle } from 'react-native';

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
    fontSize: '57px',
    fontFamily: 'Pretendard-Bold',
    lineHeight: '64px',
    letterSpacing: '-0.25%',
  },
  DisplayMedium: {
    fontWeight: 700,
    fontSize: '45px',
    fontFamily: 'Pretendard-Bold',
    lineHeight: '52px',
    letterSpacing: '0%',
  },
  DisplaySmall: {
    fontWeight: 700,
    fontSize: '36px',
    fontFamily: 'Pretendard-Bold',
    lineHeight: '44px',
    letterSpacing: '0%',
  },
  HeadlineLarge: {
    fontWeight: 600,
    fontSize: '32px',
    fontFamily: 'Pretendard-SemiBold',
    lineHeight: '40px',
    letterSpacing: '0%',
  },
  HeadlineMedium: {
    fontWeight: 600,
    fontSize: '28px',
    fontFamily: 'Pretendard-SemiBold',
    lineHeight: '36px',
    letterSpacing: '0%',
  },
  HeadlineSmall: {
    fontWeight: 600,
    fontSize: '24px',
    fontFamily: 'Pretendard-SemiBold',
    lineHeight: '32px',
    letterSpacing: '0%',
  },
  TitleLarge: {
    fontWeight: 600,
    fontSize: '22px',
    fontFamily: 'Pretendard-SemiBold',
    lineHeight: '28px',
    letterSpacing: '0%',
  },
  TitleMedium: {
    fontWeight: 500,
    fontSize: '16px',
    fontFamily: 'Pretendard-Medium',
    lineHeight: '24px',
    letterSpacing: '0.15%',
  },
  TitleSmall: {
    fontWeight: 500,
    fontSize: '14px',
    fontFamily: 'Pretendard-Medium',
    lineHeight: '20px',
    letterSpacing: '0.1%',
  },
  LabelLarge: {
    fontWeight: 500,
    fontSize: '14px',
    fontFamily: 'Pretendard-Medium',
    lineHeight: '20px',
    letterSpacing: '0.1%',
  },
  LabelMedium: {
    fontWeight: 500,
    fontSize: '12px',
    fontFamily: 'Pretendard-Medium',
    lineHeight: '16px',
    letterSpacing: '0.5%',
  },
  LabelSmall: {
    fontWeight: 500,
    fontSize: '11px',
    fontFamily: 'Pretendard-Medium',
    lineHeight: '16px',
    letterSpacing: '0.5%',
  },
  BodyLarge: {
    fontWeight: 400,
    fontSize: '16px',
    fontFamily: 'Pretendard-Regular',
    lineHeight: '24px',
    letterSpacing: '0.5%',
  },
  BodyMedium: {
    fontWeight: 400,
    fontSize: '14px',
    fontFamily: 'Pretendard-Regular',
    lineHeight: '20px',
    letterSpacing: '0.25%',
  },
  BodySmall: {
    fontWeight: 400,
    fontSize: '12px',
    fontFamily: 'Pretendard-Regular',
    lineHeight: '16px',
    letterSpacing: '0.4%',
  },
};
