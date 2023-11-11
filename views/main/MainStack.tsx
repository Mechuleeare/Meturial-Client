import {createStackNavigator} from '@react-navigation/stack';
import {Main} from './Main';
import DetailRecipe from '../recipe/DetailRecipe';

const MainStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="DetailRecipe" component={DetailRecipe} />
    </Stack.Navigator>
  );
};

export default MainStack;
