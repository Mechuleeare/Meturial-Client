import {Dimensions, Pressable, View, Image} from 'react-native';
import styled from 'styled-components/native';
import {color} from '../../style/color';
import Txt from '../../components/Txt';
import {Access_time, Logo, Search} from '../../assets';
import UnderTxt from '../../components/UnderTxt';
import TodayMenu from '../../components/TodayMenu';
import RecipeLarge from '../../components/RecipeLarge';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {BaseUrl, CategoriData} from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../components/Button';

export interface menuType {
  menu?: string;
  img?: string;
  recipe?: string;
}

export interface recommendDataRes {
  name: string;
  bigtype: string;
  material: string;
  description: string;
  url: string;
  id: number;
}

export interface categoryRes {
  categoryName: string;
  categoryImageUrl: string;
}

interface MenuData {
  menuId: string;
  recipeId: string;
  recipeName: string;
  menuType: 'BREAKFAST' | 'LUNCH' | 'DINNER';
  recipeImageUrl: string;
}

export const Main = ({navigation}: any) => {
  const [menu, setMenu] = useState<MenuData[] | undefined>(undefined);
  const [recommendData, setRecommendData] = useState<
    recommendDataRes[] | undefined
  >(undefined);
  console.log(menu);

  useEffect(() => {
    const today = new Date();

    const formattedDate = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;
    async function getAlarmData() {
      const Token = await AsyncStorage.getItem('AccessToken');
      try {
        const result = await axios.get(`${BaseUrl}/menu`, {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
          params: {
            date: formattedDate,
          },
        });
        console.log(result.data);
        const hours = today.getHours();
        if (hours > 8 && hours <= 12) {
          setMenu(result.data.menuDetailList[1]);
        } else if (hours > 12 && hours <= 18) {
          setMenu(result.data.menuDetailList[2]);
        } else if (hours > 18 && hours <= 8) {
          setMenu(result.data.menuDetailList[0]);
        }
      } catch (error) {
        console.log(error);
      }
    }
    async function getRecommendRecipe() {
      const Token = await AsyncStorage.getItem('AccessToken');
      await axios
        .get('http://43.202.18.230:8000/recipe/today', {
          headers: {Autorization: `Bearer ${Token}`},
        })
        .then(res => setRecommendData([...res.data]))
        .catch(err => console.log(err));
    }

    getRecommendRecipe();
    getAlarmData();
  }, []);
  return (
    <Frame>
      <Header>
        <LeftFrame>
          <Image source={Logo} />
          <Txt typography="TitleMedium">메추리알</Txt>
        </LeftFrame>
        <RightFrame>
          <Search />
          <Access_time />
        </RightFrame>
      </Header>
      <Content contentContainerStyle={{paddingBottom: 120}}>
        <TodayRecipe
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 16, gap: 32}}>
          {menu ? (
            menu.map(v => (
              <TodayMenu
                recipeId={v.menuId}
                time={v.menuType}
                recipeImg={v.recipeImageUrl}
                navigation={navigation}
                recipeName={v.recipeName}
                key={v.menuId}
              />
            ))
          ) : (
            <None>
              <Txt typography="TitleMedium">오늘 등록된 식단이 없어요</Txt>
              <Txt typography="BodySmall">
                오늘의 식단을 등록하여 시간에 맞춰 식사해 보세요.
              </Txt>
              <View style={{marginTop: 8}}>
                <Button
                  status="primary2"
                  onPress={() => navigation.navigate('Calendar')}>
                  식단 등록하기
                </Button>
              </View>
            </None>
          )}
        </TodayRecipe>
        <Box>
          <UnderTxt>레시피 카테고리</UnderTxt>
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
        </Box>
        <Box>
          <TextFrame>
            <Column>
              <UnderTxt>오늘의 추천</UnderTxt>
              <Txt>오늘의 추천 메뉴를 확인해 보세요</Txt>
            </Column>
            <Pressable
              onPress={() =>
                navigation.navigate('Today', {data: recommendData})
              }>
              <Txt color={color.Gray[500]}>더보기</Txt>
            </Pressable>
          </TextFrame>
        </Box>
        <RecommendRecipe
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 16, gap: 8}}>
          {recommendData
            ? recommendData
                .slice(0, 6)
                .map((v: recommendDataRes, i) => (
                  <RecipeLarge nav={navigation} data={v} key={i} />
                ))
            : [1, 2, 3, 4, 5, 6].map(v => <RecipeLarge key={v} />)}
        </RecommendRecipe>
      </Content>
    </Frame>
  );
};

const None = styled.View`
  width: ${Dimensions.get('window').width - 32}px;
  background-color: white;
  height: 200px;
  border-radius: 8px;
  border: 2px solid ${color.Gray[50]};
  justify-content: center;
  align-items: center;
  gap: 4px;
`;
const RecommendRecipe = styled.ScrollView`
  margin-top: 16px;
  width: 100%;
`;
const Column = styled.View`
  gap: 2px;
`;
const TextFrame = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
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
`;
const Box = styled.View`
  gap: 16px;
  padding: 40px 16px 0;
  overflow: visible;
`;
const Content = styled.ScrollView``;
const TodayRecipe = styled.ScrollView`
  height: 200px;
  margin-top: 12px;
  display: flex;
  gap: 8px;
`;
const RightFrame = styled.View`
  gap: 16px;
  flex-direction: row;
`;
const LeftFrame = styled.View`
  align-items: center;
  flex-direction: row;
  gap: 4px;
`;
const Header = styled.View`
  height: 48px;
  background-color: ${color.White};
  align-items: center;
  flex-direction: row;
  padding: 0 16px;
  justify-content: space-between;
`;
const Frame = styled.View`
  background-color: ${color.White};
  flex: 1;
`;
