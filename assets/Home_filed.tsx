import {Svg, Path, Defs, ClipPath, Rect, G} from 'react-native-svg';

export const Home_filled = ({color = '#000'}: {color?: string}) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#clip0_290_947)">
        <Path
          d="M10 20V14H14V20H19V12H20.9576C21.3242 12 21.4977 11.5479 21.2252 11.3027L12 3L2.7748 11.3027C2.50231 11.5479 2.67579 12 3.04238 12H5V20H10Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_290_947">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
