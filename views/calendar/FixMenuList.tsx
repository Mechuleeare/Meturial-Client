import {styled} from 'styled-components/native';
import {color} from '../../style/color';
import {Arrow_back} from '../../assets';
import Txt from '../../components/Txt';
import {format} from 'date-fns';
import Button from '../../components/Button';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BaseUrl} from '../../utils';
import axios from 'axios';
import {Alert} from 'react-native';

interface MenuData {
  menuId: string;
  recipeId: string;
  recipeName: string;
  menuType: 'BREAKFAST' | 'LUNCH' | 'DINNER';
  recipeImageUrl: string;
}

interface IsActiveData {
  notificationType: 'BREAKFAST' | 'LUNCH' | 'DINNER';
  isActivated: boolean;
}

export const FixMenuList = ({navigation, route}: any) => {
  const {date} = route.params;
  const [today, setToday] = useState<MenuData[]>([]);
  const [activeState, setActiveState] = useState<IsActiveData[]>([]);
  const [Sort, setSort] = useState<MenuData[] | undefined>(undefined);
  console.log(today);
  console.log(Sort);

  useEffect(() => {
    async function GetTodayData() {
      const Token = await AsyncStorage.getItem('AccessToken');

      try {
        const result = await axios.get(`${BaseUrl}/menu`, {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
          params: {
            date: format(date, 'yyyy-M-dd'),
          },
        });
        setToday(result.data.menuDetailList);
      } catch (error) {
        console.log(error);
      }
    }
    GetTodayData();

    async function GetIsActive() {
      const Token = await AsyncStorage.getItem('AccessToken');

      try {
        const result = await axios.get(`${BaseUrl}/notification`, {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
          params: {
            date: format(date, 'yyyy-M-dd'),
          },
        });
        setActiveState(result.data.todayNotificationList);
      } catch (error) {
        console.log(error);
      }
    }
    GetIsActive();
  }, [date]);

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
      <Header onPress={() => navigation.goBack(null)}>
        <Arrow_back />
        <Txt typography="TitleMedium">식단 수정</Txt>
      </Header>
      <Line />
      <Body>
        <Txt typography="TitleLarge">{format(date, 'yyyy년 M월 d일')}</Txt>
        <BtnFlex>
          <Button
            status="silver"
            onPress={() => {
              if (Sort[0] !== undefined) {
                console.log(today[0]);
                navigation.navigate('FixMenu', {
                  lastData: today.map(j => {
                    if (j.menuType === 'BREAKFAST') {
                      return j;
                    }
                  }),
                  timeActive: activeState.map(a => {
                    if (a.notificationType === 'BREAKFAST') {
                      return a;
                    }
                  }),
                  timeState: '아침',
                  now: date,
                  data: '',
                });
              } else {
                Alert.alert('식단이 없습니다.', '', [
                  {text: '확인', style: 'cancel'},
                ]);
              }
            }}>
            아침 레시피 수정
          </Button>
          <Button
            status="silver"
            onPress={() => {
              if (Sort[0] !== undefined) {
                console.log(today[1]);
                navigation.navigate('FixMenu', {
                  lastData: today.map(j => {
                    if (j.menuType === 'LUNCH') {
                      return j;
                    }
                  }),
                  timeActive: activeState.map(a => {
                    if (a.notificationType === 'LUNCH') {
                      return a;
                    }
                  }),
                  timeState: '점심',
                  now: date,
                  data: '',
                });
              } else {
                Alert.alert('식단이 없습니다.', '', [
                  {text: '확인', style: 'cancel'},
                ]);
              }
            }}>
            점심 레시피 수정
          </Button>
          <Button
            status="silver"
            onPress={() => {
              if (Sort[0] !== undefined) {
                console.log(today[2]);
                navigation.navigate('FixMenu', {
                  lastData: today.map(j => {
                    if (j.menuType === 'DINNER') {
                      return j;
                    }
                  }),
                  timeActive: activeState.map(a => {
                    if (a.notificationType === 'DINNER') {
                      return a;
                    }
                  }),
                  timeState: '저녁',
                  now: date,
                  data: '',
                });
              } else {
                Alert.alert('식단이 없습니다.', '', [
                  {text: '확인', style: 'cancel'},
                ]);
              }
            }}>
            저녁 레시피 수정
          </Button>
        </BtnFlex>
      </Body>
    </Background>
  );
};

const Background = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${color.White};
`;

const Header = styled.Pressable`
  width: 100%;
  padding: 12px 16px;
  flex-direction: row;
  gap: 8px;
`;

const Line = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${color.Gray[100]};
`;

const Body = styled.View`
  width: 100%;
  padding: 24px 16px;
  gap: 24px;
`;

const BtnFlex = styled.View`
  gap: 12px;
`;
