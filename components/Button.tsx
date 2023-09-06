import {Text} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

interface ButtonProps {
  title: string;
}

const Button = ({title}: ButtonProps) => {
  return (
    <ButtonBorder>
      <Text>{title}</Text>
    </ButtonBorder>
  );
};

export default Button;

const ButtonBorder = styled.View`
  height: 48px;
  width: fit-content;
  padding: 0 12px;
  border-radius: 8px;
  background-color: darkblue;
  justify-content: center;
  align-items: center;
`;
