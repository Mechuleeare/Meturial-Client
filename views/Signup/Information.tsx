import {Image, Keyboard, Pressable} from 'react-native';
import {styled} from 'styled-components/native';
import {color} from '../../style/color';
import {BackArrow} from '../../assets';
import Txt from '../../components/Txt';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {useState} from 'react';
import UnderTxt from '../../components/UnderTxt';

export const Signup = ({navigation}: any) => {
  const [name, setName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [number, setNumber] = useState<string>();
  const [nextCheck, setNextCheck] = useState<boolean>(false);
  const [isKeyboard, setIsKeyboard] = useState<boolean>(false);

  Keyboard.addListener('keyboardDidShow', () => {
    setIsKeyboard(true);
  });
  Keyboard.addListener('keyboardDidHide', () => {
    setIsKeyboard(false);
  });

  return (
    <Frame>
      <BackPageFlex>
        <Pressable onPress={() => navigation.goBack(null)}>
          <Image source={BackArrow} />
        </Pressable>
      </BackPageFlex>
      <Background
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 32}}>
        <TitleFlex>
          <UnderTxt typo="HeadlineLarge">회원가입</UnderTxt>
          <Txt typography="TitleSmall">회원님의 정보를 입력해 주세요</Txt>
        </TitleFlex>
        <InputFlex>
          <Input
            title="이름"
            placeholder="이름을 입력해 주세요"
            eyeCheck={false}
            fun={setName}
          />
          <Input
            title="비밀번호"
            placeholder="영문 숫자 특수기호 포함 8자리 이상"
            eyeCheck={true}
            fun={setPassword}
          />
          <Input
            title="이메일"
            placeholder="이메일을 입력해 주세요"
            eyeCheck={false}
            email="email"
            fun={setEmail}
            emailValue={email}
          />
          <Input
            title="인증번호"
            placeholder="인증번호를 입력해 주세요"
            eyeCheck={false}
            email="number"
            fun={setNumber}
            emailValue={email}
            numberValue={number}
            check={setNextCheck}
          />
        </InputFlex>
      </Background>
      <Bottom
        style={isKeyboard ? {bottom: 0, padding: 0} : {paddingHorizontal: 16}}>
        {!isKeyboard ? (
          <Button
            onPress={() =>
              nextCheck &&
              navigation.navigate('Profile', {
                email: email,
                password: password,
                name: name,
              })
            }>
            다음
          </Button>
        ) : (
          <FullBtn
            style={({pressed}: any) =>
              pressed && {backgroundColor: color.Green[600]}
            }
            onPress={() =>
              nextCheck &&
              navigation.navigate('Profile', {
                email: email,
                password: password,
                name: name,
              })
            }>
            <Txt typography="LabelLarge" color="white">
              다음
            </Txt>
          </FullBtn>
        )}
        <SignupGo style={isKeyboard && {display: 'none'}}>
          <Txt typography="BodyMedium">이미 계정이 있으신가요?</Txt>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Txt typography="BodyMedium" color={color.Blue.Point}>
              로그인
            </Txt>
          </Pressable>
        </SignupGo>
      </Bottom>
    </Frame>
  );
};

const Background = styled.ScrollView`
  width: 100%;
  flex: 1;
  padding: 0 16px;
`;

const BackPageFlex = styled.View`
  width: 100%;
  height: 48px;
  justify-content: center;
  padding: 0 16px;
`;

const TitleFlex = styled.View`
  display: flex;
  width: 100%;
  gap: 6px;
  margin: 16px 0 36px;
`;

const InputFlex = styled.View`
  display: flex;
  width: 100%;
  flex: 1;
  gap: 18px;
`;

const SignupGo = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 8px;
  margin-top: 18px;
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
