import {styled} from 'styled-components/native';
import {color} from '../../style/color';
import {Pencil} from '../../assets';
import {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {BaseUrl} from '../../utils';
import Button from '../../components/Button';
import Input from '../../components/Input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackHeader from '../../components/BackHeader';

export const MyFixed = ({navigation, route}: any) => {
  const Old = route.params;
  const [imageData, setImageData] = useState<string>(Old.ImgUrl);
  const [nameValue, setNameValue] = useState<string>(Old.name);
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
        await console.log(imageData);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const HandleMyFixed = async () => {
    console.log(nameValue);
    const Token = await AsyncStorage.getItem('AccessToken');
    try {
      await axios.patch(
        `${BaseUrl}/user/my-page`,
        {
          profileImageUrl: imageData,
          name: nameValue,
          allergyInfo: Old.allergy.join(','),
        },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        },
      );
      await navigation.navigate('My');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Frame>
      <BackHeader name="내정보 수정" nav={navigation} />
      <Background>
        <ProfileInputFlex>
          <UploadImageBackground
            source={{uri: imageData}}
            blurRadius={32}
            borderRadius={8}>
            <UploadImagePressable onPress={ShowPicker}>
              <UploadImage source={{uri: imageData}} borderRadius={8} />
            </UploadImagePressable>
          </UploadImageBackground>
          <PencilImg>
            <Pencil color={color.White} />
          </PencilImg>
        </ProfileInputFlex>
        <ButtonFlex>
          <Input
            title="이름"
            eyeCheck={false}
            fun={setNameValue}
            inputValue={nameValue}
          />
          <Button
            status="silver"
            onPress={() =>
              navigation.navigate('MyAllergy', {
                allergy: Old.allergy,
                name: nameValue,
                image: imageData,
              })
            }>
            알레르기 관리
          </Button>
          <Button
            status="silver"
            onPress={() => navigation.navigate('PwChangeCheck')}>
            비밀번호 변경
          </Button>
        </ButtonFlex>
        <Button onPress={HandleMyFixed}>수정하기</Button>
      </Background>
    </Frame>
  );
};

const Frame = styled.View`
  flex: 1;
  width: 100%;
  background-color: white;
`;

const Background = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${color.White};
  padding: 0 16px;
`;

const ProfileInputFlex = styled.View`
  width: 100%;
  gap: 4px;
  margin: 24px 0 18px 0;
`;

const UploadImageBackground = styled.ImageBackground`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  object-fit: contain;
  position: relative;
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

const ButtonFlex = styled.View`
  width: 100%;
  height: 56%;
  gap: 18px;
`;

const PencilImg = styled.View`
  position: absolute;
  bottom: 16px;
  right: 16px;
`;
