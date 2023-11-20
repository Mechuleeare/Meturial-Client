import {styled} from 'styled-components/native';
import {color} from '../../style/color';
import {Image} from 'react-native';
import {BackArrow} from '../../assets';
import Txt from '../../components/Txt';
import {BigPreview} from '../../components/BigPreview';

export const TodayRecipeAll = ({navigation}: any) => {
  return (
    <Background>
      <Header>
        <ImgPress onPress={() => navigation.goBack(null)}>
          <Image source={BackArrow} />
        </ImgPress>
        <Txt typography="TitleMedium">오늘의 추천 메뉴</Txt>
        <Txt typography="TitleMedium" color={color.Green.Point}>
          123
        </Txt>
      </Header>
      <Line />
      <TodayList>
        <BigPreview />
      </TodayList>
    </Background>
  );
};

const Background = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${color.White};
`;

const Header = styled.View`
  width: 100%;
  height: 48px;
  flex-direction: row;
  align-items: center;
  padding: 0 16px;
  gap: 8px;
`;

const ImgPress = styled.Pressable``;

const Line = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${color.Gray[100]};
`;

const TodayList = styled.ScrollView`
  padding: 0 16px;
  width: 100%;
  height: 100%;
  margin-top: 24px;
  background-color: ${color.White};
  padding: 24px 16px;
  flex: 1;
`;
