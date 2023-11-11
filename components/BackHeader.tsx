import styled from 'styled-components/native';
import {Arrow_left} from '../assets';
import Txt from './Txt';
import {color} from '../style/color';
import {View} from 'react-native';

const BackHeader = ({name, nav}: {name: string; nav: any}) => {
  return (
    <Frame>
      <View onTouchStart={() => nav.goBack()}>
        <Arrow_left />
      </View>
      <Txt typography="TitleMedium">{name}</Txt>
    </Frame>
  );
};

export default BackHeader;

const Frame = styled.View`
  height: 48px;
  width: 100%;
  padding: 0 16px;
  gap: 8px;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid ${color.Gray[100]};
`;
