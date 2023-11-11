import {styled} from 'styled-components/native';
import {StartImage, StartText} from '../assets';
import {Image} from 'react-native';
import {color} from '../style/color';
import Button from '../components/Button';

export const Start = ({navigation}: any) => {
  return (
    <Backgorund source={StartImage}>
      <StartTextFlex>
        <Image source={StartText}></Image>
      </StartTextFlex>
      <ButtonFlex>
        <Button status="primary" onPress={() => navigation.navigate('Login')}>
          로그인
        </Button>
        <Button status="silver" onPress={() => navigation.navigate('Signup')}>
          회원가입
        </Button>
      </ButtonFlex>
    </Backgorund>
  );
};

const Backgorund = styled.ImageBackground`
  width: 100%;
  height: 100%;
  flex: 1;
`;

const StartTextFlex = styled.View`
  width: 100%;
  height: 75%;
  padding: 84px 0 0 16px;
`;

const ButtonFlex = styled.View`
  width: 100%;
  height: 25%;
  background-color: ${color.White};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 16px;
`;
