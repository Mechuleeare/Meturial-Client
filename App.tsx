import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import TabNavigation from './TabNavigation';
import {StatusBar} from 'react-native';
import {Login, Start} from './views';
import {Signup} from './views/Signup/Information';
import {Profile} from './views/Signup/Profile';
import {AllergyCheck} from './views/Signup/AllergyCheck';
import {Allergy} from './views/Signup/Allergy';
import ReviewAll from './views/recipe/ReviewAll';
import Review from './views/recipe/Review';
import ReviewManagement from './views/recipe/ReviewManagement';
import {MyReviewList} from './views/my/MyReviewList';
import {MyFixed} from './views/my/MyFixed';
import {PwChangeCheck} from './views/my/PwChangeCheck';
import {PwChange} from './views/my/PwChange';

const HelloWorldApp = () => {
  const Stack = createStackNavigator();
  StatusBar.setBackgroundColor('white');
  StatusBar.setBarStyle('dark-content');

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="Start">
          <Stack.Screen name="HomeTabs" component={TabNavigation} />
          <Stack.Screen name="ReviewAll" component={ReviewAll} />
          <Stack.Screen name="Review" component={Review} />
          <Stack.Screen name="ReviewManagement" component={ReviewManagement} />
          <Stack.Screen name="MyReviewList" component={MyReviewList} />
          <Stack.Screen name="MyFixed" component={MyFixed} />
          <Stack.Screen name="PwChangeCheck" component={PwChangeCheck} />
          <Stack.Screen name="PwChange" component={PwChange} />
          {/* <Stack.Navigator initialRouteName="Start"> */}
          <Stack.Screen name="Start" component={Start} />
          <Stack.Screen name="Login" component={Login} />
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
