import {Svg, Path} from 'react-native-svg';

export const Creation = ({
  color = '#000',
  size = 24,
}: {
  color?: string;
  size?: number;
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 1L17.74 3.75L15 5L17.74 6.26L19 9L20.25 6.26L23 5L20.25 3.75M9 4L6.5 9.5L1 12L6.5 14.5L9 20L11.5 14.5L17 12L11.5 9.5M19 15L17.74 17.74L15 19L17.74 20.25L19 23L20.25 20.25L23 19L20.25 17.74"
        fill={color}
      />
    </Svg>
  );
};
