import {styled} from 'styled-components/native';
import {color} from '../../style/color';
import {Alert, Image} from 'react-native';
import {BackArrow, PwChangeTitle} from '../../assets';
import Txt from '../../components/Txt';
import Input from '../../components/Input';
import {useState} from 'react';
import Button from '../../components/Button';
import axios from 'axios';
import {BaseUrl} from '../../utils';

export const PwChange = ({navigation, route}: any) => {
  const email = route.params;
  const [newPw, setNewPw] = useState<string>();
  const [newPwCheck, setNewPwCheck] = useState<string>();

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
    <Background>
      <Header>
        <BackImage onPress={() => navigation.goBack(null)}>
          <Image source={BackArrow} />
        </BackImage>
      </Header>
      <Image source={PwChangeTitle} />
      <Txt typography="TitleSmall">새 비밀번호를 입력해주세요</Txt>
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
      <Button onPress={HandlePwChange}>비밀번호 변경</Button>
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
