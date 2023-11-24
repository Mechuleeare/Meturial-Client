import styled from 'styled-components/native';
import {color} from '../../style/color';
import BackHeader from '../../components/BackHeader';
import Txt from '../../components/Txt';
import {Add, Star_filled} from '../../assets';
import {Image, Pressable, View} from 'react-native';
import {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {BaseUrl} from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReviewManagement = ({route, navigation}: any) => {
  const {isRegister} = route.params;

  const [star, setStar] = useState<number>(1);
  const [content, setContent] = useState<string>('');
  const [imageData, setImageData] = useState<string>();

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
      await axios
        .post(`${BaseUrl}/image`, formdata, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          setImageData(response.data.imageUrl[0]);
          console.log(imageData);
        });
    });
  };

  const onSubmit = async () => {
    if (content.trim() !== '' && imageData) {
      const Token = await AsyncStorage.getItem('Access_Token');
      await axios({
        method: 'POST',
        url: `${BaseUrl}/review`,
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
    }
  };

  return (
    <Flex>
      <BackHeader
        name={isRegister ? '요리 후기 작성' : '요리 후기 수정'}
        nav={navigation}
        button={isRegister ? '등록' : '수정'}
        func={() => console.log('히히')}
      />
      <Frame
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 24,
          gap: 24,
          paddingBottom: 120,
        }}>
        <TxtFrame>
          {!imageData ? (
            <ProfileInput onPress={ShowPicker}>
              <Image source={Add} />
            </ProfileInput>
          ) : (
            <Pressable onPress={ShowPicker}>
              <Img source={{uri: `${imageData}`}} borderRadius={8} />
            </Pressable>
          )}
          <StarFrame>
            <Txt typography="TitleSmall">별점</Txt>
            <Star>
              {[1, 2, 3, 4, 5].map((v, i) => (
                <View key={i} onTouchEnd={() => setStar(v)}>
                  <Star_filled
                    size={32}
                    color={v > star ? color.Gray[100] : color.Yellow.Point}
                  />
                </View>
              ))}
            </Star>
          </StarFrame>
        </TxtFrame>
        <Textarea
          multiline={true}
          placeholder="후기를 입력해주세요.."
          style={{textAlignVertical: 'top'}}
          value={content}
          onChangeText={setContent}
        />
      </Frame>
    </Flex>
  );
};

export default ReviewManagement;

const ProfileInput = styled.Pressable`
  width: 120px;
  height: 120px;
  border-radius: 8px;
  background-color: ${color.Gray[100]};
  justify-content: center;
  align-items: center;
`;
const Textarea = styled.TextInput`
  font-family: Pretendard-Regular;
  font-size: 14px;
  line-height: 20px;
`;
const StarFrame = styled.View`
  gap: 8px;
  align-items: center;
  flex: 1;
`;
const Frame = styled.ScrollView`
  flex: 1;
`;
const Star = styled.View`
  flex-direction: row;
`;
const TxtFrame = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Img = styled.Image`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
`;
const Flex = styled.View`
  background-color: ${color.White};
  flex: 1;
`;
