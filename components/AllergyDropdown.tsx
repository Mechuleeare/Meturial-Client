import styled from 'styled-components/native';
import {color} from '../style/color';
import Txt from './Txt';
import {Arrow_down, Arrow_up, Close} from '../assets';
import {useEffect, useState} from 'react';
import {AllergyList} from '../utils';
import {Pressable} from 'react-native';

const AllergyDropdown = ({
  setAllergy,
  allergy,
}: {
  setAllergy: React.Dispatch<React.SetStateAction<string[]>>;
  allergy: string[];
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dropAllergy, setDropAllergy] = useState<string[]>(AllergyList);

  // 선택한 알레르기를 Dropdown에서 제외
  useEffect(() => {
    setDropAllergy(dropAllergy.filter(v => !allergy.includes(v)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allergy]);

  return (
    <Frame>
      <DropFrame>
        <DropDown onPress={() => setIsOpen(v => !v)}>
          <Txt typography="BodyLarge">알레르기 선택</Txt>
          {isOpen ? <Arrow_up /> : <Arrow_down />}
        </DropDown>
        {isOpen && (
          <DropBox>
            {dropAllergy.map(v => (
              <DropItem
                key={v}
                style={({pressed}: any) =>
                  pressed && {backgroundColor: color.Gray[100]}
                }
                onPress={() => {
                  setIsOpen(false);
                  setAllergy(allergy ? [...allergy, v] : [v]);
                }}>
                <Txt>{v}</Txt>
              </DropItem>
            ))}
          </DropBox>
        )}
      </DropFrame>
      {allergy &&
        allergy?.map(v => (
          <Item key={v}>
            <Txt typography="LabelMedium" color={color.Green[600]}>
              {v}
            </Txt>
            <Pressable
              onPress={() => setAllergy(allergy.filter(value => value !== v))}>
              <Close size={16} color={color.Green[600]} />
            </Pressable>
          </Item>
        ))}
    </Frame>
  );
};

export default AllergyDropdown;

const DropItem = styled.Pressable`
  width: 100%;
  height: 42px;
  justify-content: center;
  background-color: ${color.Gray[50]};
  padding: 0 6px;
  border-radius: 8px;
`;
const DropBox = styled.View`
  padding: 4px;
  background-color: ${color.Gray[50]};
  border-radius: 12px;
  position: absolute;
  width: 100%;
  top: 58px;
`;
const DropDown = styled.Pressable`
  width: 100%;
  height: 48px;
  border-radius: 8px;
  background-color: ${color.Gray[50]};
  padding: 0 8px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const DropFrame = styled.View`
  position: relative;
  z-index: 2;
  padding: 0 0 8px;
`;
const Item = styled.View`
  background-color: ${color.Green[50]};
  padding: 0 12px;
  height: 40px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
`;
const Frame = styled.View`
  width: 100%;
  flex: 1;
  gap: 8px;
  padding: 0 16px;
`;
