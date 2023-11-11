import {Image, Pressable} from 'react-native';
import {styled} from 'styled-components/native';
import {color} from '../../style/color';
import {BackArrow, SignupTitle, Add} from '../../assets';
import Txt from '../../components/Txt';
import Button from '../../components/Button';
// import {launchImageLibrary} from 'react-native-image-picker';

export const Profile = ({navigation}: any) => {
  const ShowPicker = () => {
    //launchImageLibrary : 사용자 앨범 접근
    // launchImageLibrary({}, res => {
    //   const formdata = new FormData();
    //   formdata.append('file', res.assets[0].uri);
    //   console.log(res);
    // });
  };

  return (
    <Background>
      <BackPageFlex>
        <Pressable onPress={() => navigation.goBack(null)}>
          <Image source={BackArrow} />
        </Pressable>
      </BackPageFlex>
      <TitleFlex>
        <Image source={SignupTitle} />
        <Txt typography="TitleSmall">프로필 사진을 추가해 주세요</Txt>
      </TitleFlex>
      <ProfileInputFlex>
        <Txt typography="LabelSmall" color={color.Gray[800]}>
          프로필 사진
        </Txt>
        <ProfileInputBackground>
          <ProfileInput onPress={ShowPicker}>
            <Image source={Add} />
          </ProfileInput>
        </ProfileInputBackground>
      </ProfileInputFlex>
      <Button onPress={() => navigation.navigate('AllergyCheck')}>다음</Button>
      <SignupGo>
        <Txt typography="BodyMedium">이미 계정이 있으신가요?</Txt>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Txt typography="BodyMedium" color={color.Blue.Point}>
            로그인
          </Txt>
        </Pressable>
      </SignupGo>
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
  height: 100px;
  gap: 6px;
`;

const ProfileInputFlex = styled.View`
  width: 100%;
  height: 66%;
  gap: 4px;
`;

const ProfileInputBackground = styled.View`
  width: 100%;
  height: 40%;
  border-radius: 8px;
  background-color: ${color.Gray[50]};
  display: flex;
  align-items: center;
`;

const ProfileInput = styled.Pressable`
  width: 50%;
  height: 99%;
  border-radius: 8px;
  background-color: ${color.Gray[50]};
  shadowcolor: ${color.Black};
  shadowoffset: {
    width: 0;
    height: 5;
  }
  shadowopacity: 0.1;
  shadowradius: 8px;
  elevation: 5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SignupGo = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 8px;
  margin-top: 18px;
`;
