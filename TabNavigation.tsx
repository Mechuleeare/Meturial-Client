import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Main} from './views';
import {
  Bookmark,
  Bookmark_filled,
  Home,
  Home_filled,
  Person,
  Person_filled,
  Today,
  Today_filled,
  Trophy,
  Trophy_filled,
} from './assets';
import {color} from './style/color';
import styled from 'styled-components/native';
import Txt from './components/Txt';

const icon = {
  home: [
    <Home color={color.Gray[400]} />,
    <Home_filled color={color.Green[600]} />,
  ],
  calendar: [
    <Today color={color.Gray[400]} />,
    <Today_filled color={color.Green[600]} />,
  ],
  recipe: [
    <Trophy color={color.Gray[400]} />,
    <Trophy_filled color={color.Green[600]} />,
  ],
  wish: [
    <Bookmark color={color.Gray[400]} />,
    <Bookmark_filled color={color.Green[600]} />,
  ],
  my: [
    <Person color={color.Gray[400]} />,
    <Person_filled color={color.Green[600]} />,
  ],
};

const homeIcon = ({
  focused,
  name,
}: {
  focused: boolean;
  name: keyof typeof icon;
}) => {
  return focused ? icon[name][1] : icon[name][0];
};

const TabButton = ({item, onPress, accessibilityState}: any) => {
  const focused = accessibilityState.selected;

  return (
    <Frame onTouchStart={onPress}>
      <IconFrame focus={focused}>
        {homeIcon({focused: focused, name: item.icon})}
      </IconFrame>
      <Txt typography={focused ? 'LabelMedium' : 'BodySmall'}>{item.label}</Txt>
    </Frame>
  );
};

const IconFrame = styled.View<{focus: boolean}>`
  width: 48px;
  height: 32px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${props => (props.focus ? color.Green[100] : 'white')};
  transition: 0.3s;
`;
const Frame = styled.View`
  padding: 8px 8px 4px;
  gap: 4px;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
`;

const TabList = [
  {name: 'Home', label: '홈', icon: 'home', component: Main},
  {name: 'Calendar', label: '식단관리', icon: 'calendar', component: Main},
  {name: 'Recipe', label: '레시피', icon: 'recipe', component: Main},
  {name: 'Wish', label: '찜', icon: 'wish', component: Main},
  {name: 'My', label: '마이', icon: 'my', component: Main},
];

const TabNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 64,
          paddingHorizontal: 8,
        },
      }}>
      {TabList.map((item, index) => (
        <Tab.Screen
          key={index}
          name={item.name}
          component={item.component}
          options={{
            tabBarShowLabel: false,
            tabBarButton: props => <TabButton {...props} item={item} />,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigation;
