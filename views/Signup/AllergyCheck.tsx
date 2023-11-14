import {Image, Pressable} from 'react-native';
import {styled} from 'styled-components/native';
import {color} from '../../style/color';
import {AllergyCheckTitle, BackArrow} from '../../assets';
import Txt from '../../components/Txt';
import Button from '../../components/Button';

export const AllergyCheck = ({navigation}: any) => {
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
        <Button onPress={() => navigation.navigate('Allergy')}>
          알레르기가 있어요
        </Button>
        <Button onPress={() => navigation.navigate('Main')} status="silver">
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
  height: 60%;
`;

const ButtonFlex = styled.View`
  display: flex;
  gap: 18px;
  width: 100%;
  height: 15%;
`;
