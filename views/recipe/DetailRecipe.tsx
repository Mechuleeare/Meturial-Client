import styled from 'styled-components/native';
import {color} from '../../style/color';
import BackHeader from '../../components/BackHeader';
import Txt from '../../components/Txt';
import Line from '../../components/Line';
import {File_upload, Pencil, Star_filled} from '../../assets';
import UnderTxt from '../../components/UnderTxt';
import Button from '../../components/Button';
import ReviewPreview from '../../components/ReviewPreview';
import WishButton from '../../components/WishButton';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {BaseUrl} from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RecipeType} from '../my/MyReviewList';

interface sequence {
  sequenceId: string;
  sequence: number;
  content: string;
  recipeId: string;
}

interface dataType {
  recipeId: string;
  name: string;
  isChoice: boolean;
  starRating: 4.8;
  starCount: 24;
  recipeImageUrl: string;
  recipeCategory: string[];
  recipeMaterial: string[];
  recipeSequence: sequence[];
}

interface recipeReviewListType {
  reviewId: string;
  writerName: string;
  starRating: number;
  reviewImageUrl: string;
  content: string;
  createdAt: string;
}

export interface recipeReviewRes {
  recipeReviewCount: number;
  recipeName: string;
  recipeReviewList: recipeReviewListType[];
}

const DetailRecipe = ({route, navigation}: any) => {
  const {recipeId}: {recipeId: string} = route.params;
  const [data, setData] = useState<dataType>();
  const [review, setReview] = useState<recipeReviewRes>();
  const [index, setIndex] = useState<string | undefined>();

  useEffect(() => {
    const getRecipeDetail = async () => {
      const Token = await AsyncStorage.getItem('AccessToken');
      await axios({
        method: 'GET',
        url: `${BaseUrl}/recipe/${recipeId}`,
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    };
    const getReview = async () => {
      const Token = await AsyncStorage.getItem('AccessToken');
      await axios({
        method: 'GET',
        url: `${BaseUrl}/review/list/${recipeId}`,
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
        .then(res => setReview(res.data))
        .catch(err => console.log(err));
    };
    getRecipeDetail();
    getReview();
  }, [recipeId, data]);

  useEffect(() => {
    if (review?.recipeName) {
      (async () => {
        const Token = await AsyncStorage.getItem('AccessToken');
        const nameCheckReq = await axios({
          method: 'GET',
          url: `${BaseUrl}/review/my`,
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        });
        const check: RecipeType = nameCheckReq.data.myReviewList.find(
          (reviewRes: RecipeType) =>
            reviewRes.recipeName === review.recipeName.slice(9, -1),
        );
        setIndex(check?.reviewId);
        console.log(check?.reviewId);
      })();
    }
  }, [review?.recipeName]);

  return (
    <Frame>
      <BackHeader name={data?.name || '레시피'} nav={navigation} />
      <Content contentContainerStyle={{paddingBottom: 120}}>
        {data?.recipeImageUrl ? (
          <TitleImg source={{uri: data?.recipeImageUrl}} />
        ) : (
          <NImg />
        )}
        <Title>
          <Txt typography="HeadlineLarge">{data?.name}</Txt>
          <Tag>
            {data?.recipeCategory.map(v => (
              <Txt color={color.Green[500]} typography="LabelLarge" key={v}>
                #{v}
              </Txt>
            ))}
          </Tag>
        </Title>
        <SubFrame>
          <StarFrame>
            <Star_filled color={color.Yellow.Point} />
            <Txt color={color.Yellow[900]}>
              {data?.starRating}
              <Txt color={color.Gray[400]}> ({data?.starCount})</Txt>
            </Txt>
          </StarFrame>
          <Row>
            <WishButton recipeId={data?.recipeId} wishState={data?.isChoice} />
            <File_upload />
          </Row>
        </SubFrame>
        <Line />
        <Material>
          <Txt typography="TitleMedium">재료</Txt>
          <Txt color={color.Gray[700]}>{data?.recipeMaterial.join(', ')}</Txt>
        </Material>
        <Line />
        <Column>
          <Txt typography="TitleMedium">조리 방법</Txt>
          <SequenceFrame>
            {data?.recipeSequence.map((v, i) => (
              <Sequence key={i}>
                <UnderTxt>{v.sequence}</UnderTxt>
                <TxtFrame>
                  <Txt typography="BodyLarge" color={color.Gray[700]}>
                    {v.content}
                  </Txt>
                </TxtFrame>
              </Sequence>
            ))}
          </SequenceFrame>
        </Column>
        <Line />
        <ReviewFrame>
          <Txt typography="TitleMedium">
            요리 후기
            <Txt typography="TitleMedium" color={color.Green[500]}>
              {' '}
              {review?.recipeReviewCount}
            </Txt>
          </Txt>
          {!index && (
            <Button
              status="silver"
              icon={<Pencil size={20} />}
              onPress={() =>
                navigation.navigate('ReviewManagement', {
                  isRegister: true,
                  recipeId: recipeId,
                  name: data?.name,
                })
              }>
              요리 후기 작성하기
            </Button>
          )}
          {review?.recipeReviewList.slice(0, 3).map(v => (
            <ReviewPreview
              name={v.writerName}
              content={v.content}
              createdAt={v.createdAt}
              starRating={v.starRating}
              reviewImageUrl={v.reviewImageUrl}
              key={v.reviewId}
              onTouch={() =>
                navigation.navigate('Review', {
                  data: v.reviewId,
                  edit: index === v.reviewId,
                })
              }
              my={index === v.reviewId}
            />
          ))}
          {review && review?.recipeReviewList?.length > 3 && (
            <Button
              status="outline"
              onPress={() =>
                navigation.navigate('ReviewAll', {
                  review: review,
                  index: index,
                })
              }>
              요리 후기 모두 보기
            </Button>
          )}
        </ReviewFrame>
      </Content>
    </Frame>
  );
};

export default DetailRecipe;

const ReviewFrame = styled.View`
  width: 100%;
  padding: 0 16px;
  gap: 24px;
  margin: 8px 0;
`;
const TxtFrame = styled.View`
  padding: 6px 0;
  flex: 1;
`;
const Sequence = styled.View`
  flex-direction: row;
  gap: 12px;
`;
const SequenceFrame = styled.View`
  width: 100%;
  gap: 32px;
  padding: 8px 0;
`;
const Column = styled.View`
  width: 100%;
  padding: 0 16px;
  gap: 24px;
`;
const Material = styled.View`
  width: 100%;
  padding: 8px 16px;
  gap: 8px;
`;
const Row = styled.View`
  flex-direction: row;
  gap: 12px;
`;
const StarFrame = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;
const SubFrame = styled.View`
  width: 100%;
  padding: 0 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Tag = styled.View`
  flex-direction: row;
  gap: 6px;
  flex-wrap: wrap;
`;
const Title = styled.View`
  gap: 4px;
  padding: 16px 16px 20px;
`;
const NImg = styled.View`
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: ${color.Gray[50]};
`;
const TitleImg = styled.Image`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
`;
const Content = styled.ScrollView``;
const Frame = styled.View`
  background-color: ${color.White};
  flex: 1;
`;
