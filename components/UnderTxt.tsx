import styled from 'styled-components/native';
import Txt from './Txt';
import {ReactNode, useState} from 'react';
import {color} from '../style/color';

const UnderTxt = ({
  typo = 'TitleLarge',
  children,
}: {
  typo?: 'TitleLarge' | 'HeadlineLarge';
  children: ReactNode;
}) => {
  const [width, setWidth] = useState<number>(0);

  return (
    <Frame>
      <Txt
        typography={typo}
        onLayout={e => setWidth(e.nativeEvent.layout.width)}>
        {children}
      </Txt>
      <Line width={width} />
    </Frame>
  );
};

export default UnderTxt;

const Line = styled.View<{width: number}>`
  background-color: ${color.Green[100]};
  border-radius: 2px;
  height: 12px;
  width: ${props => props.width}px;
  position: relative;
  top: -10px;
  z-index: -1;
`;
const Frame = styled.View`
  flex-wrap: wrap;
  align-items: flex-start;
`;
