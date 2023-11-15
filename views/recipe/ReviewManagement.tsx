import styled from 'styled-components/native';
import {color} from '../../style/color';
import BackHeader from '../../components/BackHeader';
import Txt from '../../components/Txt';
import {Star_filled} from '../../assets';
import {View} from 'react-native';
import {useState} from 'react';

const ReviewManagement = ({route, navigation}: any) => {
  const {isRegister} = route.params;

  const [star, setStar] = useState<number>(4);
  const [content, setContent] = useState<string>('');

  console.log(content);

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
          <Img
            source={{
              uri: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            }}
          />
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
  background-color: ${color.Gray[100]};
`;
const Flex = styled.View`
  background-color: ${color.White};
  flex: 1;
`;
