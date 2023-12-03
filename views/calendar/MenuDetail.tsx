import {styled} from 'styled-components/native';
import {color} from '../../style/color';
import {Arrow_back} from '../../assets';
import Txt from '../../components/Txt';
import {useEffect, useState} from 'react';
import {format} from 'date-fns';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BaseUrl} from '../../utils';
import {Dimensions, View} from 'react-native';
import Button from '../../components/Button';
import TodayMenu from '../../components/TodayMenu';

interface MenuData {
  menuId: string;
  recipeId: string;
  recipeName: string;
  menuType: 'BREAKFAST' | 'LUNCH' | 'DINNER';
  recipeImageUrl: string;
}

export const MenuDetail = ({navigation, route}: any) => {
  const {date} = route.params;
  const [detailData, setDetailData] = useState<MenuData[]>([]);
  const [Sort, setSort] = useState<MenuData[] | undefined>(undefined);
  console.log(Sort);

  useEffect(() => {
    async function GetDetailData() {
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
        console.log(result.data);
        setDetailData(result.data.menuDetailList);
      } catch (error) {
        console.log(error);
      }
    }

    GetDetailData();
  }, [date]);
  useEffect(() => {
    function SortData() {
      const sortedData: MenuData[] = [];
      detailData.forEach(
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
  }, [detailData]);

  return (
    <Background>
      <Header>
        <ImgBtn onPress={() => navigation.goBack(null)}>
          <Arrow_back />
        </ImgBtn>
        <Txt typography="TitleMedium">오늘의 식단!</Txt>
      </Header>
      <Body>
        <DateFlex>
          <Txt typography="LabelLarge">날짜</Txt>
          <Date>
            <Txt typography="TitleLarge" color={color.Gray[800]}>
              {format(date, 'yyyy년 M월 d일')}
            </Txt>
          </Date>
        </DateFlex>
        <TodayFlex>
          <Txt typography="LabelLarge">레시피</Txt>
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
                <Button status="primary2">식단 등록하기</Button>
              </View>
            </None>
          )}
        </TodayFlex>
        <BtnFlex>
          <Button
            onPress={() => navigation.navigate('FixMenuList', {date: date})}>
            식단 변경하기
          </Button>
          <Button
            status="silver"
            onPress={() => navigation.navigate('AlarmManager', {date: date})}>
            알림 관리
          </Button>
        </BtnFlex>
      </Body>
    </Background>
  );
};

const Background = styled.View`
  width: 100%;
  flex: 1;
  background-color: ${color.White};
`;

const Header = styled.View`
  width: 100%;
  padding: 12px 16px;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

const ImgBtn = styled.Pressable``;

const Body = styled.ScrollView`
  width: 100%;
  height: 100%;
  padding: 24px 16px;
  gap: 24px;
`;

const DateFlex = styled.View`
  width: 100%;
  gap: 12px;
`;

const Date = styled.View`
  width: 60%;
  background-color: ${color.Gray[50]};
  padding: 12px 16px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

const TodayFlex = styled.View`
  gap: 8px;
  margin-top: 24px;
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

const BtnFlex = styled.View`
  width: 100%;
  gap: 8px;
  margin-top: 24px;
  margin-bottom: 100px;
`;
