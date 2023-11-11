import {Dimensions, View} from 'react-native';
import styled from 'styled-components/native';
import {color} from '../style/color';
import Txt from './Txt';
import {Arrow_right} from '../assets';
import {menuType} from '../views';

const todayTime = {
  morning: ['아침', '8:00'],
  lunch: ['점심', '12:00'],
  dinner: ['저녁', '6:00'],
};

const TodayMenu = ({
  data,
  time,
  nav,
}: {
  data: menuType;
  time: 'morning' | 'lunch' | 'dinner';
  nav: any;
}) => {
  const {menu, img, recipe} = data;
  return (
    <View>
      {data && (
        <TodayFrame>
          <TextFrame>
            <Txt typography="TitleSmall">{todayTime[time][0]}</Txt>
            <Txt typography="HeadlineLarge">{todayTime[time][1]}</Txt>
            <Txt typography="TitleMedium" style={{marginTop: 8}}>
              {menu}
            </Txt>
            <MoveFrame>
              <Txt
                typography="BodySmall"
                color={color.Green[500]}
                onPress={() => nav.navigate('DetailRecipe', {recipe: recipe})}>
                레시피 보러가기
              </Txt>
              <Arrow_right color={color.Green[500]} />
            </MoveFrame>
          </TextFrame>
          <ImgFrame
            source={{
              uri: img,
            }}
          />
        </TodayFrame>
      )}
    </View>
  );
};

export default TodayMenu;

const ImgFrame = styled.Image`
  background-color: ${color.Gray[50]};
  object-fit: cover;
  height: 100%;
  width: 154px;
  border-radius: 4px;
`;
const TextFrame = styled.View`
  padding: 18px;
`;
const MoveFrame = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
  margin-top: 14px;
`;
const TodayFrame = styled.View`
  width: ${Dimensions.get('window').width - 32}px;
  background-color: white;
  height: 200px;
  border-radius: 8px;
  border: 2px solid ${color.Gray[50]};
  padding: 6px;
  justify-content: space-between;
  align-items: flex-end;
  flex-direction: row;
`;
