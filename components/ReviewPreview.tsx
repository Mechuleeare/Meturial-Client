import styled from 'styled-components/native';
import {color} from '../style/color';
import Txt from './Txt';
import {Star_filled} from '../assets';

const ReviewPreview = () => {
  const star = 4;
  return (
    <Frame>
      <Content>
        <TxtFrame>
          <Txt typography="LabelLarge">강진현</Txt>
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
            <Txt typography="LabelSmall" color={color.Gray[300]}>
              2023.10.10
            </Txt>
          </StarFrame>
        </TxtFrame>
        <Txt typography="BodySmall" color={color.Gray[800]} numberOfLines={3}>
          만들기도 증말 쉽고 너무너무 맛있네요. 아들이 이거 먹고 행복맨이
          되었어요. 감사합니다.
        </Txt>
      </Content>
      <Img
        source={{
          uri: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        }}
      />
    </Frame>
  );
};

export default ReviewPreview;

const Star = styled.View`
  flex-direction: row;
`;
const StarFrame = styled.View`
  gap: 8px;
  flex-direction: row;
  align-items: center;
`;
const TxtFrame = styled.View``;
const Img = styled.Image`
  width: 96px;
  height: 96px;
  border-radius: 4px;
  background-color: ${color.Gray[100]};
`;
const Content = styled.View`
  width: 220px;
  gap: 8px;
`;
const Frame = styled.View`
  height: 96px;
  flex-direction: row;
  gap: 12px;
  justify-content: space-between;
`;
