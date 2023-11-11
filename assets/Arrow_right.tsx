import {Svg, Path} from 'react-native-svg';

export const Arrow_right = ({color = '#000'}: {color?: string}) => {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <Path
        d="M6.47 4L5.53 4.94L8.58333 8L5.53 11.06L6.47 12L10.47 8L6.47 4Z"
        fill={color}
      />
    </Svg>
  );
};
