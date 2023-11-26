import {styled} from 'styled-components/native';
import {color} from '../style/color';

type color = 'BREAKFAST' | 'LUNCH' | 'DINNER';

interface DotType {
  DotColor: color;
}

export const Dot = styled.View<DotType>`
  width: 8px;
  height: 8px;
  border-radius: 99px;
  background-color: ${props =>
    props.DotColor === 'BREAKFAST'
      ? color.Green[200]
      : props.DotColor === 'LUNCH'
      ? color.Green[400]
      : props.DotColor === 'DINNER'
      ? color.Green[600]
      : null};
`;
