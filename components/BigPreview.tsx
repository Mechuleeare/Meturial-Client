import {styled} from 'styled-components/native';
import Txt from './Txt';
import WishButton from './WishButton';
import {color} from '../style/color';
import {Star_filled} from '../assets';

export const BigPreview = () => {
  return (
    <Background>
      <BigImg
        source={{
          uri: 'https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        }}
      />
      <Bottom>
        <Flex>
          <Txt typography="TitleLarge">크림파스타</Txt>
          <WishButton size={20} />
        </Flex>
        <Flex>
          <Txt typography="BodySmall" color={color.Green.Point}>
            #양식
          </Txt>
        </Flex>
        <Flex>
          <Txt typography="LabelSmall" color={color.Gray[300]}>
            2048명의 후기
          </Txt>
          <StartFlex>
            <Star_filled size={16} color={color.Yellow.Point} />
            <Txt typography="BodySmall">4.4</Txt>
          </StartFlex>
        </Flex>
      </Bottom>
    </Background>
  );
};

const Background = styled.Pressable`
  width: 100%;
  gap: 8px;
`;

const BigImg = styled.Image`
  width: 100%;
  height: 328px;
  object-fit: cover;
`;

const Bottom = styled.View`
  width: 100%;
  padding: 0 8px;
  gap: 8px;
`;

const Flex = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StartFlex = styled.View`
  flex-direction: row;
  align-items: center;
`;
