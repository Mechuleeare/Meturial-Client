import styled from 'styled-components/native';
import {color} from '../style/color';
import Txt from './Txt';
import {Star_filled} from '../assets';
import WishButton from './WishButton';

const RecipeLarge = ({nav}: {nav: any}) => {
  return (
    <RecipeFrame
      onTouchEnd={() => nav.navigate('DetailRecipe', {recipe: '크림파스타'})}>
      <BigImg />
      <Title>
        <Txt typography="TitleMedium">크림파스타</Txt>
        <WishButton size={18} />
      </Title>
      <TagFrame>
        {['양식', '면요리', '파스타'].map((v, i) => (
          <Txt typography="BodySmall" color={color.Green[500]} key={i}>
            #{v}
          </Txt>
        ))}
      </TagFrame>
      <SubFrame>
        <Txt typography="LabelSmall" color={color.Gray[300]}>
          2048명의 후기
        </Txt>
        <StarFrame>
          <Star_filled size={16} color={color.Yellow.Point} />
          <Txt typography="BodySmall" color={color.Yellow[900]}>
            4.8
          </Txt>
        </StarFrame>
      </SubFrame>
    </RecipeFrame>
  );
};

export default RecipeLarge;

const StarFrame = styled.View`
  flex-direction: row;
  align-items: center;
`;
const SubFrame = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 8px 0;
`;
const TagFrame = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 4px;
  padding: 2px 8px 0;
`;
const Title = styled.View`
  padding: 8px 8px 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const BigImg = styled.View`
  width: 180px;
  height: 180px;
  background-color: ${color.Gray[100]};
  border-radius: 8px;
`;
const RecipeFrame = styled.View``;
