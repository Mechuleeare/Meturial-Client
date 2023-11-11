import {Image, Pressable} from 'react-native';
import {styled} from 'styled-components/native';
import {color} from '../../style/color';
import {BackArrow, SignupTitle} from '../../assets';
import Txt from '../../components/Txt';
import Input from '../../components/Input';
import Button from '../../components/Button';

export const Signup = ({navigation}: any) => {
  return (
    <Background>
      <BackPageFlex>
        <Pressable onPress={() => navigation.goBack(null)}>
          <Image source={BackArrow} />
        </Pressable>
      </BackPageFlex>
      <TitleFlex>
        <Image source={SignupTitle} />
        <Txt typography="TitleSmall">회원님의 정보를 입력해 주세요</Txt>
      </TitleFlex>
      <InputFlex>
        <Input
          title="이름"
          placeholder="이름을 입력해 주세요"
          eyeCheck={false}
        />
        <Input
          title="비밀번호"
          placeholder="영문 숫자 특수기호 포함 8자리 이상"
          eyeCheck={true}
        />
        <Input
          title="이메일"
          placeholder="이메일을 입력해 주세요"
          eyeCheck={false}
          email="email"
        />
        <Input
          title="인증번호"
          placeholder="인증번호를 입력해 주세요"
          eyeCheck={false}
          email="number"
        />
      </InputFlex>
      <Button onPress={() => navigation.navigate('Profile')}>다음</Button>
      <SignupGo>
        <Txt typography="BodyMedium">이미 계정이 있으신가요?</Txt>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Txt typography="BodyMedium" color={color.Blue.Point}>
            로그인
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

const SignupGo = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 8px;
  margin-top: 18px;
`;
