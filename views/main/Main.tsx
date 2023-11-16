import {View} from 'react-native';
import styled from 'styled-components/native';
import {color} from '../../style/color';
import Txt from '../../components/Txt';
import {Access_time, Search} from '../../assets';
import UnderTxt from '../../components/UnderTxt';
import TodayMenu from '../../components/TodayMenu';
import RecipeLarge from '../../components/RecipeLarge';
import {useEffect, useState} from 'react';
import axios from 'axios';

export interface menuType {
  menu?: string;
  img?: string;
  recipe?: string;
}
type todayMenuProps = {
  [key in 'morning' | 'lunch' | 'dinner']: menuType;
};

const todayMenu: todayMenuProps = {
  morning: {
    menu: '토스트',
    img: 'https://cdn.pixabay.com/photo/2015/10/19/06/13/french-toast-995532_1280.jpg',
    recipe: '토스트',
  },
  lunch: {
    menu: '크림파스타',
    img: 'https://cdn.pixabay.com/photo/2023/10/10/08/40/alfredo-8305773_1280.jpg',
    recipe: '크림파스타',
  },
  dinner: {
    menu: '페페로니피자',
    img: 'https://cdn.pixabay.com/photo/2023/05/08/13/40/pizza-7978642_1280.jpg',
    recipe: '페페로니피자',
  },
};

export const Access_Token =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3amtubjMxMjNAZ21haWwuY29tIiwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTcwMDEzNzUyMiwiZXhwIjoxNzAwMTQ0NzIyfQ.0Vj0at6c5FgapVb9QJFB0gGNcePgbczxBXxYceVLMWx5_qNeCK0SE1ZxXwX8oCKInsE--yAiXAwqevLGdxdsSw';

export interface recommendDataRes {
  name: string;
  bigtype: string;
  material: string;
  description: string;
  url: string;
}

export interface categoryRes {
  categoryName: string;
  categoryImageUrl: string;
}

export const Main = ({navigation}: any) => {
  const [recommendData, setRecommendData] = useState<
    recommendDataRes[] | undefined
  >(undefined);
  const [category, setCategory] = useState<categoryRes[] | undefined>(
    undefined,
  );

  useEffect(() => {
    async function getRecommendRecipe() {
      await axios
        .get('http://43.202.18.230:8000/recipe/today', {
          headers: {Autorization: `Bearer ${Access_Token}`},
        })
        .then(res => setRecommendData([res.data]))
        .catch(err => console.log(err));
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
      <Header>
        <LeftFrame>
          <View
            style={{
              borderRadius: 100,
              backgroundColor: color.Green[500],
              width: 24,
              height: 24,
            }}
          />
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
          <TodayMenu data={todayMenu.morning} time="morning" nav={navigation} />
          <TodayMenu data={todayMenu.lunch} time="lunch" nav={navigation} />
          <TodayMenu data={todayMenu.dinner} time="dinner" nav={navigation} />
        </TodayRecipe>
        <Box>
          <UnderTxt>레시피 카테고리</UnderTxt>
          <CategoryFrame>
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
        </Box>
        <Box>
          <TextFrame>
            <Column>
              <UnderTxt>오늘의 추천</UnderTxt>
              <Txt>오늘의 추천 메뉴를 확인해 보세요</Txt>
            </Column>
            <View>
              <Txt color={color.Gray[500]}>더보기</Txt>
            </View>
          </TextFrame>
        </Box>
        <RecommendRecipe
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 16, gap: 8}}>
          {recommendData
            ? recommendData.map((v, i) => (
                <RecipeLarge nav={navigation} data={v} key={i} />
              ))
            : [1, 2, 3, 4, 5, 6].map(v => <RecipeLarge key={v} />)}
        </RecommendRecipe>
      </Content>
    </Frame>
  );
};

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
const CategoryFrame = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  row-gap: 12px;
  column-gap: 24px;
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
