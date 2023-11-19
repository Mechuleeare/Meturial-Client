import styled from 'styled-components/native';
import {color} from '../../style/color';
import {Search} from '../../assets';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {RecipeSmall} from '../../components/RecipeSmall';

interface RankingRes {
  recipeId: string;
  name: string;
  isChoice: boolean;
  starRating: number;
  starCount: number;
  recipeImageUrl: string;
  recipeCategory: string[];
  recipeMaterial: string[];
}

const Ranking = ({navigation}: any) => {
  const [ranking, setRanking] = useState<RankingRes[] | undefined>(undefined);

  useEffect(() => {
    async function getRecommendRecipe() {
      const Token = await AsyncStorage.getItem('AccessToken');
      await axios
        .get('http://43.202.18.230:80/recipe/ranking', {
          headers: {Authorization: `Bearer ${Token}`},
          params: {type: 'starRating'},
        })
        .then(res => setRanking(res.data.recipeRankingList))
        .catch(err => console.log(err));
    }

    getRecommendRecipe();
  }, []);

  console.log(ranking?.length);
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
            placeholder="재료별 레시피를 검색해보세요."
            placeholderTextColor={color.Gray[400]}
          />
          <Search color={color.Gray[400]} />
        </InputFrame>
      </Gap>
      {ranking?.splice(0, 10).map((v, i) => (
        <RecipeSmall
          recipeId={v.recipeId}
          name={v.name}
          starRating={v.starRating}
          starCount={v.starCount}
          recipeImageUrl={v.recipeImageUrl}
          recipeCategory={v.recipeCategory}
          wishState={true}
          navigation={navigation}
          key={i}
        />
      ))}
    </Frame>
  );
};

export default Ranking;

const InputFrame = styled.View`
  border-radius: 8px;
  background-color: ${color.White};
  padding: 0 8px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;
const Input = styled.TextInput`
  font-size: 16px;
  line-height: 24px;
  flex: 1;
`;
const Gap = styled.View`
  width: 100%;
  padding: 24px 16px;
`;
const Frame = styled.ScrollView`
  flex: 1;
  background-color: ${color.White};
`;
