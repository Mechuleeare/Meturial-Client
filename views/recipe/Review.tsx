import styled from 'styled-components/native';
import {color} from '../../style/color';
import BackHeader from '../../components/BackHeader';
import Txt from '../../components/Txt';
import {Star_filled} from '../../assets';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BaseUrl} from '../../utils';

interface ReviewDataType {
  recipeId: string;
  recipeName: string;
  writerName: string;
  starRating: number;
  content: string;
  reviewImageUrl: string;
  createdAt: string;
}

const Review = ({route, navigation}: any) => {
  const {data} = route.params;
  const [reviewData, setReviewData] = useState<ReviewDataType>({
    recipeId: '',
    recipeName: '',
    writerName: '',
    starRating: 0,
    content: '',
    reviewImageUrl: '',
    createdAt: '',
  });

  useEffect(() => {
    async function AxiosReviewDetail() {
      const Token = await AsyncStorage.getItem('AccessToken');
      try {
        const result = await axios.get(`${BaseUrl}/review/${data}`, {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        });
        console.log(result.data);
        setReviewData(result.data);
      } catch (error) {
        console.log(error);
      }
    }

    AxiosReviewDetail();
  }, [data]);

  const deleteReview = async () => {
    const Token = await AsyncStorage.getItem('Access_Token');
    await axios({
      method: 'DELETE',
      url: `${BaseUrl}/review/${data}`,
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    })
      .then(res => {
        console.log('review is deleted! ' + res.data);
        navigation.goBack(null);
      })
      .catch(err => console.log(err));
  };

  const Modal = (
    <MFrame>
      <List
        onPress={() =>
          navigation.navigate('ReviewManagement', {
            isRegister: true,
            recipeId: undefined,
            reviewId: data,
          })
        }
        style={({pressed}) => [
          {backgroundColor: pressed ? color.Gray[100] : color.White},
        ]}>
        <Txt typography="LabelMedium">수정하기</Txt>
      </List>
      <List
        onPress={() => deleteReview()}
        style={({pressed}) => [
          {backgroundColor: pressed ? color.Gray[100] : color.White},
        ]}>
        <Txt typography="LabelMedium" color={color.Red.Point}>
          삭제하기
        </Txt>
      </List>
    </MFrame>
  );

  return (
    <Flex key={reviewData.recipeId}>
      <BackHeader name={reviewData.recipeName} nav={navigation} modal={Modal} />
      <Frame>
        {reviewData.reviewImageUrl ? (
          <Img
            source={{
              uri: reviewData.reviewImageUrl,
            }}
          />
        ) : (
          <ImgSkeleton />
        )}
        <Content>
          <TxtFrame>
            <Txt typography="TitleLarge">{reviewData.writerName}</Txt>
            <StarFrame>
              <Star>
                {[1, 2, 3, 4, 5].map((v, i) => (
                  <Star_filled
                    size={14}
                    key={i}
                    color={
                      v > reviewData?.starRating
                        ? color.Gray[100]
                        : color.Yellow.Point
                    }
                  />
                ))}
              </Star>
              <Txt typography="LabelMedium" color={color.Gray[300]}>
                {reviewData.createdAt.substring(0, 10).replaceAll('-', '.')}
              </Txt>
            </StarFrame>
          </TxtFrame>
          <Txt color={color.Gray[800]}>{reviewData.content}</Txt>
        </Content>
      </Frame>
    </Flex>
  );
};

export default Review;

const ImgSkeleton = styled.View`
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 8px;
  background-color: ${color.Gray[100]};
`;
const List = styled.Pressable`
  padding: 8px;
  border-radius: 6px;
  background-color: ${color.White};
`;
const MFrame = styled.View`
  padding: 4px;
  gap: 2px;
  border-width: 2px;
  border-color: ${color.Gray[50]};
  width: 100px;
  border-radius: 8px;
  background-color: ${color.White};
`;
const Frame = styled.View`
  flex: 1;
  padding: 24px 16px 0;
  gap: 12px;
`;
const Star = styled.View`
  flex-direction: row;
`;
const StarFrame = styled.View`
  gap: 8px;
  flex-direction: row;
  align-items: center;
`;
const TxtFrame = styled.View`
  gap: 4px;
`;
const Img = styled.Image`
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 8px;
  background-color: ${color.Gray[100]};
`;
const Content = styled.View`
  width: 100%;
  gap: 12px;
`;
const Flex = styled.View`
  background-color: ${color.White};
  flex: 1;
`;
