import {Dimensions, View} from 'react-native';
import styled from 'styled-components/native';
import {color} from '../style/color';
import Txt from '../components/Txt';
import {Access_time, Arrow_right, Search} from '../assets';
import UnderTxt from '../components/UnderTxt';

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
      <Content>
        <TodayRecipe
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}>
          <TodayFrame>
            <Txt typography="TitleSmall">아침</Txt>
            <Txt typography="HeadlineLarge">7:50</Txt>
            <Txt typography="TitleMedium" style={{marginTop: 8}}>
              토스트
            </Txt>
            <MoveFrame>
              <Txt typography="BodySmall" color={color.Green[500]}>
                레시피 보러가기
              </Txt>
              <Arrow_right color={color.Green[500]} />
            </MoveFrame>
          </TodayFrame>
        </TodayRecipe>
        <Box>
          <UnderTxt>레시피 카테고리</UnderTxt>
        </Box>
      </Content>
    </Frame>
  );
};

const Box = styled.View`
  gap: 16px;
  padding: 40px 16px 0;
`;
const MoveFrame = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
  margin-top: 14px;
`;
const Content = styled.ScrollView``;
const TodayFrame = styled.View`
  width: ${Dimensions.get('window').width - 32}px;
  background-color: white;
  margin: 0 16px;
  border-radius: 8px;
  border: 2px solid ${color.Gray[50]};
  padding: 24px;
  justify-content: flex-end;
`;
const TodayRecipe = styled.ScrollView`
  height: 200px;
  margin-top: 12px;
  display: flex;
  gap: 8px;
`;
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
