import styled from 'styled-components/native';
import {color} from '../../style/color';
import {Search} from '../../assets';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Access_Token, categoryRes} from '../main/Main';
import Txt from '../../components/Txt';
import {View} from 'react-native';

export const Recipe = ({navigation}: any) => {
  const [category, setCategory] = useState<categoryRes[] | undefined>(
    undefined,
  );

  useEffect(() => {
    async function getRecommendRecipe() {
      await axios
        .get('http://43.202.18.230:80/recipe/category', {
          headers: {Authorization: `Bearer ${Access_Token}`},
        })
        .then(res => setCategory(res.data.category))
        .catch(err => console.log(err));
    }

    getRecommendRecipe();
  }, []);
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
      <CategoryFrame
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 24,
          gap: 12,
        }}>
        {category
          ? category.map(v => (
              <ItemBox
                key={v.categoryName}
                onTouchEnd={() =>
                  navigation.navigate('CategoryRecipe', {
                    recipe: v.categoryName,
                  })
                }>
                <ItemImg />
                <Txt typography="LabelMedium">{v.categoryName}</Txt>
              </ItemBox>
            ))
          : [1, 2, 3, 4, 5, 6, 7, 8].map(v => (
              <ItemBox key={v}>
                <ItemImg />
                <View
                  style={{
                    backgroundColor: color.Gray[50],
                    height: 18,
                    width: 32,
                    borderRadius: 8,
                  }}
                />
              </ItemBox>
            ))}
      </CategoryFrame>
    </Frame>
  );
};

const ItemImg = styled.View`
  height: 64px;
  width: 64px;
  border-radius: 32px;
  background-color: ${color.Gray[100]};
`;
const ItemBox = styled.View`
  gap: 4px;
  align-items: center;
`;
const CategoryFrame = styled.ScrollView``;
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
