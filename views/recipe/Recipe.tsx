import styled from 'styled-components/native';
import {color} from '../../style/color';
import {Search} from '../../assets';
import Txt from '../../components/Txt';
import {CategoriData} from '../../utils';

export const Recipe = ({navigation}: any) => {
  return (
    <Frame>
      <Gap>
        <InputFrame
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.12,
            shadowRadius: 16.0,
            elevation: 24,
          }}>
          <Input
            placeholder="레시피를 검색해보세요."
            placeholderTextColor={color.Gray[400]}
          />
          <Search color={color.Gray[400]} />
        </InputFrame>
      </Gap>
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
const Input = styled.TextInput`
  font-size: 16px;
  line-height: 24px;
  flex: 1;
`;
const InputFrame = styled.View`
  border-radius: 8px;
  background-color: ${color.White};
  padding: 0 8px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;
const Gap = styled.View`
  width: 100%;
  padding: 24px 16px;
`;
const Frame = styled.ScrollView`
  flex: 1;
  background-color: ${color.White};
`;
