import {styled} from 'styled-components/native';
import WishButton from './WishButton';
import Txt from './Txt';
import {Star_filled} from '../assets';
import {color} from '../style/color';

interface WishPreviewProps {
  choiceId: string;
  recipeId: string;
  name: string;
  starRating: number;
  starCount: number;
  recipeImageUrl: string;
  recipeCategory: string;
  navigation?: any;
  wishState: boolean;
}

export const WishPreview = ({
  choiceId,
  recipeId,
  name,
  starRating,
  starCount,
  recipeImageUrl,
  recipeCategory,
  navigation,
  wishState,
}: WishPreviewProps) => {
  return (
    <Background
      onPress={() => navigation.navigate('DetailRecipe', {recipeId: recipeId})}>
      <WishImg
        source={{
          uri: recipeImageUrl,
        }}
        borderRadius={4}
      />
      <Center>
        <Top>
          <Txt typography="TitleMedium">{name}</Txt>
          <StartFlex>
            <Star_filled size={16} color={color.Yellow.Point} />
            <Txt>{starRating}</Txt>
          </StartFlex>
        </Top>
        <Txt typography="LabelSmall" color={color.Gray[300]}>
          {starCount}명의 후기
        </Txt>
        <Bottom>
          <Txt typography="BodySmall" color={color.Green.Point}>
            {recipeCategory}
          </Txt>
        </Bottom>
      </Center>
      <WishPosition>
        <WishButton
          size={18}
          recipeId={recipeId}
          choiceId={choiceId}
          wishState={wishState}
        />
      </WishPosition>
    </Background>
  );
};

const Background = styled.Pressable`
  width: 100%;
  height: 70px;
  flex-direction: row;
  gap: 12px;
  position: relative;
  margin-bottom: 18px;
`;

const WishImg = styled.Image`
  width: 70px;
  height: 70px;
  object-fit: cover;
`;

const Center = styled.View`
  width: 216px;
  height: 70px;
`;

const Top = styled.View`
  flex-direction: row;
  gap: 12px;
  height: 24px;
  align-items: center;
`;

const StartFlex = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Bottom = styled.View`
  margin-top: 8px;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const WishPosition = styled.View`
  position: absolute;
  top: 0;
  right: 0;
`;
