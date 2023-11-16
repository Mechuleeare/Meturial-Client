import Txt from '../../components/Txt';
import styled from 'styled-components/native';
import {color} from '../../style/color';

const Ranking = () => {
  return (
    <Frame>
      <Txt>this is Ranking page!</Txt>
    </Frame>
  );
};

export default Ranking;

const Frame = styled.ScrollView`
  flex: 1;
  background-color: ${color.White};
`;
