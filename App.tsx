import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import Start from './components/Screens/Start';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const HelloWorldApp = () => {
  const Stack = createStackNavigator();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start">
          <Stack.Screen name="Start" component={Start} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default HelloWorldApp;
