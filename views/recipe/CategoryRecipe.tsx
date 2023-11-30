import styled from 'styled-components/native';
import {color} from '../../style/color';
import BackHeader from '../../components/BackHeader';
import {useEffect, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {recommendDataRes} from '../main/Main';
import {BigPreview} from '../../components/BigPreview';

const CategoryRecipe = ({route, navigation}: any) => {
  const [data, setData] = useState<recommendDataRes[]>();
  const {category} = route.params;

  useEffect(() => {
    async function getCategoryRecipe() {
      const Token = await AsyncStorage.getItem('Access_Token');
      await axios
        .get('http://43.202.18.230:8000/recipe/category', {
          headers: {Authorization: Token},
          params: {category: category},
        })
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    }

    getCategoryRecipe();
  }, [category]);

  return (
    <Background>
      <BackHeader name={category + '추천'} nav={navigation} />
      <TodayList
        contentContainerStyle={{paddingBottom: 120, paddingTop: 24, gap: 40}}>
        {data
          ?.sort(() => Math.random() - 0.5)
          .slice(0, 8)
          .map(v => (
            <BigPreview nav={navigation} data={v} key={v.id} />
          ))}
      </TodayList>
    </Background>
  );
};

export default CategoryRecipe;

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
