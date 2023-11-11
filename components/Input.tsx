import { Text, TextInput } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import Txt from './Txt';
import { color } from '../style/color';

interface InputProps {
    title?: string;
    placeholder?: string
}

const Input = ({ title, placeholder }: InputProps) => {
    return (
        <InputWapper>
            <Txt typography='LabelSmall'>{title}</Txt>
            <InputStyle placeholder={placeholder} />
        </InputWapper>
    );
};

export default Input;

const InputWapper = styled.View`
  width: fit-content;
  gap: 4px;
`;

const InputStyle = styled.TextInput`
    width: 328px;
    height: 48px;
    background-color: ${color.Gray[50]};
    padding: 0 8px;
    border-radius: 8px;
    ::placeholder{
        color: ${color.Gray[400]};
    }
`;