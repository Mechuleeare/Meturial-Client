import {styled} from 'styled-components/native';
import {color} from '../../style/color';
import {Alert, Image, Keyboard, Pressable} from 'react-native';
import {BackArrow} from '../../assets';
import Txt from '../../components/Txt';
import Input from '../../components/Input';
import {useState} from 'react';
import Button from '../../components/Button';
import axios from 'axios';
import {BaseUrl} from '../../utils';
import UnderTxt from '../../components/UnderTxt';

export const PwChange = ({navigation, route}: any) => {
  const email = route.params;
  const [newPw, setNewPw] = useState<string>();
  const [newPwCheck, setNewPwCheck] = useState<string>();
  const [isKeyboard, setIsKeyboard] = useState<boolean>(false);

  Keyboard.addListener('keyboardDidShow', () => {
    setIsKeyboard(true);
  });
  Keyboard.addListener('keyboardDidHide', () => {
    setIsKeyboard(false);
  });

  const HandlePwChange = async () => {
    if (newPw === newPwCheck) {
      try {
        const result = await axios.put(`${BaseUrl}/auth/find`, {
          email: email.emailValue,
          newPassword: newPw,
        });
        console.log(result.data);
        navigation.navigate('Login');
      } catch (error) {
        console.log(error);
        Alert.alert('비밀번호를 다시 확인해주세요', '', [
          {text: '확인', style: 'cancel'},
        ]);
      }
    } else {
      Alert.alert('비밀번호를 다시 확인해주세요', '', [
        {text: '확인', style: 'cancel'},
      ]);
    }
  };

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
            title="새 비밀번호"
            eyeCheck={true}
            placeholder="영문 숫자 특수기호 포함 8자리 이상"
            fun={setNewPw}
          />
          <Input
            title="새 비밀번호 재입력"
            eyeCheck={true}
            placeholder="새 비밀번호를 다시 입력해 주세요"
            fun={setNewPwCheck}
          />
        </CheckFlex>
      </Background>
      <Bottom
        style={isKeyboard ? {bottom: 0, padding: 0} : {paddingHorizontal: 16}}>
        {!isKeyboard ? (
          <Button onPress={HandlePwChange}>비밀번호 변경</Button>
        ) : (
          <FullBtn
            style={({pressed}: any) =>
              pressed && {backgroundColor: color.Green[600]}
            }
            onPress={HandlePwChange}>
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
`;

const CheckFlex = styled.View`
  width: 100%;
  height: 75%;
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
