import {createStackNavigator} from '@react-navigation/stack';
import DetailRecipe from '../recipe/DetailRecipe';
import {Wish} from './Wish';

const WishStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Wished">
      <Stack.Screen name="Wished" component={Wish} />
      <Stack.Screen name="DetailRecipe" component={DetailRecipe} />
    </Stack.Navigator>
  );
};

export default WishStack;
