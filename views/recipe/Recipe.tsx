import styled from 'styled-components/native';
import {color} from '../../style/color';
import Txt from '../../components/Txt';
import {CategoriData} from '../../utils';

export const Recipe = ({navigation}: any) => {
  return (
    <Frame contentContainerStyle={{paddingTop: 24}}>
      <CategoryFrame>
        {CategoriData.map(v => (
          <ItemBox
            key={v.name}
            onTouchEnd={() =>
              navigation.navigate('CategoryRecipe', {
                category: v.name,
              })
            }>
            <ItemImg source={{uri: v.img}} />
            <Txt typography="LabelMedium">{v.name}</Txt>
          </ItemBox>
        ))}
      </CategoryFrame>
    </Frame>
  );
};

const ItemImg = styled.Image`
  height: 64px;
  width: 64px;
  border-radius: 32px;
  object-fit: cover;
`;
const ItemBox = styled.View`
  gap: 4px;
  align-items: center;
`;
const CategoryFrame = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  row-gap: 12px;
  column-gap: 36px;
  padding: 0 16px;
`;
const Frame = styled.ScrollView`
  flex: 1;
  background-color: ${color.White};
`;
