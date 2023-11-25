import styled from 'styled-components/native';
import {color} from '../style/color';
import Txt from './Txt';
import {Star_filled} from '../assets';

interface ReviewProps {
  name: string;
  starRating: number;
  content: string;
  reviewImageUrl: string;
  createdAt: string;
  onTouch: () => void;
  my?: boolean;
}

const ReviewPreview = ({
  name,
  starRating,
  content,
  reviewImageUrl,
  createdAt,
  onTouch,
  my,
}: ReviewProps) => {
  return (
    <Frame onTouchEnd={() => onTouch()}>
      <Content>
        <TxtFrame>
          <Txt typography="LabelLarge">{name + `${my ? ' (나)' : ''}`}</Txt>
          <StarFrame>
            <Star>
              {[1, 2, 3, 4, 5].map((v, i) => (
                <Star_filled
                  size={14}
                  key={i}
                  color={v > starRating ? color.Gray[100] : color.Yellow.Point}
                />
              ))}
            </Star>
            <Txt typography="LabelSmall" color={color.Gray[300]}>
              {createdAt?.slice(0, 10).replaceAll('-', '.')}
            </Txt>
          </StarFrame>
        </TxtFrame>
        <Txt typography="BodySmall" color={color.Gray[800]} numberOfLines={3}>
          {content}
        </Txt>
      </Content>
      {reviewImageUrl && (
        <Img
          source={{
            uri: reviewImageUrl,
          }}
        />
      )}
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
