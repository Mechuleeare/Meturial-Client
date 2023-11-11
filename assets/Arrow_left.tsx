import {Svg, Path} from 'react-native-svg';

export const Arrow_left = ({color = '#000'}: {color?: string}) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill={color}>
      <Path
        d="M15.7049 7.41L14.2949 6L8.29492 12L14.2949 18L15.7049 16.59L11.1249 12L15.7049 7.41Z"
        fill="black"
      />
    </Svg>
  );
};
