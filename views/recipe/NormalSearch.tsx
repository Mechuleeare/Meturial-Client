import styled from 'styled-components/native';
import {color} from '../../style/color';
import {Arrow_back, Search} from '../../assets';
import {Pressable} from 'react-native';

const NormalSearch = ({navigation}: any) => {
  return (
    <Frame>
      <TopBar>
        <Pressable onPress={() => navigation.goBack()}>
          <Arrow_back />
        </Pressable>
        <InputBox>
          <Input
            placeholder="레시피 검색..."
            placeholderTextColor={color.Gray[400]}
            autoFocus
          />
          <Search color={color.Gray[400]} />
        </InputBox>
      </TopBar>
    </Frame>
  );
};

export default NormalSearch;

const Input = styled.TextInput`
  font-size: 16px;
  line-height: 24px;
  flex: 1;
`;
const InputBox = styled.View`
  flex: 1;
  border-radius: 8px;
  background-color: ${color.Gray[50]};
  padding: 0 8px;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;
const TopBar = styled.View`
  width: 100%;
  padding: 6px 16px;
  align-items: center;
  flex-direction: row;
  gap: 12px;
`;
const Frame = styled.View`
  width: 100%;
  flex: 1;
  background-color: white;
`;
