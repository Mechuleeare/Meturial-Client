import styled from 'styled-components/native';
import BackHeader from '../../components/BackHeader';
import {useState} from 'react';
import AllergyDropdown from '../../components/AllergyDropdown';
import Button from '../../components/Button';

const MyAllergy = ({navigation, route}: any) => {
  const [allergy, setAllergy] = useState<string[]>(route.params.allergy);
  console.log(allergy);
  return (
    <Frame>
      <BackHeader name="알레르기 관리" nav={navigation} />
      <AllergyDropdown setAllergy={setAllergy} allergy={allergy} />
      <BtnFrame>
        <Button>수정하기</Button>
      </BtnFrame>
    </Frame>
  );
};

export default MyAllergy;

const BtnFrame = styled.View`
  width: 100%;
  padding: 0 16px 32px;
`;
const Frame = styled.View`
  width: 100%;
  flex: 1;
  background-color: white;
  gap: 24px;
`;
