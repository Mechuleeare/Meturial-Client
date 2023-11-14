import {createStackNavigator} from '@react-navigation/stack';
import DetailRecipe from '../recipe/DetailRecipe';
import CategoryRecipe from '../recipe/CategoryRecipe';
import {Recipe} from './Recipe';

const RecipeStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Recipes">
      <Stack.Screen name="Recipes" component={Recipe} />
      <Stack.Screen name="DetailRecipe" component={DetailRecipe} />
      <Stack.Screen name="CategoryRecipe" component={CategoryRecipe} />
    </Stack.Navigator>
  );
};

export default RecipeStack;
