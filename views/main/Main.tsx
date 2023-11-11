import {View} from 'react-native';
import styled from 'styled-components/native';
import {color} from '../../style/color';
import Txt from '../../components/Txt';
import {Access_time, Search} from '../../assets';
import UnderTxt from '../../components/UnderTxt';
import TodayMenu from '../../components/TodayMenu';

export interface menuType {
  menu?: string;
  img?: string;
  recipe?: string;
}
type todayMenuProps = {
  [key in 'morning' | 'lunch' | 'dinner']: menuType;
};

const todayMenu: todayMenuProps = {
  morning: {
    menu: '토스트',
    img: 'https://cdn.pixabay.com/photo/2015/10/19/06/13/french-toast-995532_1280.jpg',
    recipe: '토스트',
  },
  lunch: {
    menu: '크림파스타',
    img: 'https://cdn.pixabay.com/photo/2023/10/10/08/40/alfredo-8305773_1280.jpg',
    recipe: '크림파스타',
  },
  dinner: {
    menu: '페페로니피자',
    img: 'https://cdn.pixabay.com/photo/2023/05/08/13/40/pizza-7978642_1280.jpg',
    recipe: '페페로니피자',
  },
};

export const Main = ({navigation}: any) => {
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
          <TodayMenu data={todayMenu.morning} time="morning" nav={navigation} />
          <TodayMenu data={todayMenu.lunch} time="lunch" nav={navigation} />
          <TodayMenu data={todayMenu.dinner} time="dinner" nav={navigation} />
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
const Content = styled.ScrollView``;
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
