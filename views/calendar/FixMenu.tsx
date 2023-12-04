import {styled} from 'styled-components/native';
import {color} from '../../style/color';
import {Add, Arrow_back, Close, Star_filled} from '../../assets';
import Txt from '../../components/Txt';
import {useEffect, useState} from 'react';
import {format} from 'date-fns';
import DatePicker from 'react-native-date-picker';
import Button from '../../components/Button';
import {Switch, Alert} from 'react-native';
import axios from 'axios';
import {BaseUrl} from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface TimeType {
  color: string;
}

interface MenuType {
  img: string;
  name: string;
  starRating: number;
  starCount: number;
  category: string;
  recipeId: string;
  menuId: string;
}

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

export const FixMenu = ({navigation, route}: any) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState<boolean>(false);
  const [time, setTime] = useState('BREAKFAST');
  const [MenuData, setMenuData] = useState<MenuType | undefined>(undefined);
  const [wish, setWish] = useState<WishPreviewData[]>([]);
  const [active, setActive] = useState<boolean>();
  console.log(MenuData);

  useEffect(() => {
    async function GetWishData() {
      const Token = await AsyncStorage.getItem('AccessToken');
      try {
        const result = await axios.get(`${BaseUrl}/choice`, {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        });
        setWish(result.data.choiceRecipeList);
      } catch (error) {
        console.log(error);
      }
    }
    GetWishData();
  }, [route.params]);

  useEffect(() => {
    setDate(route.params.now);
  }, [route.params.now]);

  useEffect(() => {
    if (route.params.timeState === '아침') {
      setTime(route.params.lastData[0].menuType);
    } else if (route.params.timeState === '점심') {
      setTime(route.params.lastData[1].menuType);
    } else if (route.params.timeState === '저녁') {
      setTime(route.params.lastData[2].menuType);
    }
  }, [route.params.lastData, route.params.timeState]);

  useEffect(() => {
    if (route.params.data) {
      return;
    }
    if (route.params.timeState === '아침') {
      wish.map(v => {
        if (v.recipeId === route.params.lastData[0].recipeId) {
          setMenuData({
            img: v.recipeImageUrl,
            name: v.name,
            starCount: v.starCount,
            starRating: v.starRating,
            category: v.recipeCategory,
            recipeId: v.recipeId,
            menuId: route.params.lastData[0].menuId,
          });
        }
      });
    } else if (route.params.timeState === '점심') {
      wish.map(v => {
        if (v.recipeId === route.params.lastData[1].recipeId) {
          setMenuData({
            img: v.recipeImageUrl,
            name: v.name,
            starCount: v.starCount,
            starRating: v.starRating,
            category: v.recipeCategory,
            recipeId: v.recipeId,
            menuId: route.params.lastData[1].menuId,
          });
        }
      });
    } else if (route.params.timeState === '저녁') {
      wish.map(v => {
        if (v.recipeId === route.params.lastData[2].recipeId) {
          setMenuData({
            img: v.recipeImageUrl,
            name: v.name,
            starCount: v.starCount,
            starRating: v.starRating,
            category: v.recipeCategory,
            recipeId: v.recipeId,
            menuId: route.params.lastData[2].menuId,
          });
        }
      });
    }
  }, [route.params.data, route.params.lastData, route.params.timeState, wish]);

  useEffect(() => {
    if (route.params.data) {
      setMenuData(route.params.data);
      console.log(route.params.data);
    }
  }, [route.params.data]);

  useEffect(() => {
    if (route.params.timeState === '아침') {
      setActive(route.params.timeActive[0].isActivated);
    } else if (route.params.timeState === '점심') {
      setActive(route.params.timeActive[1].isActivated);
    } else if (route.params.timeState === '저녁') {
      setActive(route.params.timeActive[2].isActivated);
    }
  }, [route.params.timeActive, route.params.timeState]);

  const HandleFixMenu = async () => {
    if (MenuData) {
      try {
        const Token = await AsyncStorage.getItem('AccessToken');
        const result = await axios.patch(
          `${BaseUrl}/menu/${MenuData.menuId}`,
          {
            menuType: time,
            date: format(date, 'yyyy-M-dd'),
            choiceRecipeId: MenuData?.recipeId,
            isActivated: active,
          },
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          },
        );
        console.log(result);
        navigation.navigate('TodayRecipe');
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert('식단을 다시 해주세요', '', [
        {text: '확인', style: 'cancel'},
      ]);
    }
  };

  const HandleDeleteMenu = async () => {
    try {
      const Token = await AsyncStorage.getItem('AccessToken');
      const result = await axios.delete(`${BaseUrl}/menu/${MenuData?.menuId}`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
      console.log(result);
      navigation.navigate('TodayRecipe');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Background>
      <Header onPress={() => navigation.goBack(null)}>
        <Arrow_back />
        <Txt typography="TitleMedium">{route.params.timeState} 레시피 수정</Txt>
      </Header>
      <Line />
      <Body>
        <Flex>
          <Txt typography="LabelLarge">날짜</Txt>
          <DateButton onPress={() => setOpen(true)}>
            <Txt typography="TitleLarge">{format(date, 'yyyy년 M월 d일')}</Txt>
          </DateButton>
          <DatePicker
            modal
            mode="date"
            open={open}
            date={date}
            // eslint-disable-next-line @typescript-eslint/no-shadow
            onConfirm={date => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => setOpen(false)}
          />
        </Flex>
        <Flex>
          <Txt typography="LabelLarge">시간</Txt>
          <TimeButtonFlex>
            <TimeButton
              onPress={() => setTime('BREAKFAST')}
              color={time === 'BREAKFAST' ? color.Green.Point : color.Gray[50]}>
              <Txt
                typography="LabelLarge"
                color={time === 'BREAKFAST' ? color.White : color.Black}>
                아침
              </Txt>
            </TimeButton>
            <TimeButton
              onPress={() => setTime('LUNCH')}
              color={time === 'LUNCH' ? color.Green.Point : color.Gray[50]}>
              <Txt
                typography="LabelLarge"
                color={time === 'LUNCH' ? color.White : color.Black}>
                점심
              </Txt>
            </TimeButton>
            <TimeButton
              onPress={() => setTime('DINNER')}
              color={time === 'DINNER' ? color.Green.Point : color.Gray[50]}>
              <Txt
                typography="LabelLarge"
                color={time === 'DINNER' ? color.White : color.Black}>
                저녁
              </Txt>
            </TimeButton>
          </TimeButtonFlex>
          <Txt typography="BodySmall">
            아침은 8시에, 점심은 12시에, 저녁은 6시에 알림이 울립니다.
          </Txt>
        </Flex>
        <Flex>
          <Txt typography="LabelLarge">레시피</Txt>
          {MenuData && (
            <Menu>
              <MenuBackground>
                <WishImg
                  source={{
                    uri: MenuData.img,
                  }}
                  borderRadius={4}
                />
                <Center>
                  <Top>
                    <TopFlex>
                      <Txt typography="TitleMedium">{MenuData.name}</Txt>
                      <StartFlex>
                        <Star_filled size={16} color={color.Yellow.Point} />
                        <Txt>{MenuData.starRating}</Txt>
                      </StartFlex>
                    </TopFlex>
                    <CloseBtn onPress={() => setMenuData(undefined)}>
                      <Close size={18} />
                    </CloseBtn>
                  </Top>
                  <Txt typography="LabelSmall" color={color.Gray[300]}>
                    {MenuData.starCount}명의 후기
                  </Txt>
                  <Bottom>
                    {MenuData.category.split(',').map((j, i) => (
                      <Txt
                        typography="BodySmall"
                        color={color.Green.Point}
                        key={i}>
                        #{j}
                      </Txt>
                    ))}
                  </Bottom>
                </Center>
              </MenuBackground>
            </Menu>
          )}
          <AddMenuFlex>
            <Button
              icon={<Add />}
              status="silver"
              onPress={() =>
                navigation.navigate('FixList', {
                  lastData: route.params.lastData,
                  timeState: route.params.timeState,
                  timeActive: route.params.timeActive,
                  now: date,
                  data: '',
                  menuId: MenuData?.menuId,
                })
              }>
              레시피 선택
            </Button>
          </AddMenuFlex>
          <Txt typography="BodySmall">
            레시피 선택은 찜 목록의 레시피를 선택할 수 있습니다.
          </Txt>
        </Flex>
        <Flex>
          <Txt typography="LabelLarge">알림</Txt>
          <AlarmFlex>
            <Txt typography="BodyLarge">알람 켜기</Txt>
            <Switch
              trackColor={{false: color.Gray[100], true: color.Green[100]}}
              thumbColor={active ? color.Green.Point : color.Gray[300]}
              onValueChange={() => setActive(!active)}
              value={active}
            />
          </AlarmFlex>
        </Flex>
        <Flex>
          <BtnFlex>
            <Button onPress={HandleFixMenu}>식단 수정</Button>
            <Button status="red" onPress={HandleDeleteMenu}>
              식단 삭제
            </Button>
          </BtnFlex>
        </Flex>
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

const Body = styled.ScrollView`
  width: 100%;
  padding: 32px 16px;
`;

const Flex = styled.View`
  gap: 12px;
  margin-bottom: 32px;
`;

const DateButton = styled.Pressable`
  width: 50%;
  height: 52px;
  background-color: ${color.Gray[50]};
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

const TimeButtonFlex = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const TimeButton = styled.Pressable<TimeType>`
  width: 20%;
  height: 32px;
  background-color: ${props => props.color};
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

const AddMenuFlex = styled.View`
  width: 35%;
`;

const Menu = styled.View`
  width: 100%;
  height: 70px;
`;

const MenuBackground = styled.View`
  flex: 1;
  width: 100%;
  height: 70px;
  flex-direction: row;
  gap: 12px;
  position: relative;
`;

const WishImg = styled.Image`
  width: 70px;
  height: 70px;
  object-fit: cover;
`;

const Center = styled.View`
  width: 294px;
  height: 70px;
`;

const Top = styled.View`
  flex-direction: row;
  height: 24px;
  justify-content: space-between;
`;

const TopFlex = styled.View`
  flex-direction: row;
  gap: 12px;
  height: 100%;
  align-items: center;
  justify-content: space-between;
`;

const CloseBtn = styled.Pressable``;

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

const AlarmFlex = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
`;

const BtnFlex = styled.View`
  width: 100%;
  margin-top: 40px;
  gap: 16px;
  margin-bottom: 100px;
`;
