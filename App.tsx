import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import TabNavigation from './TabNavigation';
import {StatusBar} from 'react-native';
import {Main, Login, Start} from './views';
import {Signup} from './views/Signup/Information';
import {Profile} from './views/Signup/Profile';
import {AllergyCheck} from './views/Signup/AllergyCheck';
import {Allergy} from './views/Signup/Allergy';

const HelloWorldApp = () => {
  const Stack = createStackNavigator();
  StatusBar.setBackgroundColor('white');
  StatusBar.setBarStyle('dark-content');

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="HomeTabs" component={TabNavigation} />
        <Stack.Navigator initialRouteName="Start">
          <Stack.Screen name="Start" component={Start} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="AllergyCheck" component={AllergyCheck} />
          <Stack.Screen name="Allergy" component={Allergy} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default HelloWorldApp;
