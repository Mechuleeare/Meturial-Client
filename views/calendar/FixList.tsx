import {styled} from 'styled-components/native';
import {color} from '../../style/color';
import {Arrow_back, Star_filled} from '../../assets';
import Txt from '../../components/Txt';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {BaseUrl} from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface WishPreviewData {
  menuId: string;
  choiceId: string;
  recipeId: string;
  name: string;
  starRating: number;
  starCount: number;
  recipeImageUrl: string;
  recipeCategory: string;
}

export const FixList = ({navigation, route}: any) => {
  const [wishListData, setWishListData] = useState<WishPreviewData[]>([]);
  const [wishListCount, setWishListCount] = useState<number>(0);

  useEffect(() => {
    async function getMenuList() {
      const Token = await AsyncStorage.getItem('AccessToken');
      try {
        const result = await axios.get(`${BaseUrl}/choice`, {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        });
        setWishListData(result.data.choiceRecipeList);
        setWishListCount(result.data.choiceRecipeCount);
        console.log(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    getMenuList();
  }, []);

  return (
    <Background>
      <Header onPress={() => navigation.goBack(null)}>
        <Arrow_back />
        <Txt typography="TitleMedium">레시피 선택</Txt>
        <Txt typography="TitleMedium" color={color.Green.Point}>
          {wishListCount}
        </Txt>
      </Header>
      <Line />
      <List>
        {wishListData.map(v => (
          <MenuBackground
            onTouchEnd={() =>
              navigation.navigate('FixMenu', {
                data: {
                  img: v.recipeImageUrl,
                  name: v.name,
                  starRating: v.starRating,
                  starCount: v.starCount,
                  category: v.recipeCategory,
                  recipeId: v.choiceId,
                  menuId: route.params.menuId,
                },
                lastData: route.params.lastData,
                timeState: route.params.timeState,
                now: route.params.now,
                timeActive: route.params.timeActive,
              })
            }
            key={v.recipeId}>
            <WishImg
              source={{
                uri: v.recipeImageUrl,
              }}
              borderRadius={4}
            />
            <Center>
              <Top>
                <Txt typography="TitleMedium">{v.name}</Txt>
                <StartFlex>
                  <Star_filled size={16} color={color.Yellow.Point} />
                  <Txt>{v.starRating}</Txt>
                </StartFlex>
              </Top>
              <Txt typography="LabelSmall" color={color.Gray[300]}>
                {v.starCount}명의 후기
              </Txt>
              <Bottom>
                {v.recipeCategory.split(',').map((j, i) => (
                  <Txt typography="BodySmall" color={color.Green.Point} key={i}>
                    #{j}
                  </Txt>
                ))}
              </Bottom>
            </Center>
          </MenuBackground>
        ))}
      </List>
    </Background>
  );
};

const Background = styled.View`
  width: 100%;
  height: 100%;
  flex: 1;
  background-color: ${color.White};
`;

const Header = styled.Pressable`
  gap: 8px;
  padding: 12px 16px;
  flex-direction: row;
  align-items: center;
`;

const Line = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${color.Gray[100]};
`;

const List = styled.ScrollView`
  width: 100%;
  height: 100%;
  padding: 24px 16px;
  flex: 1;
`;

const MenuBackground = styled.View`
  flex: 1;
  width: 100%;
  height: 70px;
  flex-direction: row;
  gap: 12px;
  position: relative;
  margin-bottom: 16px;
`;

const WishImg = styled.Image`
  width: 70px;
  height: 70px;
  object-fit: cover;
`;

const Center = styled.View`
  width: 216px;
  height: 70px;
`;

const Top = styled.View`
  flex-direction: row;
  gap: 12px;
  height: 24px;
  align-items: center;
`;

const StartFlex = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Bottom = styled.View`
  margin-top: 8px;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;
