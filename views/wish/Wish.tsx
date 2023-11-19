import {styled} from 'styled-components/native';
import {color} from '../../style/color';
import Txt from '../../components/Txt';
import {WishPreview} from '../../components/WishPreview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BaseUrl} from '../../utils';
import axios from 'axios';
import {useEffect, useState} from 'react';
import UnderTxt from '../../components/UnderTxt';

interface WishPreviewData {
  choiceId: string;
  recipeId: string;
  name: string;
  starRating: number;
  starCount: number;
  recipeImageUrl: string;
  recipeCategory: string;
}

export const Wish = () => {
  const [wishListData, setWishListData] = useState<WishPreviewData[]>([]);
  const [wishListCount, setWishListCount] = useState<number>(0);
  useEffect(() => {
    async function AxiosMyWish() {
      const Token = await AsyncStorage.getItem('AccessToken');
      try {
        const result = await axios.get(`${BaseUrl}/choice`, {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        });
        console.log(result.data.choiceRecipeList);
        setWishListData(result.data.choiceRecipeList);
        setWishListCount(result.data.choiceRecipeCount);
      } catch (error) {
        console.log(error);
      }
    }
    AxiosMyWish();
  }, []);

  return (
    <Background>
      <Header>
        <UnderTxt typo="HeadlineLarge">찜 목록</UnderTxt>
        <TxtFlex>
          <Txt typography="TitleSmall">찜한 음식이 </Txt>
          <Txt typography="TitleSmall" color={color.Green.Point}>
            {wishListCount}
          </Txt>
          <Txt typography="TitleSmall">개 있어요.</Txt>
        </TxtFlex>
      </Header>
      <PreviewList>
        {wishListData.map(v => (
          <WishPreview
            choiceId={v.choiceId}
            recipeId={v.recipeId}
            name={v.name}
            starRating={v.starRating}
            starCount={v.starCount}
            recipeImageUrl={v.recipeImageUrl}
            recipeCategory={v.recipeCategory}
            wishState={true}
          />
        ))}
      </PreviewList>
    </Background>
  );
};

const Background = styled.View`
  width: 100%;
  flex: 1;
  background-color: ${color.White};
  padding: 0 16px;
`;

const Header = styled.View`
  width: 100%;
  margin: 32px 0;
  gap: 6px;
`;

const TxtFlex = styled.View`
  flex-direction: row;
  align-items: center;
`;

const PreviewList = styled.ScrollView`
  width: 100%;
  margin-top: 32px;
`;
