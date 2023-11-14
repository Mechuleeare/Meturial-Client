import styled from 'styled-components/native';
import {Arrow_left} from '../assets';
import Txt from './Txt';
import {color} from '../style/color';
import {View} from 'react-native';

interface headerProps {
  name: string;
  nav?: any;
  num?: number;
}

const BackHeader = ({name, nav, num}: headerProps) => {
  return (
    <Frame>
      {nav && (
        <View onTouchStart={() => nav.goBack()}>
          <Arrow_left />
        </View>
      )}
      <Txt typography="TitleMedium">{name}</Txt>
      {num && (
        <Txt typography="TitleMedium" color={color.Green[500]}>
          {num}
        </Txt>
      )}
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
  border-bottom-width: 1px;
  border-bottom-color: ${color.Gray[100]};
`;
