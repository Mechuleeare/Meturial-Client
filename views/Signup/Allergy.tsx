import {Image, Pressable, View} from 'react-native';
import {styled} from 'styled-components/native';
import {color} from '../../style/color';
import {AllergyTitle, Arrow_back} from '../../assets';
import Txt from '../../components/Txt';
import Button from '../../components/Button';
import AllergyDropdown from '../../components/AllergyDropdown';
import {useState} from 'react';
import axios from 'axios';
import {BaseUrl} from '../../utils';

export const Allergy = ({navigation, route}: any) => {
  const [allergy, setAllergy] = useState<string[]>([]);
  const {name, email, password, profileImageUrl} = route.params;

  const signUpWithAllergy = async () => {
    await axios({
      method: 'POST',
      url: `${BaseUrl}/user/signup`,
      data: {
        email: email,
        password: password,
        name: name,
        deviceToken: 'assfffgag-afaghhhh',
        profileImageUrl: `${profileImageUrl}`,
        allergyInfo: allergy.join(','),
      },
    })
      .then(() => navigation.navigate('HomeTabs'))
      .catch(err => console.log(err));
  };

  return (
    <Background>
      <BackPageFlex>
        <Pressable onPress={() => navigation.goBack(null)}>
          <Arrow_back />
        </Pressable>
      </BackPageFlex>
      <TitleFlex>
        <Image source={AllergyTitle} />
        <Txt typography="TitleSmall">알레르기가 있는 음식을 알려드릴게요</Txt>
      </TitleFlex>
      <AllergyDropdown allergy={allergy} setAllergy={setAllergy} />
      <View style={{paddingHorizontal: 16}}>
        <Button onPress={() => signUpWithAllergy()}>완료</Button>
      </View>
    </Background>
  );
};

const Background = styled.View`
  width: 100%;
  flex: 1;
  background-color: ${color.White};
  padding: 0 0 32px;
`;

const BackPageFlex = styled.View`
  width: 100%;
  height: 48px;
  justify-content: center;
  padding: 0 16px;
`;

const TitleFlex = styled.View`
  display: flex;
  width: 100%;
  height: 120px;
  gap: 6px;
  padding: 0 16px;
  margin: 16px 0 36px;
`;
