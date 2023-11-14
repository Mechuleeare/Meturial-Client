import {useState} from 'react';
import {View} from 'react-native';
import {Bookmark, Bookmark_filled} from '../assets';
import {color} from '../style/color';

const WishButton = ({size = 24}: {size?: number}) => {
  const [isWish, setIsWish] = useState<boolean>(false);

  const wishClick = async () => {
    console.log('대충 api 코드');
  };

  return (
    <View
      onTouchEnd={e => {
        e.stopPropagation();
        setIsWish(v => !v);
        wishClick();
      }}>
      {isWish ? (
        <Bookmark_filled size={size} color={color.Green[500]} />
      ) : (
        <Bookmark size={size} />
      )}
    </View>
  );
};

export default WishButton;
