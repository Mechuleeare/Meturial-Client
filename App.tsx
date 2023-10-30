import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import Button from './components/Button';
import Start from './components/Screens/Start';
import Txt from './components/Txt';

const HelloWorldApp = () => {

  const Stack = createStackNavigator();

  return (
    // <Container>
    //   <Text>Hello, world!</Text>
    //   <Button title="조태곤" />
    //   <Txt>조태곤</Txt>
    // </Container>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Start'>
        <Stack.Screen name='Start' component={Start} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default HelloWorldApp;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;
