import {Svg, G, Path, Defs, ClipPath, Rect} from 'react-native-svg';

export const Star_filled = ({
  color = '#000',
  size = 24,
}: {
  color?: string;
  size?: number;
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <G clip-path="url(#clip0_676_996)">
        <Path
          d="M8 11.5134L10.7667 13.1867C11.2733 13.4934 11.8933 13.04 11.76 12.4667L11.0267 9.32005L13.4733 7.20005C13.92 6.81338 13.68 6.08005 13.0933 6.03338L9.87334 5.76005L8.61334 2.78671C8.38667 2.24671 7.61334 2.24671 7.38667 2.78671L6.12667 5.75338L2.90667 6.02671C2.32 6.07338 2.08 6.80671 2.52667 7.19338L4.97334 9.31338L4.24 12.46C4.10667 13.0334 4.72667 13.4867 5.23334 13.18L8 11.5134Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_676_996">
          <Rect width="16" height="16" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
