import styled from 'styled-components/native';
import Txt from './Txt';
import {ReactNode} from 'react';
import {color} from '../style/color';

const UnderTxt = ({
  typo = 'TitleLarge',
  children,
}: {
  typo?: 'TitleLarge' | 'HeadlineLarge';
  children: ReactNode;
}) => {
  return (
    <Frame>
      <Txt typography={typo}>{children}</Txt>
      <Line />
    </Frame>
  );
};

export default UnderTxt;

const Line = styled.View`
  background-color: ${color.Green[100]};
  height: 20px;
`;
const Frame = styled.View`
  position: absolute;
  width: auto;
`;
