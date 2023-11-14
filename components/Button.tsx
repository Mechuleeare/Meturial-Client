import styled from 'styled-components/native';
import {color} from '../style/color';
import {ReactNode} from 'react';
import Txt from './Txt';

const ButtonStatus: {
  [key: string]: {
    bgColor: string;
    click: string;
    color: string;
    border?: string;
  };
} = {
  primary: {
    bgColor: color.Green.Point,
    click: color.Green['600'],
    color: color.White,
  },
  primary2: {
    bgColor: color.Green['50'],
    click: color.Green['200'],
    color: color.Green.Point,
  },
  silver: {
    bgColor: color.Gray['50'],
    click: color.Gray['200'],
    color: color.Gray['800'],
  },
  white: {
    bgColor: color.White,
    click: color.Gray['50'],
    color: color.Gray['700'],
  },
  red: {
    bgColor: color.Red.Point,
    click: color.Red['600'],
    color: color.Red['50'],
  },
  red2: {
    bgColor: color.Red['50'],
    click: color.Red['200'],
    color: color.Red.Point,
  },
  outline: {
    bgColor: color.White,
    click: color.Gray['50'],
    color: color.Gray['700'],
    border: `solid 1px ${color.Gray['700']}`,
  },
};

interface ButtonProps {
  status?: keyof typeof ButtonStatus;
  children: ReactNode;
  icon?: ReactNode;
  onPress?: () => void;
}

const Button = ({
  status = 'primary',
  children,
  onPress,
  icon,
  ...props
}: ButtonProps) => {
  return (
    <ButtonBorder
      style={({pressed}: any) =>
        pressed && {backgroundColor: ButtonStatus[status].click}
      }
      status={status}
      onPress={onPress}
      {...props}>
      {icon}
      <Txt typography="LabelLarge" style={{color: ButtonStatus[status].color}}>
        {children}
      </Txt>
    </ButtonBorder>
  );
};

export default Button;

const ButtonBorder = styled.Pressable<{status: keyof typeof ButtonStatus}>`
  height: 48px;
  width: fit-content;
  padding: 0 18px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: ${props => ButtonStatus[props.status].bgColor};
  border: ${props => ButtonStatus[props.status]?.border || 'none'};
  gap: 8px;
`;
