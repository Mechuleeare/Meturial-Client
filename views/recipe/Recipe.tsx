import {Text} from 'react-native';
import styled from 'styled-components/native';
import {color} from '../../style/color';

export const Recipe = () => {
  return (
    <Frame>
      <Text>this is recipe page</Text>
    </Frame>
  );
};

const Frame = styled.View`
  flex: 1;
  background-color: ${color.White};
`;
