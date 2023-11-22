import {styled} from 'styled-components/native';
import {color} from '../../style/color';
import axios from 'axios';
import {BaseUrl} from '../../utils';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodayMenu from '../../components/TodayMenu';
import Button from '../../components/Button';

interface MenuData {
  menuId: string;
  recipeId: string;
  recipeName: string;
  menuType: 'BREAKFAST' | 'LUNCH' | 'DINNER';
  recipeImageUrl: string;
}

export const TodayRecipe = ({navigation}: any) => {
  const [today, setToday] = useState<MenuData[]>([]);
  const [Sort, setSort] = useState<MenuData[]>([]);

  console.log(Sort);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const today = new Date();

    const formattedDate = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;

    async function GetTodayData() {
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
        setToday(result.data.menuDetailList);
      } catch (error) {
        console.log(error);
      }
    }
    GetTodayData();
  }, []);

  useEffect(() => {
    function SortData() {
      const sortedData: MenuData[] = [];
      today.forEach(
        v => {
          if (v.menuType === 'BREAKFAST') {
            sortedData[0] = v;
          } else if (v.menuType === 'LUNCH') {
            sortedData[1] = v;
          } else if (v.menuType === 'DINNER') {
            sortedData[2] = v;
          }
        },
        [sortedData],
      );
      setSort(sortedData);
    }
    SortData();
  }, [today]);

  return (
    <Background>
      <TodayFlex>
        {Sort.map(v => (
          <TodayMenu
            time={v.menuType}
            recipeId={v.recipeId}
            recipeImg={v.recipeImageUrl}
            recipeName={v.recipeName}
            navigation={navigation}
          />
        ))}
      </TodayFlex>
      <BtnFlex>
        <Button>식단 변경하기</Button>
        <Button status="silver">알림 관리</Button>
      </BtnFlex>
    </Background>
  );
};

const Background = styled.ScrollView`
  width: 100%;
  height: 100%;
  flex: 1;
  background-color: ${color.White};
  padding: 24px 16px;
`;

const TodayFlex = styled.View`
  gap: 8px;
`;

const BtnFlex = styled.View`
  width: 100%;
  gap: 8px;
  margin-top: 24px;
  margin-bottom: 100px;
`;
