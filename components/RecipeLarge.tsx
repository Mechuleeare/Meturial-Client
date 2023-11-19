import styled from 'styled-components/native';
import {color} from '../style/color';
import Txt from './Txt';
import {Star_filled} from '../assets';
import WishButton from './WishButton';
import {recommendDataRes} from '../views';
import {View} from 'react-native';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BaseUrl} from '../utils';

interface starRes {
  recipeId: string;
  isChoice: boolean;
  starRating: number;
  starCount: number;
}

const RecipeLarge = ({
  nav,
  data,
}: {
  nav?: any;
  data?: recommendDataRes | undefined;
}) => {
  const [star, setStar] = useState<starRes>({
    recipeId: '',
    isChoice: false,
    starRating: 0,
    starCount: 0,
  });

  const {recipeId, isChoice, starRating, starCount} = star;

  useEffect(() => {
    const getStar = async () => {
      const Token = await AsyncStorage.getItem('AccessToken');
      if (data) {
        await axios({
          method: 'GET',
          url: `${BaseUrl}/recipe`,
          params: {name: data.name},
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        })
          .then(res => setStar(res.data))
          .catch(err => console.log(err));
      }
    };
    getStar();
  }, [data]);
  return (
    <View>
      {data ? (
        <RecipeFrame
          onTouchEnd={() => nav.navigate('DetailRecipe', {recipeId: recipeId})}>
          <BigImg source={{uri: `${data.url}`}} />
          <Title>
            <Txt typography="TitleMedium">{data.name}</Txt>
            <WishButton size={18} recipeId={recipeId} wishState={isChoice} />
          </Title>
          <TagFrame>
            <Txt typography="BodySmall" color={color.Green[500]}>
              #{data.bigtype}
            </Txt>
          </TagFrame>
          <SubFrame>
            <Txt typography="LabelSmall" color={color.Gray[300]}>
              {starCount}명의 후기
            </Txt>
            <StarFrame>
              <Star_filled size={16} color={color.Yellow.Point} />
              <Txt typography="BodySmall" color={color.Yellow[900]}>
                {starRating}
              </Txt>
            </StarFrame>
          </SubFrame>
        </RecipeFrame>
      ) : (
        <RecipeFrame>
          <Skeleton height={180} width={180} />
          <Title>
            <Skeleton height={24} width={80} />
            <Skeleton height={18} width={18} />
          </Title>
          <TagFrame>
            <Skeleton width={40} />
          </TagFrame>
          <SubFrame>
            <Skeleton width={100} />
            <StarFrame>
              <Skeleton width={36} />
            </StarFrame>
          </SubFrame>
        </RecipeFrame>
      )}
    </View>
  );
};

export default RecipeLarge;

export const Skeleton = styled.View<{height?: number; width: number}>`
  background-color: ${color.Gray[50]};
  border-radius: 8px;
  height: ${props => props.height || 16}px;
  width: ${props => props.width}px;
`;
const StarFrame = styled.View`
  flex-direction: row;
  align-items: center;
`;
const SubFrame = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 8px 0;
`;
const TagFrame = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 4px;
  padding: 2px 8px 0;
`;
const Title = styled.View`
  padding: 8px 8px 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const BigImg = styled.Image`
  width: 180px;
  height: 180px;
  background-color: ${color.Gray[100]};
  border-radius: 8px;
  object-fit: cover;
`;
const RecipeFrame = styled.View``;
