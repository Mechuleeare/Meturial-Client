import {styled} from 'styled-components/native';
import {color} from '../../style/color';
import {BigPreview} from '../../components/BigPreview';
import {recommendDataRes} from './Main';
import BackHeader from '../../components/BackHeader';

export const TodayRecipeAll = ({route, navigation}: any) => {
  const {data}: {data: recommendDataRes[]} = route.params;
  return (
    <Background>
      <BackHeader name="오늘의 추천 메뉴" num={data.length} nav={navigation} />
      <TodayList
        contentContainerStyle={{paddingBottom: 120, paddingTop: 24, gap: 40}}>
        {data.map(v => (
          <BigPreview nav={navigation} data={v} key={v.id} />
        ))}
      </TodayList>
    </Background>
  );
};

const Background = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${color.White};
`;

const TodayList = styled.ScrollView`
  padding: 0 16px;
  width: 100%;
  height: 100%;
  background-color: ${color.White};
  flex: 1;
`;
