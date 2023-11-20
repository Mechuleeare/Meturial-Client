import {styled} from 'styled-components/native';
import Txt from './Txt';
import WishButton from './WishButton';

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
      </Bottom>
    </Background>
  );
};

const Background = styled.Pressable`
  width: 100%;
`;

const BigImg = styled.Image`
  width: 100%;
  height: 328px;
  object-fit: cover;
`;

const Bottom = styled.View`
  width: 100%;
  padding: 0 8px;
`;

const Flex = styled.View`
  width: 100%;
  height: 28px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
