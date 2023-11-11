import {Image, Pressable} from 'react-native';
import {styled} from 'styled-components/native';
import {color} from '../../style/color';
import {AllergyTitle, BackArrow, Search} from '../../assets';
import Txt from '../../components/Txt';
import Button from '../../components/Button';

export const Allergy = ({navigation}: any) => {
  return (
    <Background>
      <BackPageFlex>
        <Pressable onPress={() => navigation.goBack(null)}>
          <Image source={BackArrow} />
        </Pressable>
      </BackPageFlex>
      <TitleFlex>
        <Image source={AllergyTitle} />
        <Txt typography="TitleSmall">알레르기가 있는 음식을 알려드릴게요</Txt>
      </TitleFlex>
      <InputBackground>
        <InputFlex>
          <SearchInput placeholder="알레르기를 검색해 보세요" />
          <SearchIcon source={Search} />
        </InputFlex>
      </InputBackground>
      <Button onPress={() => navigation.navigate('Main')}>완료</Button>
    </Background>
  );
};

const Background = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${color.White};
  padding: 32px 16px;
`;

const BackPageFlex = styled.View`
  width: 100%;
  height: 48px;
`;

const TitleFlex = styled.View`
  display: flex;
  width: 100%;
  height: 120px;
  gap: 6px;
`;

const InputBackground = styled.View`
  display: flex;
  width: 100%;
  height: 70%;
`;

const InputFlex = styled.View`
  position: relative;
  margin-top: 5%;
`;

const SearchInput = styled.TextInput`
  width: 100%;
  height: 48px;
  background-color: ${color.Gray[50]};

  padding: 12px 8px;
`;

const SearchIcon = styled.Image`
  position: absolute;
  top: 12px;
  right: 8px;
`;
