import {Svg, Path} from 'react-native-svg';

export const Bookmark = ({
  color = '#000',
  size = 24,
}: {
  color?: string;
  size?: number;
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 3H17C18.1 3 19 3.9 19 5V21L12 18L5 21V5C5 3.9 5.9 3 7 3ZM12 15.82L17 18V5H7V18L12 15.82Z"
        fill={color}
      />
    </Svg>
  );
};
