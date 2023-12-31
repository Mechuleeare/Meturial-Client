import styled from 'styled-components/native';
import BackHeader from '../../components/BackHeader';
import {useState} from 'react';
import AllergyDropdown from '../../components/AllergyDropdown';
import Button from '../../components/Button';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BaseUrl} from '../../utils';

const MyAllergy = ({navigation, route}: any) => {
  const {allergy, name, image} = route.params;
  const [allergys, setAllergy] = useState<string[]>(
    allergy[0] === '' ? [] : allergy,
  );
  console.log(allergys);

  const patchAllergy = async () => {
    const Token = await AsyncStorage.getItem('AccessToken');
    await axios({
      method: 'PATCH',
      url: `${BaseUrl}/user/my-page`,
      data: {
        profileImageUrl: image,
        name: name,
        allergyInfo: allergys.join(','),
      },
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    })
      .then(() => navigation.navigate('My'))
      .catch(err => console.log(err));
  };

  return (
    <Frame>
      <BackHeader name="알레르기 관리" nav={navigation} />
      <AllergyDropdown setAllergy={setAllergy} allergy={allergys} />
      <BtnFrame>
        <Button onPress={() => patchAllergy()}>수정하기</Button>
      </BtnFrame>
    </Frame>
  );
};

export default MyAllergy;

const BtnFrame = styled.View`
  width: 100%;
  padding: 0 16px 32px;
`;
const Frame = styled.View`
  width: 100%;
  flex: 1;
  background-color: white;
  gap: 24px;
`;
