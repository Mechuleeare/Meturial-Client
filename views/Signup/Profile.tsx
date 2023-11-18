import {Image, Pressable} from 'react-native';
import {styled} from 'styled-components/native';
import {color} from '../../style/color';
import {BackArrow, Add} from '../../assets';
import Txt from '../../components/Txt';
import Button from '../../components/Button';
import {launchImageLibrary} from 'react-native-image-picker';
import {BaseUrl} from '../../utils';
import axios from 'axios';
import {useState} from 'react';
import UnderTxt from '../../components/UnderTxt';

export const Profile = ({navigation, route}: any) => {
  const [imageData, setImageData] = useState<string>();
  const [imageState, setImageState] = useState<boolean>(false);
  const {email, password, name} = route.params;
  const ShowPicker = () => {
    //launchImageLibrary : 사용자 앨범 접근
    launchImageLibrary({mediaType: 'photo'}, async res => {
      const formdata = new FormData();
      const file = {
        name: res?.assets?.[0]?.fileName,
        type: res?.assets?.[0]?.type,
        uri: res?.assets?.[0]?.uri,
      };
      formdata.append('images', file);
      try {
        const result = await axios.post(`${BaseUrl}/image`, formdata, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setImageData(result.data.imageUrl[0]);
        setImageState(true);
        await console.log(imageData);
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <Background>
      <BackPageFlex>
        <Pressable onPress={() => navigation.goBack(null)}>
          <Image source={BackArrow} />
        </Pressable>
      </BackPageFlex>
      <TitleFlex>
        <UnderTxt typo="HeadlineLarge">회원가입</UnderTxt>
        <Txt typography="TitleSmall">프로필 사진을 추가해 주세요</Txt>
      </TitleFlex>
      <ProfileInputFlex>
        <Txt typography="LabelSmall" color={color.Gray[800]}>
          프로필 사진
        </Txt>
        {imageState === false ? (
          <ProfileInputBackground>
            <ProfileInput
              onPress={ShowPicker}
              style={{
                shadowColor: color.Black,
                shadowOffset: {
                  width: 0,
                  height: 5,
                },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 5,
              }}>
              <Image source={Add} />
            </ProfileInput>
          </ProfileInputBackground>
        ) : (
          <UploadImageBackground
            source={{uri: `${imageData}`}}
            blurRadius={32}
            borderRadius={8}>
            <UploadImagePressable onPress={ShowPicker}>
              <UploadImage source={{uri: `${imageData}`}} borderRadius={8} />
            </UploadImagePressable>
          </UploadImageBackground>
        )}
      </ProfileInputFlex>
      <Button
        onPress={() =>
          navigation.navigate('AllergyCheck', {
            email: email,
            password: password,
            name: name,
            profileImageUrl: imageData,
          })
        }>
        다음
      </Button>
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
  padding: 0 16px 32px;
`;

const BackPageFlex = styled.View`
  width: 100%;
  height: 48px;
  justify-content: center;
`;

const TitleFlex = styled.View`
  display: flex;
  width: 100%;
  margin: 16px 0 36px;
  gap: 6px;
`;

const ProfileInputFlex = styled.View`
  width: 100%;
  flex: 1;
  gap: 4px;
`;

const ProfileInputBackground = styled.View`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  background-color: ${color.Gray[50]};
  display: flex;
  align-items: center;
`;

const ProfileInput = styled(Pressable)`
  width: 50%;
  height: 99%;
  border-radius: 8px;
  background-color: ${color.Gray[50]};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UploadImageBackground = styled.ImageBackground`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  object-fit: contain;
`;

const UploadImagePressable = styled.Pressable`
  width: 50%;
  height: 200px;
`;

const UploadImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
`;

const SignupGo = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 8px;
  margin-top: 18px;
`;
