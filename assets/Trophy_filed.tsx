import {Svg, Path, Defs, ClipPath, Rect, G} from 'react-native-svg';

export const Trophy_filled = ({color = '#000'}: {color?: string}) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#clip0_290_998)">
        <Path
          d="M19 5H17V4C17 3.45 16.55 3 16 3H8C7.45 3 7 3.45 7 4V5H5C3.9 5 3 5.9 3 7V8C3 10.55 4.92 12.63 7.39 12.94C8.02 14.44 9.37 15.57 11 15.9V19H8C7.45 19 7 19.45 7 20C7 20.55 7.45 21 8 21H16C16.55 21 17 20.55 17 20C17 19.45 16.55 19 16 19H13V15.9C14.63 15.57 15.98 14.44 16.61 12.94C19.08 12.63 21 10.55 21 8V7C21 5.9 20.1 5 19 5ZM5 8V7H7V10.82C5.84 10.4 5 9.3 5 8ZM19 8C19 9.3 18.16 10.4 17 10.82V7H19V8Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_290_998">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
