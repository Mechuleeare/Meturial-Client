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
          <SearchInput
            placeholder="알레르기를 검색해 보세요"
            placeholderTextColor={color.Gray[400]}
          />
          <Search color={color.Gray[400]} />
        </InputFlex>
      </InputBackground>
      <Button onPress={() => navigation.navigate('Main')}>완료</Button>
    </Background>
  );
};

const Background = styled.View`
  width: 100%;
  flex: 1;
  background-color: ${color.White};
  padding: 0 16px 32px;
`;

const BackPageFlex = styled.View`
  width: 100%;
  height: 48px;
  justify-content: center;
`;

const TitleFlex = styled.View`
  display: flex;
  width: 100%;
  height: 120px;
  gap: 6px;
  margin: 16px 0 36px;
`;

const InputBackground = styled.View`
  display: flex;
  width: 100%;
  flex: 1;
`;

const InputFlex = styled.View`
  background-color: ${color.Gray[50]};
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding: 0 8px;
  border-radius: 8px;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  line-height: 24px;
`;
