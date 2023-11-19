import styled from 'styled-components/native';
import BackHeader from '../../components/BackHeader';
import {color} from '../../style/color';
import ReviewPreview from '../../components/ReviewPreview';
import {recipeReviewRes} from './DetailRecipe';

const ReviewAll = ({route, navigation}: any) => {
  const {review}: {review: recipeReviewRes} = route.params;

  return (
    <Flex>
      <BackHeader
        name={review.recipeName.slice(9, -1) + ' 후기'}
        num={review.recipeReviewCount}
        nav={navigation}
      />
      <Content
        contentContainerStyle={{
          gap: 18,
          paddingHorizontal: 16,
          paddingTop: 24,
          paddingBottom: 120,
        }}>
        {review?.recipeReviewList.map(v => (
          <ReviewPreview
            name={v.writerName}
            content={v.content}
            createdAt={v.createdAt}
            starRating={v.starRating}
            reviewImageUrl={v.reviewImageUrl}
            key={v.reviewId}
            onTouch={() => navigation.navigate('Review', {data: v.reviewId})}
          />
        ))}
      </Content>
    </Flex>
  );
};

export default ReviewAll;

const Content = styled.ScrollView``;
const Flex = styled.View`
  background-color: ${color.White};
  flex: 1;
`;
