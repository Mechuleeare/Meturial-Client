import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Ranking from './Ranking';
import {Recipe} from './Recipe';

const RecipeTopBar = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Category" component={Recipe} />
      <Tab.Screen name="Ranking" component={Ranking} />
    </Tab.Navigator>
  );
};

export default RecipeTopBar;
