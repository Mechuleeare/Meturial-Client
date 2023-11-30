import {Svg, Path} from 'react-native-svg';

export const Arrow_up = ({color = '#000'}: {color?: string}) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill={color}>
      <Path d="M7 14L12 9L17 14H7Z" fill="#939799" />
    </Svg>
  );
};
