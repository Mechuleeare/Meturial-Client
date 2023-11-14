import styled from 'styled-components/native';
import BackHeader from '../../components/BackHeader';
import {color} from '../../style/color';
import ReviewPreview from '../../components/ReviewPreview';

const ReviewAll = ({route, navigation}: any) => {
  const {recipe} = route.params;

  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <Flex>
      <BackHeader name={recipe + ' 후기'} num={12} nav={navigation} />
      <Content
        contentContainerStyle={{
          gap: 18,
          paddingHorizontal: 16,
          paddingTop: 24,
          paddingBottom: 120,
        }}>
        {data.map(v => (
          <ReviewPreview
            key={v}
            onTouch={() =>
              navigation.navigate('Review', {recipe: recipe, data: v})
            }
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
