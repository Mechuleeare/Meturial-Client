import {Image, Pressable} from 'react-native';
import {styled} from 'styled-components/native';
import {color} from '../../style/color';
import {AllergyCheckTitle, BackArrow} from '../../assets';
import Txt from '../../components/Txt';
import Button from '../../components/Button';
import {BaseUrl} from '../../utils';
import axios from 'axios';

export const AllergyCheck = ({navigation, route}: any) => {
  const {name, email, password, profileImageUrl} = route.params;
  const HandleImmediatelySignup = async () => {
    try {
      const result = await axios.post(`${BaseUrl}/user/signup`, {
        email: email,
        password: password,
        name: name,
        deviceToken: 'assfffgag-afaghhhh',
        profileImageUrl: `${profileImageUrl}`,
      });
      console.log(result);
      navigation.navigate('Main');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Background>
      <BackPageFlex>
        <Pressable onPress={() => navigation.goBack(null)}>
          <Image source={BackArrow} />
        </Pressable>
      </BackPageFlex>
      <TitleFlex>
        <Image source={AllergyCheckTitle} />
        <Txt typography="TitleSmall">
          알레르기가 있는 음식을 추천에서 제외해 드릴게요
        </Txt>
      </TitleFlex>
      <Margin />
      <ButtonFlex>
        <Button
          onPress={() =>
            navigation.navigate('Allergy', {
              name: name,
              email: email,
              password: password,
              profileImageUrl: profileImageUrl,
            })
          }>
          알레르기가 있어요
        </Button>
        <Button onPress={HandleImmediatelySignup} status="silver">
          없어요(회원가입 완료)
        </Button>
      </ButtonFlex>
    </Background>
  );
};

const Background = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${color.White};
  padding: 32px 16px;
`;

const BackPageFlex = styled.View`
  width: 100%;
  height: 48px;
`;

const TitleFlex = styled.View`
  display: flex;
  width: 100%;
  height: 120px;
  gap: 6px;
`;

const Margin = styled.View`
  width: 100%;
  height: 64%;
`;

const ButtonFlex = styled.View`
  display: flex;
  gap: 18px;
  width: 100%;
  height: 15%;
`;
