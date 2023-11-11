import styled from 'styled-components/native';
import {color} from '../../style/color';
import BackHeader from '../../components/BackHeader';

const DetailRecipe = ({route, navigation}: any) => {
  const {recipe} = route.params;

  return (
    <Frame>
      <BackHeader name={recipe} nav={navigation} />
    </Frame>
  );
};

export default DetailRecipe;

const Frame = styled.View`
  background-color: ${color.White};
  flex: 1;
`;
