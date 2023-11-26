import {styled} from 'styled-components/native';
import {color} from '../../style/color';
import Txt from '../../components/Txt';
import {Pencil, ProfileImg} from '../../assets';
import Button from '../../components/Button';
import ReviewPreview from '../../components/ReviewPreview';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {BaseUrl} from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import BackHeader from '../../components/BackHeader';

interface RecipeType {
  content: string;
  createdAt: string;
  recipeName: string;
  reviewId: string;
  reviewImageUrl: string;
  starRating: number;
}

interface InformaionType {
  profileImageUrl: string;
  name: string;
  email: string;
}

export const My = ({navigation}: any) => {
  const [recipe, setRecipe] = useState<RecipeType[]>([]);
  const [recipeCount, setRecipeCount] = useState<string>();
  const [information, setInformaion] = useState<InformaionType>();
  const [allergyData, setAllergyData] = useState<string[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function AxiosMyRecipeApi() {
      const Token = await AsyncStorage.getItem('AccessToken');
      try {
        const result = await axios.get(`${BaseUrl}/review/my`, {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        });
        const recipeData = result.data.myReviewList;
        const sliceData = recipeData.slice(0, 3);
        setRecipe(sliceData);
        setRecipeCount(result.data.myReviewCount);
      } catch (error) {
        console.log(error);
      }
    }

    async function AxiosMyInformation() {
      const Token = await AsyncStorage.getItem('AccessToken');
      try {
        const result = await axios.get(`${BaseUrl}/user/my-page`, {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        });
        setInformaion(result.data);
        const all = result.data;
        const AllergySplit = all.allergyInfo.split(',');
        setAllergyData(AllergySplit);
      } catch (error) {
        console.log(error);
      }
    }

    AxiosMyInformation();
    AxiosMyRecipeApi();
  }, [isFocused]);

  return (
    <Background>
      <BackHeader name="마이페이지" />
      <ScrollView>
        <Information>
          <Profile
            source={
              information
                ? {
                    uri: information.profileImageUrl,
                  }
                : ProfileImg
            }
          />
          <Margin>
            <Txt typography="TitleLarge">{information?.name}</Txt>
            <Txt typography="BodyMedium" color={color.Gray[600]}>
              {information?.email}
            </Txt>
          </Margin>
          <Button
            status="outline"
            icon={<Pencil size={20} />}
            onPress={() =>
              navigation.navigate('MyFixed', {
                ImgUrl: information?.profileImageUrl,
                name: information?.name,
              })
            }>
            내정보 수정하기
          </Button>
        </Information>
        {allergyData[0] && (
          <AllergyInfromation>
            <Txt typography="TitleMedium">알레르기</Txt>
            <AllergyFlex>
              {allergyData.map(v => (
                <Allergy>
                  <Txt typography="LabelSmall">{v}</Txt>
                </Allergy>
              ))}
            </AllergyFlex>
          </AllergyInfromation>
        )}
        <MyReview>
          <ReviewTitle>
            <Txt typography="TitleMedium">내가 작성한 후기</Txt>
            <Txt typography="TitleMedium" color={color.Green.Point}>
              {recipeCount}
            </Txt>
          </ReviewTitle>
          <ReviewFlex>
            {recipe.map(v => (
              <ReviewPreview
                key={v.reviewId}
                name={v.recipeName}
                starRating={v.starRating}
                content={v.content}
                reviewImageUrl={v.reviewImageUrl}
                createdAt={v.createdAt}
                onTouch={() =>
                  navigation.navigate('Review', {
                    data: v.reviewId,
                  })
                }
              />
            ))}
          </ReviewFlex>
          <Button
            status="outline"
            onPress={() => navigation.navigate('MyReviewList')}>
            내가 작성한 후기 모두 보기
          </Button>
        </MyReview>
      </ScrollView>
    </Background>
  );
};

const Background = styled.View`
  width: 100%;
  height: 100%;
`;

const ScrollView = styled.ScrollView`
  width: 100%;
  flex: 1;
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
  width: 100%;
  flex: 1;
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
  margin-bottom: 24px;
  gap: 18px;
`;
