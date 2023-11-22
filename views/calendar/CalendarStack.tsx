import {createStackNavigator} from '@react-navigation/stack';
import {Calendar} from './Calendar';
import CalendarTopBar from './CalendarToBar';
import DetailRecipe from '../recipe/DetailRecipe';

const CalendarStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="TodayRecipe">
      <Stack.Screen name="TodayRecipe" component={CalendarTopBar} />
      <Stack.Screen name="Calendar" component={Calendar} />
      <Stack.Screen name="DetailRecipe" component={DetailRecipe} />
    </Stack.Navigator>
  );
};

export default CalendarStack;
