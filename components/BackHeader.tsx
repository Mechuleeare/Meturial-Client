import styled from 'styled-components/native';
import {Arrow_left} from '../assets';
import Txt from './Txt';
import {color} from '../style/color';
import {View} from 'react-native';

interface headerProps {
  name: string;
  nav?: any;
  num?: number;
  button?: string;
  func?: () => void;
}

const BackHeader = ({name, nav, num, button, func}: headerProps) => {
  return (
    <Frame>
      <Left>
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
      </Left>
      {button && func && (
        <Txt
          typography="LabelLarge"
          color={color.Green[500]}
          onPress={() => func()}>
          {button}
        </Txt>
      )}
    </Frame>
  );
};

export default BackHeader;

const Left = styled.View`
  gap: 8px;
  flex-direction: row;
  align-items: center;
`;
const Frame = styled.View`
  height: 48px;
  width: 100%;
  padding: 0 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: ${color.Gray[100]};
`;
