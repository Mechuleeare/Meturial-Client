import {createStackNavigator} from '@react-navigation/stack';
import {Main} from './Main';
import DetailRecipe from '../recipe/DetailRecipe';
import CategoryRecipe from '../recipe/CategoryRecipe';
import {TodayRecipeAll} from './TodayRecipeAll';
import {AddMenu} from '../calendar/AddMenu';

const MainStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="DetailRecipe" component={DetailRecipe} />
      <Stack.Screen name="CategoryRecipe" component={CategoryRecipe} />
      <Stack.Screen name="Today" component={TodayRecipeAll} />
      <Stack.Screen name="AddMenu" component={AddMenu} />
    </Stack.Navigator>
  );
};

export default MainStack;
