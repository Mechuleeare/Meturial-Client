import {styled} from 'styled-components/native';
import {color} from '../style/color';
import {Image, Pressable} from 'react-native';
import {BackArrow, LoginTitle} from '../assets';
import Txt from '../components/Txt';
import Input from '../components/Input';
import Button from '../components/Button';
import {useState} from 'react';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

export const Login = ({navigation}: any) => {
  const [emailValue, setEmailValue] = useState<string>();
  const [pwValue, setpwValue] = useState<string>();

  const HandleLogin = async () => {
    console.log(emailValue);
    console.log(pwValue);
    // try {
    //   const result = await axios.post(`${BaseUrl}/auth/token`, {
    //     email: emailValue,
    //     password: pwValue,
    //   });
    //   await AsyncStorage.setItem('AccessToken', result.data.AccessToken);
    //   await AsyncStorage.setItem('RefreshToken', result.data.RefreshToken);
    //   navigation.navigate('Main');
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <Background>
      <BackPageFlex>
        <Pressable onPress={() => navigation.goBack(null)}>
          <Image source={BackArrow} />
        </Pressable>
      </BackPageFlex>
      <TitleFlex>
        <Image source={LoginTitle} />
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
            onPress={() => navigation.navigate('Signup')}>
            비밀번호를 잊으셨나요?
          </Txt>
        </FindPw>
      </InputFlex>
      <Button onPress={HandleLogin}>로그인</Button>
      <SignupGo>
        <Txt typography="BodyMedium">계정이 없으신가요?</Txt>
        <Pressable onPress={() => navigation.navigate('Signup')}>
          <Txt typography="BodyMedium" color={color.Blue.Point}>
            가입
          </Txt>
        </Pressable>
      </SignupGo>
    </Background>
  );
};

const Background = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${color.White};
  padding: 32px 16px;
`;

const BackPageFlex = styled.View`
  width: 100%;
  height: 48px;
`;

const TitleFlex = styled.View`
  display: flex;
  width: 100%;
  height: 120px;
  gap: 6px;
`;

const InputFlex = styled.View`
  display: flex;
  width: 100%;
  height: 63%;
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
  margin-top: 18px;
`;
