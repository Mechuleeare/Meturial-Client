import styled from 'styled-components/native';
import {color} from '../../style/color';
import BackHeader from '../../components/BackHeader';

const CategoryRecipe = ({route, navigation}: any) => {
  const {recipe} = route.params;

  return (
    <Frame>
      <BackHeader name={recipe} nav={navigation} />
    </Frame>
  );
};

export default CategoryRecipe;

const Frame = styled.View`
  background-color: ${color.White};
  flex: 1;
`;
