import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import TabNavigation from './TabNavigation';
import {StatusBar} from 'react-native';

const HelloWorldApp = () => {
  const Stack = createStackNavigator();
  StatusBar.setBackgroundColor('white');
  StatusBar.setBarStyle('dark-content');

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="HomeTabs" component={TabNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default HelloWorldApp;
