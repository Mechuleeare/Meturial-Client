import styled from 'styled-components/native';
import {color} from '../style/color';

const Line = () => {
  return (
    <Frame>
      <Solid />
    </Frame>
  );
};

export default Line;

const Solid = styled.View`
  height: 2px;
  width: 100%;
  background-color: ${color.Gray[50]};
`;
const Frame = styled.View`
  width: 100%;
  padding: 24px 16px;
`;
