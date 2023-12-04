import {Svg, Path} from 'react-native-svg';

export const Add = ({
  color = '#000000',
  size = 24,
}: {
  color?: string;
  size?: number;
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M16.6667 10.8335H10.8334V16.6668H9.16671V10.8335H3.33337V9.16683H9.16671V3.3335H10.8334V9.16683H16.6667V10.8335Z"
        fill={color}
      />
    </Svg>
  );
};
