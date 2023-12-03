import {styled} from 'styled-components/native';
import {color} from '../../style/color';
import {Arrow_back} from '../../assets';
import Txt from '../../components/Txt';
import {format} from 'date-fns';
import {Switch} from 'react-native';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {BaseUrl} from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AlarmManager = ({navigation, route}: any) => {
  const [alarm1, setAlarm1] = useState<boolean>(true);
  const [alarm2, setAlarm2] = useState<boolean>(true);
  const [alarm3, setAlarm3] = useState<boolean>(true);
  const date = route.params.date;

  useEffect(() => {
    async function GetAlarm() {
      const Token = await AsyncStorage.getItem('AccessToken');
      try {
        const result = await axios.get(`${BaseUrl}/notification`, {
          params: {
            date: format(date, 'yyyy-M-dd'),
          },
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        });
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
    GetAlarm();
  }, [date]);

  return (
    <Background>
      <Header>
        <ImgBtn onPress={() => navigation.goBack(null)}>
          <Arrow_back />
        </ImgBtn>
        <Txt typography="TitleMedium">오늘의 식단!</Txt>
      </Header>
      <Line />
      <Body>
        <Txt typography="LabelLarge">
          {format(date, 'yyyy년 M월 d일 알림')} 알림
        </Txt>
        <Flex>
          <ActivFlex>
            <Txt typography="BodyLarge">아침 알림</Txt>
            <Switch
              trackColor={{false: color.Gray[100], true: color.Green[100]}}
              thumbColor={alarm1 ? color.Green.Point : color.Gray[300]}
              onValueChange={() => setAlarm1(!alarm1)}
              value={alarm1}
            />
          </ActivFlex>
          <ActivFlex>
            <Txt typography="BodyLarge">점심 알림</Txt>
            <Switch
              trackColor={{false: color.Gray[100], true: color.Green[100]}}
              thumbColor={alarm2 ? color.Green.Point : color.Gray[300]}
              onValueChange={() => setAlarm2(!alarm2)}
              value={alarm2}
            />
          </ActivFlex>
          <ActivFlex>
            <Txt typography="BodyLarge">저녁 알림</Txt>
            <Switch
              trackColor={{false: color.Gray[100], true: color.Green[100]}}
              thumbColor={alarm3 ? color.Green.Point : color.Gray[300]}
              onValueChange={() => setAlarm3(!alarm3)}
              value={alarm3}
            />
          </ActivFlex>
        </Flex>
        <Txt typography="BodyMedium" color={color.Gray[500]}>
          알림은 푸시 알림으로 전송됩니다.
        </Txt>
      </Body>
    </Background>
  );
};

const Background = styled.View`
  width: 100%;
  height: 100%;
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

const Flex = styled.View`
  width: 100%;
  gap: 8px;
`;

const ActivFlex = styled.View`
  width: 100%;
  height: 48px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
