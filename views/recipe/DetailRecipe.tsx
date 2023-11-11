import styled from 'styled-components/native';
import Button from '../../components/Button';
import {color} from '../../style/color';
import BackHeader from '../../components/BackHeader';

const DetailRecipe = ({navigation}: any) => {
  return (
    <Frame>
      <BackHeader />
      <Button onPress={() => navigation.goBack()}>뒤로가기</Button>
    </Frame>
  );
};

export default DetailRecipe;

const Frame = styled.View`
  background-color: ${color.White};
  flex: 1;
`;
