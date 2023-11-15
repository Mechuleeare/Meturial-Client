import {styled} from 'styled-components/native';
import {color} from '../../style/color';
import Txt from '../../components/Txt';
import {Image} from 'react-native';
import {Gear, Pencil} from '../../assets';
import Button from '../../components/Button';
import ReviewPreview from '../../components/ReviewPreview';

export const My = () => {
  return (
    <Background>
      <Header>
        <Txt typography="TitleMedium">마이페이지</Txt>
        <Image source={Gear} />
      </Header>
      <Line />
      <Information>
        <Profile
          source={{
            uri: 'https://s3.ap-northeast-2.amazonaws.com/meturial-bucket/08efe72f-e897-4a63-b202-1cc012d85a91test%201.jpg',
          }}
        />
        <Margin>
          <Txt typography="TitleLarge">최승우</Txt>
          <Txt typography="BodyMedium" color={color.Gray[600]}>
            wjknn3123@gmail.com
          </Txt>
        </Margin>
        <Button status="outline" icon={<Pencil size={20} />}>
          내정보 수정하기
        </Button>
      </Information>
      <AllergyInfromation>
        <Txt typography="TitleMedium">알레르기</Txt>
        <AllergyFlex>
          <Allergy>
            <Txt typography="LabelSmall">복숭아</Txt>
          </Allergy>
        </AllergyFlex>
      </AllergyInfromation>
      <MyReview>
        <ReviewTitle>
          <Txt typography="TitleMedium">내가 작성한 후기</Txt>
          <Txt typography="TitleMedium" color={color.Green.Point}>
            12
          </Txt>
        </ReviewTitle>
        <ReviewFlex>
          <ReviewPreview></ReviewPreview>
        </ReviewFlex>
      </MyReview>
    </Background>
  );
};

const Background = styled.View`
  width: 100%;
  height: 100%;
`;

const Header = styled.View`
  width: 100%;
  height: 48px;
  padding: 12px 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  background-color: ${color.White};
`;

const Line = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${color.Gray[100]};
`;

const Information = styled.View`
  padding: 26px 16px;
  background-color: ${color.White};
`;

const Profile = styled.Image`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 99px;
  margin-bottom: 16px;
`;

const Margin = styled.View`
  margin-bottom: 24px;
`;

const AllergyInfromation = styled.View`
  width: 100%;
  padding: 26px 16px;
  background-color: ${color.White};
  margin-top: 12px;
`;

const AllergyFlex = styled.View`
  flex-direction: row;
  gap: 4px;
  margin-top: 12px;
`;

const Allergy = styled.View`
  padding: 2px 8px;
  background-color: ${color.Gray[50]};
  border-radius: 4px;
`;

const MyReview = styled.View`
  padding: 26px 16px;
  background-color: ${color.White};
  margin-top: 12px;
`;

const ReviewTitle = styled.View`
  flex-direction: row;
  gap: 4px;
`;

const ReviewFlex = styled.View`
  margin-top: 24px;
  gap: 18px;
`;