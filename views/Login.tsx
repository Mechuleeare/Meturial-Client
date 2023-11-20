import {styled} from 'styled-components/native';
import {color} from '../style/color';
import {Pressable, Alert, Keyboard} from 'react-native';
import Txt from '../components/Txt';
import Input from '../components/Input';
import Button from '../components/Button';
import {useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BaseUrl} from '../utils';
import UnderTxt from '../components/UnderTxt';
import {Arrow_back} from '../assets';

export const Login = ({navigation}: any) => {
  const [emailValue, setEmailValue] = useState<string>();
  const [pwValue, setpwValue] = useState<string>();
  const [isKeyboard, setIsKeyboard] = useState<boolean>(false);

  Keyboard.addListener('keyboardDidShow', () => {
    setIsKeyboard(true);
  });
  Keyboard.addListener('keyboardDidHide', () => {
    setIsKeyboard(false);
  });

  const HandleLogin = async () => {
    try {
      const result = await axios.post(`${BaseUrl}/auth/token`, {
        email: emailValue,
        password: pwValue,
      });
      console.log(result.data);
      await AsyncStorage.setItem('AccessToken', result.data.accessToken);
      await AsyncStorage.setItem('RefreshToken', result.data.refreshToken);
      navigation.navigate('HomeTabs');
    } catch (error) {
      console.log(error);
      Alert.alert('이메일 비밀번호를 다시 확인해주세요', '', [
        {text: '확인', style: 'cancel'},
      ]);
    }
  };

  return (
    <Frame>
      <BackPageFlex>
        <Pressable onPress={() => navigation.goBack(null)}>
          <Arrow_back />
        </Pressable>
      </BackPageFlex>
      <Background>
        <TitleFlex>
          <UnderTxt typo="HeadlineLarge">로그인</UnderTxt>
          <Txt typography="TitleSmall">로그인 하여 서비스를 이용해 보세요</Txt>
        </TitleFlex>
        <InputFlex>
          <Input
            title="이메일"
            placeholder="이메일을 입력해 주세요"
            eyeCheck={false}
            fun={setEmailValue}
          />
          <Input
            title="비밀번호"
            placeholder="비밀번호를 입력해 주세요"
            eyeCheck={true}
            fun={setpwValue}
          />
          <FindPw>
            <Txt
              typography="BodySmall"
              color={color.Blue.Point}
              onPress={() => navigation.navigate('PwChangeCheck')}>
              비밀번호를 잊으셨나요?
            </Txt>
          </FindPw>
        </InputFlex>
      </Background>
      <Bottom
        style={isKeyboard ? {bottom: 0, padding: 0} : {paddingHorizontal: 16}}>
        {!isKeyboard ? (
          <Button onPress={HandleLogin}>로그인</Button>
        ) : (
          <FullBtn
            style={({pressed}: any) =>
              pressed && {backgroundColor: color.Green[600]}
            }
            onPress={HandleLogin}>
            <Txt typography="LabelLarge" color="white">
              로그인
            </Txt>
          </FullBtn>
        )}
        <SignupGo style={isKeyboard && {display: 'none'}}>
          <Txt typography="BodyMedium">계정이 없으신가요?</Txt>
          <Pressable onPress={() => navigation.navigate('Signup')}>
            <Txt typography="BodyMedium" color={color.Blue.Point}>
              가입
            </Txt>
          </Pressable>
        </SignupGo>
      </Bottom>
    </Frame>
  );
};

const Background = styled.View`
  width: 100%;
  flex: 1;
  background-color: ${color.White};
  padding: 0 16px 32px;
`;

const BackPageFlex = styled.View`
  width: 100%;
  height: 48px;
  justify-content: center;
  margin: 0 0 16px;
  padding: 0 16px;
`;

const TitleFlex = styled.View`
  display: flex;
  width: 100%;
  gap: 6px;
  margin: 0 0 36px;
`;

const InputFlex = styled.View`
  display: flex;
  width: 100%;
  flex: 1;
  gap: 18px;
`;

const FindPw = styled.View`
  display: flex;
  align-items: flex-end;
`;

const SignupGo = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 8px;
  margin: 18px 0 0;
`;

const Bottom = styled.View`
  bottom: 32px;
  position: fixed;
`;

const Frame = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${color.White};
`;

const FullBtn = styled.Pressable`
  height: 48px;
  width: 100%;
  padding: 0 18px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: ${color.Green[500]};
  gap: 8px;
`;
