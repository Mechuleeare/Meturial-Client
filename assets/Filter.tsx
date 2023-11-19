import {Svg, Path} from 'react-native-svg';

export const Filter = ({
  color = '#000',
  size = 24,
}: {
  color?: string;
  size?: number;
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M6 13H18V11H6M3 6V8H21V6M10 18H14V16H10V18Z" fill={color} />
    </Svg>
  );
};
