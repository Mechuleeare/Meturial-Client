import {createStackNavigator} from '@react-navigation/stack';
import {Calendar} from './Calendar';
import CalendarTopBar from './CalendarToBar';
import DetailRecipe from '../recipe/DetailRecipe';
import {AddMenu} from './AddMenu';
import {MenuList} from './MenuList';
import {MenuDetail} from './MenuDetail';
import {FixMenuList} from './FixMenuList';
import {FixMenu} from './FixMenu';
import {FixList} from './FixList';
import {AlarmManager} from './AlarmManager';

const CalendarStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="TodayRecipe">
      <Stack.Screen name="TodayRecipe" component={CalendarTopBar} />
      <Stack.Screen name="Calendar" component={Calendar} />
      <Stack.Screen name="DetailRecipe" component={DetailRecipe} />
      <Stack.Screen name="MenuList" component={MenuList} />
      <Stack.Screen name="AddMenu" component={AddMenu} />
      <Stack.Screen name="MenuDetail" component={MenuDetail} />
      <Stack.Screen name="FixMenuList" component={FixMenuList} />
      <Stack.Screen name="FixMenu" component={FixMenu} />
      <Stack.Screen name="FixList" component={FixList} />
      <Stack.Screen name="AlarmManager" component={AlarmManager} />
    </Stack.Navigator>
  );
};

export default CalendarStack;
