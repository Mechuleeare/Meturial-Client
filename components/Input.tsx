import React, {useState} from 'react';
import styled from 'styled-components/native';
import Txt from './Txt';
import {color} from '../style/color';
import {Eye, EyeOff} from '../assets';
import {Image, Alert} from 'react-native';
import axios from 'axios';
import {BaseUrl} from '../utils';

// eyeCheck가 true이면 눈 생김
type emailCheckEnum = 'email' | 'number';

interface InputProps {
  title: string;
  placeholder: string;
  eyeCheck: boolean;
  email?: emailCheckEnum;
  fun?: (text: string) => void;
  emailValue?: string;
  numberValue?: string;
  check?: (state: boolean) => void | undefined;
}

const Input = ({
  title,
  placeholder,
  eyeCheck,
  email,
  fun,
  emailValue,
  numberValue,
  check,
}: InputProps) => {
  const [eyeOff, setEyeOff] = useState<boolean>(true);

  const HandleEmailAuthentication = async () => {
    try {
      const result = await axios.post(`${BaseUrl}/user/email`, {
        email: emailValue,
      });
      console.log(result);
      Alert.alert('인증번호가 발송되었습니다.', '', [{text: '확인'}]);
    } catch (error) {
      console.log(error);
      Alert.alert('이메일을 다시 확인해주세요.', '', [{text: '확인'}]);
    }
  };

  const HandleNumberCheck = async () => {
    try {
      const result = await axios.post(`${BaseUrl}/user/verify`, {
        email: emailValue,
        code: numberValue,
      });
      console.log(result);
      Alert.alert('인증번호가 확인되었습니다.', '', [{text: '확인'}]);
      HandleCheck(true);
    } catch (error) {
      console.log(error);
      Alert.alert('인증 번호를 다시 확인해주세요.', '', [{text: '확인'}]);
    }
  };

  const HandleCheck = (state: boolean) => {
    check && check(state);
  };

  return (
    <InputWapper>
      <Txt typography="LabelSmall">{title}</Txt>
      <InputFlex>
        <InputStyle
          placeholder={placeholder}
          secureTextEntry={eyeCheck === true ? eyeOff : false}
          onChangeText={text => fun && fun(text)}
        />
        {eyeCheck && (
          <EyeFlex onPress={() => setEyeOff(!eyeOff)}>
            <Image source={eyeOff === true ? EyeOff : Eye} />
          </EyeFlex>
        )}
        {email === 'email' ? (
          <EmailFlex>
            <Txt
              typography="LabelLarge"
              color={color.Green.Point}
              onPress={HandleEmailAuthentication}>
              인증
            </Txt>
          </EmailFlex>
        ) : email === 'number' ? (
          <EmailFlex>
            <Txt
              typography="LabelLarge"
              color={color.Green.Point}
              onPress={HandleNumberCheck}>
              확인
            </Txt>
          </EmailFlex>
        ) : (
          <></>
        )}
      </InputFlex>
    </InputWapper>
  );
};

export default Input;

const InputWapper = styled.View`
  width: fit-content;
  gap: 4px;
`;

const InputFlex = styled.View`
  display: flex;
  position: relative;
`;

const InputStyle = styled.TextInput`
  width: 100%;
  height: 48px;
  background-color: ${color.Gray[50]};
  padding: 0 8px;
  border-radius: 8px;
  ::placeholder {
    color: ${color.Gray[400]};
  }
`;

const EyeFlex = styled.Pressable`
  position: absolute;
  top: 12px;
  right: 14px;
`;

const EmailFlex = styled.Pressable`
  position: absolute;
  top: 12px;
  right: 14px;
`;
