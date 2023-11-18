import {styled} from 'styled-components/native';
import {color} from '../../style/color';
import {Image, Keyboard, Pressable} from 'react-native';
import {BackArrow} from '../../assets';
import Txt from '../../components/Txt';
import Input from '../../components/Input';
import {useState} from 'react';
import Button from '../../components/Button';
import UnderTxt from '../../components/UnderTxt';

export const PwChangeCheck = ({navigation}: any) => {
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
      <Background>
        <Header>
          <Pressable onPress={() => navigation.goBack(null)}>
            <Image source={BackArrow} />
          </Pressable>
        </Header>
        <TitleFlex>
          <UnderTxt typo="HeadlineLarge">비밀번호 변경</UnderTxt>
          <Txt typography="TitleSmall">이메일을 인증해 주세요</Txt>
        </TitleFlex>
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
            emailValue={email}
            numberValue={number}
            check={setNextCheck}
          />
        </CheckFlex>
      </Background>
      <Bottom
        style={isKeyboard ? {bottom: 0, padding: 0} : {paddingHorizontal: 16}}>
        {!isKeyboard ? (
          <Button
            onPress={() =>
              nextCheck && navigation.navigate('PwChange', {emailValue: email})
            }>
            다음
          </Button>
        ) : (
          <FullBtn
            style={({pressed}: any) =>
              pressed && {backgroundColor: color.Green[600]}
            }
            onPress={() =>
              nextCheck && navigation.navigate('PwChange', {emailValue: email})
            }>
            <Txt typography="LabelLarge" color="white">
              다음
            </Txt>
          </FullBtn>
        )}
      </Bottom>
    </Frame>
  );
};

const Background = styled.View`
  width: 100%;
  flex: 1;
  background-color: ${color.White};
  padding: 0 16px;
`;

const Header = styled.View`
  width: 100%;
  height: 48px;
  justify-content: center;
  margin: 0 0 16px;
`;

const CheckFlex = styled.View`
  width: 100%;
  flex: 1;
  margin-top: 36px;
  gap: 18px;
`;

const TitleFlex = styled.View`
  display: flex;
  width: 100%;
  gap: 6px;
`;

const Frame = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${color.White};
`;

const Bottom = styled.View`
  bottom: 32px;
  position: fixed;
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
