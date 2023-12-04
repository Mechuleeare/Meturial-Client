import {styled} from 'styled-components/native';
import {color} from '../../style/color';
import axios from 'axios';
import {BaseUrl} from '../../utils';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodayMenu from '../../components/TodayMenu';
import Button from '../../components/Button';
import Txt from '../../components/Txt';
import {Dimensions, View} from 'react-native';
import {format} from 'date-fns';

interface MenuData {
  menuId: string;
  recipeId: string;
  recipeName: string;
  menuType: 'BREAKFAST' | 'LUNCH' | 'DINNER';
  recipeImageUrl: string;
}

export const TodayRecipe = ({navigation}: any) => {
  const [today, setToday] = useState<MenuData[]>([]);
  const [Sort, setSort] = useState<MenuData[] | undefined>(undefined);
  console.log(today);
  console.log(Sort);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const today = new Date();

    const formattedDate = format(today, 'yyyy-M-dd');

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
        console.log(result.data);
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
      if (sortedData.length === 0) {
        setSort(undefined);
      }
    }
    SortData();
  }, [today]);

  return (
    <Background>
      <TodayFlex>
        {Sort ? (
          Sort.map(v => (
            <TodayMenu
              key={v.menuId}
              time={v.menuType}
              recipeId={v.recipeId}
              recipeImg={v.recipeImageUrl}
              recipeName={v.recipeName}
              navigation={navigation}
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
                onPress={() => navigation.navigate('AddMenu')}>
                식단 등록하기
              </Button>
            </View>
          </None>
        )}
      </TodayFlex>
      <BtnFlex>
        <Button
          onPress={() =>
            navigation.navigate('FixMenuList', {date: new Date()})
          }>
          식단 변경하기
        </Button>
        <Button
          status="silver"
          onPress={() =>
            navigation.navigate('AlarmManager', {date: new Date()})
          }>
          알림 관리
        </Button>
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
