import {Dimensions, View} from 'react-native';
import styled from 'styled-components/native';
import {color} from '../style/color';
import Txt from './Txt';
import {Arrow_right} from '../assets';
import {useEffect, useState} from 'react';

interface TodayMenuType {
  id?: string;
  img?: string;
  time?: string;
  nav?: any;
  name?: string;
}

const TodayMenu = ({time, nav, img, id, name}: TodayMenuType) => {
  const [timeData, setTimeData] = useState<string>();
  const [timeName, setTimeName] = useState<string>();

  useEffect(() => {
    if (time === 'BREAKFAST') {
      setTimeName('아침');
      setTimeData('8:00');
    } else if (time === 'LUNCH') {
      setTimeName('점심');
      setTimeData('12:00');
    } else if (time === 'DINNER') {
      setTimeName('저녁');
      setTimeData('6:00');
    }
  }, [time]);

  return (
    <View>
      <TodayFrame>
        <TextFrame>
          <Txt typography="TitleSmall">{timeName}</Txt>
          <Txt typography="HeadlineLarge">{timeData}</Txt>
          <Txt typography="TitleMedium" style={{marginTop: 8}}>
            {name}
          </Txt>
          <MoveFrame>
            <Txt
              typography="BodySmall"
              color={color.Green[500]}
              onPress={() => nav.navigate('DetailRecipe', {recipe: id})}>
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
