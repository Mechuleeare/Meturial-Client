import styled from 'styled-components/native';
import {Arrow_left} from '../assets';
import Txt from './Txt';
import {color} from '../style/color';

const BackHeader = () => {
  return (
    <Frame>
      <Arrow_left />
      <Txt typography="TitleMedium">이거슨 헤더요</Txt>
    </Frame>
  );
};

export default BackHeader;

const Frame = styled.View`
  height: 48px;
  width: 100%;
  padding: 0 16px;
  gap: 8px;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid ${color.Gray[100]};
`;
