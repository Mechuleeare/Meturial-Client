import {styled} from 'styled-components/native';
import {color} from '../../style/color';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ReviewPreview from '../../components/ReviewPreview';
import {BaseUrl} from '../../utils';
import BackHeader from '../../components/BackHeader';

export interface RecipeType {
  content: string;
  createdAt: string;
  recipeName: string;
  reviewId: string;
  reviewImageUrl: string;
  starRating: number;
}

export const MyReviewList = ({navigation}: any) => {
  const [recipe, setRecipe] = useState<RecipeType[]>([]);
  const [recipeCount, setRecipeCount] = useState<string>();

  useEffect(() => {
    async function AxiosMyRecipeApi() {
      const Token = await AsyncStorage.getItem('AccessToken');
      try {
        const result = await axios.get(`${BaseUrl}/review/my`, {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        });
        console.log(result.data);
        const recipeData = result.data.myReviewList;
        setRecipe(recipeData);
        setRecipeCount(result.data.myReviewCount);
      } catch (error) {
        console.log(error);
      }
    }
    AxiosMyRecipeApi();
  }, []);

  return (
    <Background>
      <BackHeader name="내가 작성한 후기" num={recipeCount} nav={navigation} />
      <Scroll>
        <ReviewFlex>
          {recipe.map(v => (
            <ReviewPreview
              key={v.reviewId}
              name={v.recipeName}
              starRating={v.starRating}
              content={v.content}
              reviewImageUrl={v.reviewImageUrl}
              createdAt={v.createdAt}
              onTouch={() =>
                navigation.navigate('Review', {
                  data: v.reviewId,
                  edit: true,
                  my: true,
                })
              }
            />
          ))}
        </ReviewFlex>
      </Scroll>
    </Background>
  );
};

const Background = styled.View`
  width: 100%;
  flex: 1;
  background-color: ${color.White};
`;

const Scroll = styled.ScrollView`
  width: 100%;
  flex: 1;
  padding: 0 16px;
`;

const ReviewFlex = styled.View`
  margin-top: 24px;
  margin-bottom: 24px;
  gap: 18px;
`;
