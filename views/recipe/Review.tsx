import styled from 'styled-components/native';
import {color} from '../../style/color';
import BackHeader from '../../components/BackHeader';
import Txt from '../../components/Txt';
import {Star_filled} from '../../assets';

const Review = ({route, navigation}: any) => {
  const {recipe, data} = route.params;
  console.log(data);

  const star = 4;

  return (
    <Flex>
      <BackHeader name={recipe} nav={navigation} />
      <Frame>
        <Img
          source={{
            uri: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
        />
        <Content>
          <TxtFrame>
            <Txt typography="TitleLarge">강진현</Txt>
            <StarFrame>
              <Star>
                {[1, 2, 3, 4, 5].map((v, i) => (
                  <Star_filled
                    size={14}
                    key={i}
                    color={v > star ? color.Gray[100] : color.Yellow.Point}
                  />
                ))}
              </Star>
              <Txt typography="LabelMedium" color={color.Gray[300]}>
                2023.10.10
              </Txt>
            </StarFrame>
          </TxtFrame>
          <Txt color={color.Gray[800]}>
            만들기도 증말 쉽고 너무너무 맛있네요. 아들이 이거 먹고 행복맨이
            되었어요. 감사합니다.
          </Txt>
        </Content>
      </Frame>
    </Flex>
  );
};

export default Review;

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
