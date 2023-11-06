import {Text, View} from 'react-native';
import styled from 'styled-components/native';
import {color} from '../style/color';
import Txt from '../components/Txt';
import {Access_time, Search} from '../assets';

export const Main = () => {
  return (
    <Frame>
      <Header>
        <LeftFrame>
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              borderRadius: 100,
              backgroundColor: color.Green[500],
              width: 24,
              height: 24,
            }}
          />
          <Txt typography="TitleMedium">메추리알</Txt>
        </LeftFrame>
        <RightFrame>
          <Search />
          <Access_time />
        </RightFrame>
      </Header>
      <Text>hello! this is main page!</Text>
    </Frame>
  );
};

const RightFrame = styled.View`
  gap: 16px;
  flex-direction: row;
`;
const LeftFrame = styled.View`
  align-items: center;
  flex-direction: row;
  gap: 4px;
`;
const Header = styled.View`
  height: 48px;
  background-color: ${color.White};
  align-items: center;
  flex-direction: row;
  padding: 0 16px;
  justify-content: space-between;
`;
const Frame = styled.View`
  background-color: ${color.White};
  flex: 1;
`;
