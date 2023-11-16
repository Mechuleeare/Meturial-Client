import styled from 'styled-components/native';
import {color} from '../../style/color';
import BackHeader from '../../components/BackHeader';
import {useEffect} from 'react';
import axios from 'axios';
import {Access_Token} from '../main/Main';

const CategoryRecipe = ({route, navigation}: any) => {
  const {recipe} = route.params;

  useEffect(() => {
    async function getCategoryRecipe() {
      await axios
        .get('http://43.202.18.230:8000/recipe/category', {
          headers: {Authorization: Access_Token},
          params: {category: '한식'},
        })
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    }

    getCategoryRecipe();
  }, []);

  return (
    <Frame>
      <BackHeader name={recipe} nav={navigation} />
    </Frame>
  );
};

export default CategoryRecipe;

const Frame = styled.View`
  background-color: ${color.White};
  flex: 1;
`;
