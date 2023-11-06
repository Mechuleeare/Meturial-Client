import {Svg, Path, Defs, ClipPath, Rect, G} from 'react-native-svg';

export const Today_filled = ({color = '#000'}: {color?: string}) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#clip0_296_1010)">
        <Path
          d="M19 3H18V2C18 1.44772 17.5523 1 17 1C16.4477 1 16 1.44772 16 2V3H8V2C8 1.44772 7.55228 1 7 1C6.44772 1 6 1.44772 6 2V3H5C3.89 3 3.01 3.9 3.01 5L3 19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19ZM7 10H12V15H7V10Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_296_1010">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
