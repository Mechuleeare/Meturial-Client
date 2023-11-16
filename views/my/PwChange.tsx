import {styled} from 'styled-components/native';
import {color} from '../../style/color';
import {Image} from 'react-native';
import {BackArrow, PwChangeTitle} from '../../assets';
import Txt from '../../components/Txt';
import Input from '../../components/Input';
import {useState} from 'react';
import Button from '../../components/Button';

export const PwChange = ({navigation}: any) => {
  const [email, setEmail] = useState<string>();
  const [number, setNumber] = useState<string>();

  return (
    <Background>
      <Header>
        <BackImage onPress={() => navigation.goBack(null)}>
          <Image source={BackArrow} />
        </BackImage>
      </Header>
      <Image source={PwChangeTitle} />
      <Txt typography="TitleSmall">이메일 인증해 주세요</Txt>
      <CheckFlex>
        <Input
          title="이메일"
          eyeCheck={false}
          placeholder="이메일을 입력해 주세요"
          fun={setEmail}
          email="email"
          emailValue={email}
        />
        <Input
          title="인증번호"
          eyeCheck={false}
          placeholder="인증번호를 입력해 주세요"
          fun={setNumber}
          email="number"
          emailValue={number}
        />
      </CheckFlex>
      <Button>다음</Button>
    </Background>
  );
};

const Background = styled.View`
  width: 100%;
  flex: 1;
  background-color: ${color.White};
  padding: 12px 16px;
`;

const Header = styled.View`
  width: 100%;
  height: 48px;
  justify-content: center;
`;

const BackImage = styled.Pressable`
  margin-bottom: 24px;
`;

const CheckFlex = styled.View`
  width: 100%;
  height: 75%;
  margin-top: 36px;
  gap: 18px;
`;
