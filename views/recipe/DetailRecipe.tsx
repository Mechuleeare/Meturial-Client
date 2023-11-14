import styled from 'styled-components/native';
import {color} from '../../style/color';
import BackHeader from '../../components/BackHeader';
import Txt from '../../components/Txt';
import Line from '../../components/Line';
import {Bookmark, File_upload, Pencil, Star_filled} from '../../assets';
import UnderTxt from '../../components/UnderTxt';
import Button from '../../components/Button';
import ReviewPreview from '../../components/ReviewPreview';

interface sequence {
  sequenceId: string;
  sequence: number;
  content: string;
  recipeId: string;
}

interface dataType {
  recipeId: string;
  name: string;
  starRating: 4.8;
  starCount: 24;
  recipeImageUrl: string;
  recipeCategory: string[];
  recipeMaterial: string[];
  recipeTip: string;
  recipeSequence: sequence[];
}

const DetailRecipe = ({route, navigation}: any) => {
  const {recipe} = route.params;

  const data: dataType = {
    recipeId: 'a',
    name: '하와이안 피자',
    starRating: 4.8,
    starCount: 24,
    recipeImageUrl:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    recipeCategory: ['양식', '피자'],
    recipeMaterial: ['밀가루', '모짜렐라 치즈', '양파', '파인애플'],
    recipeTip: '하와이안 피자를 만들 때는 ~~',
    recipeSequence: [
      {
        sequenceId: '1',
        sequence: 1,
        content: '밀가루 반죽을 한다',
        recipeId: 'a',
      },
      {
        sequenceId: '2',
        sequence: 2,
        content: '토마토 소스를 고르게 발라준다.',
        recipeId: 'a',
      },
      {
        sequenceId: '3',
        sequence: 3,
        content: '토핑을 골고루 얹어 준 후, 모짜렐라 치즈를 뿌려준다.',
        recipeId: 'a',
      },
      {
        sequenceId: '4',
        sequence: 4,
        content: '오븐을 1000°C 로 맞춘 후, 갖다 넣는다.',
        recipeId: 'a',
      },
    ],
  };

  return (
    <Frame>
      <BackHeader name={recipe} nav={navigation} />
      <Content contentContainerStyle={{paddingBottom: 120}}>
        <TitleImg source={{uri: data.recipeImageUrl}} />
        <Title>
          <Txt typography="HeadlineLarge">{data.name}</Txt>
          <Tag>
            {data.recipeCategory.map(v => (
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
              {data.starRating}
              <Txt color={color.Gray[400]}> ({data.starCount})</Txt>
            </Txt>
          </StarFrame>
          <Row>
            <Bookmark />
            <File_upload />
          </Row>
        </SubFrame>
        <Line />
        <Material>
          <Txt typography="TitleMedium">재료</Txt>
          <Txt color={color.Gray[700]}>{data.recipeMaterial.join(', ')}</Txt>
        </Material>
        <Line />
        <Column>
          <Txt typography="TitleMedium">조리 방법</Txt>
          <SequenceFrame>
            {data.recipeSequence.map((v, i) => (
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
              12
            </Txt>
          </Txt>
          <Button status="silver" icon={<Pencil size={20} />}>
            요리 후기 작성하기
          </Button>
          {[1, 2, 3].map(v => (
            <ReviewPreview
              key={v}
              onTouch={() =>
                navigation.navigate('Review', {recipe: recipe, data: v})
              }
            />
          ))}
          <Button
            status="outline"
            onPress={() => navigation.navigate('ReviewAll', {recipe: recipe})}>
            요리 후기 모두 보기
          </Button>
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
