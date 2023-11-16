import styled from 'styled-components/native';
import {color} from '../style/color';
import Txt from './Txt';
import {Star_filled} from '../assets';
import WishButton from './WishButton';
import {recommendDataRes} from '../views';

const RecipeLarge = ({nav, data}: {nav: any; data: recommendDataRes}) => {
  const {name, bigtype, material, description, url} = data;
  let kor = url.split('/');
  let encodeTxt = encodeURIComponent(kor[4]);
  kor[4] = encodeTxt;
  let result = kor.join('/');
  console.log(result);
  return (
    <RecipeFrame
      onTouchEnd={() => nav.navigate('DetailRecipe', {recipe: name})}>
      <BigImg source={{uri: `${result}`}} />
      <Title>
        <Txt typography="TitleMedium">{name}</Txt>
        <WishButton size={18} />
      </Title>
      <TagFrame>
        <Txt typography="BodySmall" color={color.Green[500]}>
          #{bigtype}
        </Txt>
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
const BigImg = styled.Image`
  width: 180px;
  height: 180px;
  background-color: ${color.Gray[100]};
  border-radius: 8px;
  object-fit: cover;
`;
const RecipeFrame = styled.View``;
