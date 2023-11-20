import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import styled from 'styled-components/native';
import {color} from '../../style/color';
import Txt from '../../components/Txt';
import {Animated, Dimensions} from 'react-native';
import {useEffect, useRef} from 'react';
import {TodayRecipe} from './TodayRecipe';
import {Calendar} from './Calendar';
import {Image} from 'react-native';
import {CalendarTitle} from '../../assets';

const TabBar = ({state, navigation}: any) => {
  const animationHorizontalValue = useRef(new Animated.Value(0)).current;

  const animate = (index: number) => {
    Animated.spring(animationHorizontalValue, {
      toValue: index * (Dimensions.get('window').width / 2),
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animate(state.index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.index]);

  return (
    <Background>
      <Header>
        <Image source={CalendarTitle} />
        <Txt typography="TitleSmall">찜해둔 레시피로 식단을 구성해보세요.</Txt>
      </Header>
      <Bar>
        <Move style={{transform: [{translateX: animationHorizontalValue}]}} />
        <Btn onPress={() => navigation.navigate('TodayRecipe')}>
          <Txt typography="LabelLarge">오늘의 식단</Txt>
        </Btn>
        <Btn onPress={() => navigation.navigate('Calendar')}>
          <Txt typography="LabelLarge">식단 캘린더</Txt>
        </Btn>
      </Bar>
    </Background>
  );
};

const Move = styled(Animated.View)`
  width: 50%;
  border-bottom-width: 2px;
  border-bottom-color: ${color.Green.Point};
  position: absolute;
  bottom: 2;
`;

const Background = styled.View`
  width: 100%;
  background-color: ${color.White};
`;

const Header = styled.View`
  margin-top: 32px;
  height: 68px;
  gap: 6px;
  justify-content: center;
  padding: 0 16px;
`;

const Btn = styled.Pressable`
  width: 50%;
  height: 44px;
  justify-content: center;
  align-items: center;
  border-bottom-width: 2px;
  border-bottom-color: ${color.Gray[100]};
  position: relative;
`;
const Bar = styled.View`
  width: 100%;
  flex-direction: row;
  margin-top: 24px;
`;

const CalendarTopBar = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name="TodayRecipe" component={TodayRecipe} />
      <Tab.Screen name="Calendar" component={Calendar} />
    </Tab.Navigator>
  );
};

export default CalendarTopBar;
