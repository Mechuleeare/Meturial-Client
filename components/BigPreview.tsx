import {styled} from 'styled-components/native';
import Txt from './Txt';
import WishButton from './WishButton';
import {color} from '../style/color';
import {Star_filled} from '../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {recommendDataRes} from '../views';
import {Skeleton, starRes} from './RecipeLarge';
import {useEffect, useState} from 'react';
import {BaseUrl} from '../utils';
import {View} from 'react-native';

export const BigPreview = ({
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
        <Background
          onTouchEnd={() => nav.navigate('DetailRecipe', {recipeId: recipeId})}>
          <BigImg
            source={{
              uri: data.url,
            }}
          />
          <Bottom>
            <Flex>
              <Txt typography="TitleLarge">{data.name}</Txt>
              <WishButton size={20} recipeId={recipeId} wishState={isChoice} />
            </Flex>
            <Flex>
              <Txt typography="BodySmall" color={color.Green.Point}>
                #{data.bigtype}
              </Txt>
            </Flex>
            <Flex style={{paddingTop: 4}}>
              <Txt typography="LabelSmall" color={color.Gray[300]}>
                {starCount}명의 후기
              </Txt>
              <StartFlex>
                <Star_filled size={16} color={color.Yellow.Point} />
                <Txt typography="BodySmall">{starRating}</Txt>
              </StartFlex>
            </Flex>
          </Bottom>
        </Background>
      ) : (
        <Background>
          <SkeletonImg />
          <Bottom>
            <Flex>
              <Skeleton width={100} height={28} />
              <Skeleton width={20} height={20} />
            </Flex>
            <Flex>
              <Skeleton width={120} />
            </Flex>
            <Flex style={{paddingTop: 4}}>
              <Skeleton width={64} />
              <Skeleton width={36} />
            </Flex>
          </Bottom>
        </Background>
      )}
    </View>
  );
};

const SkeletonImg = styled.View`
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  background-color: ${color.Gray[50]};
`;
const Background = styled.Pressable`
  width: 100%;
  gap: 8px;
`;
const BigImg = styled.Image`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 8px;
`;
const Bottom = styled.View`
  width: 100%;
  padding: 0 8px;
  gap: 4px;
`;
const Flex = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const StartFlex = styled.View`
  flex-direction: row;
  align-items: center;
`;
