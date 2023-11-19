import styled from 'styled-components/native';
import {Arrow_left, More} from '../assets';
import Txt from './Txt';
import {color} from '../style/color';
import {Dimensions, Pressable, View} from 'react-native';
import {ReactNode, useState} from 'react';

interface headerProps {
  name: string;
  nav?: any;
  num?: number | string;
  button?: string;
  func?: () => void;
  modal?: ReactNode;
}

const BackHeader = ({name, nav, num, button, func, modal}: headerProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Frame>
      <Left>
        {nav && (
          <View
            onTouchStart={e => {
              nav.goBack();
              e.stopPropagation();
            }}>
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
      {isOpen && <Background onPress={() => setIsOpen(false)} />}
      {modal && (
        <Pressable
          onPress={e => {
            setIsOpen(v => !v);
            e.stopPropagation();
          }}>
          <More />
          {isOpen && <ModalFrame>{modal}</ModalFrame>}
        </Pressable>
      )}
    </Frame>
  );
};

export default BackHeader;

const ModalFrame = styled.View`
  z-index: 100;
  position: absolute;
  right: 0;
  top: 48px;
`;
const Background = styled.Pressable`
  width: ${Dimensions.get('window').width}px;
  height: 2000px;
  position: absolute;
  background-color: transparent;
  z-index: -1;
`;
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
  z-index: 10;
`;
