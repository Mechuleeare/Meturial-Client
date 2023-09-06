import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
import Button from './components/Button';
import Txt from './components/Txt';

const HelloWorldApp = () => {
  return (
    <Container>
      <Text>Hello, world!</Text>
      <Button title="조태곤" />
      <Txt>조태곤</Txt>
    </Container>
  );
};
export default HelloWorldApp;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;
