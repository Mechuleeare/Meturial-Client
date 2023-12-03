import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Ranking from './Ranking';
import {Recipe} from './Recipe';
import styled from 'styled-components/native';
import {color} from '../../style/color';
import Txt from '../../components/Txt';
import {Animated} from 'react-native';
import {useEffect, useRef} from 'react';
import {Creation, Search} from '../../assets';
import Button from '../../components/Button';

const TabBar = ({state, navigation}: any) => {
  const animationHorizontalValue = useRef(new Animated.Value(0)).current;

  const animate = (index: number) => {
    Animated.spring(animationHorizontalValue, {
      toValue: index * 72,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animate(state.index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.index]);

  return (
    <Frame>
      <Bar>
        <Move style={{transform: [{translateX: animationHorizontalValue}]}} />
        <Btn onPress={() => navigation.navigate('Category')}>
          <Txt
            typography="LabelLarge"
            color={!state.index ? color.White : color.Gray[500]}>
            카테고리
          </Txt>
        </Btn>
        <Btn onPress={() => navigation.navigate('Ranking')}>
          <Txt
            typography="LabelLarge"
            color={state.index ? color.White : color.Gray[500]}>
            랭킹
          </Txt>
        </Btn>
      </Bar>
      <Gap>
        <Button
          status="silver"
          icon={<Search size={20} />}
          onPress={() => navigation.navigate('NormalSearch')}>
          일반 검색
        </Button>
        <Button
          status="primary2"
          icon={<Creation size={20} color={color.Green.Point} />}
          onPress={() => {}}>
          재료 기반 검색
        </Button>
      </Gap>
    </Frame>
  );
};

const Gap = styled.View`
  width: 100%;
  padding: 24px 16px 32px;
  gap: 8px;
`;
const Move = styled(Animated.View)`
  width: 72px;
  height: 28px;
  border-radius: 14px;
  background-color: ${color.Green[500]};
  position: absolute;
  top: 2px;
  left: 2px;
`;
const Btn = styled.Pressable`
  width: 72px;
  height: 28px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
`;
const Bar = styled.View`
  height: 32px;
  padding: 2px;
  border-radius: 16px;
  background-color: ${color.Gray[50]};
  flex-direction: row;
`;
const Frame = styled.View`
  width: 100%;
  align-items: center;
  background-color: ${color.White};
  border-bottom-width: 1px;
  border-bottom-color: ${color.Gray[100]};
  padding-top: 16px;
`;

const RecipeTopBar = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name="Category" component={Recipe} />
      <Tab.Screen name="Ranking" component={Ranking} />
    </Tab.Navigator>
  );
};

export default RecipeTopBar;
