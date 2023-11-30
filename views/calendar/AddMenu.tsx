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
}

export const AddMenu = ({navigation, route}: any) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState<boolean>(false);
  const [time, setTime] = useState('BREAKFAST');
  const [MenuData, setMenuData] = useState<MenuType | undefined>(undefined);
  const [alarm, setAlarm] = useState<boolean>(true);

  useEffect(() => {
    setMenuData(route.params);
  }, [route.params]);

  const HandleAddMenu = async () => {
    if (MenuData) {
      try {
        const Token = await AsyncStorage.getItem('AccessToken');
        const result = await axios.post(
          `${BaseUrl}/menu`,
          {
            menuType: time,
            date: format(date, 'yyyy-M-dd'),
            choiceRecipeId: MenuData?.recipeId,
            isActivated: alarm,
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
      Alert.alert('이메일 비밀번호를 다시 확인해주세요', '', [
        {text: '확인', style: 'cancel'},
      ]);
    }
  };

  return (
    <Background>
      <Header onPress={() => navigation.goBack(null)}>
        <Arrow_back />
        <Txt typography="TitleMedium">식단 추가</Txt>
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
              onPress={() => navigation.navigate('MenuList')}>
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
              thumbColor={alarm ? color.Green.Point : color.Gray[300]}
              onValueChange={() => setAlarm(!alarm)}
              value={alarm}
            />
          </AlarmFlex>
        </Flex>
        <Flex>
          <BtnFlex>
            <Button onPress={HandleAddMenu}>식단 추가</Button>
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

const Body = styled.View`
  width: 100%;
  padding: 32px 16px;
  gap: 32px;
`;

const Flex = styled.View`
  gap: 12px;
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
`;
