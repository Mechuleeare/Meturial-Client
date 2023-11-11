import React, {useState} from 'react';
import styled from 'styled-components/native';
import Txt from './Txt';
import {color} from '../style/color';
import {Eye, EyeOff} from '../assets';
import {Image} from 'react-native';

// eyeCheck가 true이면 눈 생김
type emailCheckEnum = 'email' | 'number';

interface InputProps {
  title: string;
  placeholder: string;
  eyeCheck: boolean;
  email?: emailCheckEnum;
  fun?: (text: string) => void;
}

const Input = ({title, placeholder, eyeCheck, email, fun}: InputProps) => {
  const [eyeOff, setEyeOff] = useState<boolean>(true);

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
            <Txt typography="LabelLarge" color={color.Green.Point}>
              인증
            </Txt>
          </EmailFlex>
        ) : email === 'number' ? (
          <EmailFlex>
            <Txt typography="LabelLarge" color={color.Green.Point}>
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
