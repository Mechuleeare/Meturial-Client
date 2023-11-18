import {createStackNavigator} from '@react-navigation/stack';
import {TodayRecipe} from './TodayRecipe';
import {Calendar} from './Calendar';

const CalendarStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="TodayRecipe">
      <Stack.Screen name="TodayRecipe" component={TodayRecipe} />
      <Stack.Screen name="Calendar" component={Calendar} />
    </Stack.Navigator>
  );
};

export default CalendarStack;
