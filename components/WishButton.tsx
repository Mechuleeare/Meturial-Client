import {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Bookmark, Bookmark_filled} from '../assets';
import {color} from '../style/color';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BaseUrl} from '../utils';

interface WishButtonProps {
  size?: number;
  recipeId?: string;
  wishState?: boolean;
}

const WishButton = ({
  size = 24,
  recipeId,
  wishState = false,
}: WishButtonProps) => {
  const [isWish, setIsWish] = useState<boolean>(wishState);

  useEffect(() => {
    setIsWish(wishState);
  }, [wishState]);

  const wishClick = async () => {
    const Token = await AsyncStorage.getItem('AccessToken');
    if (isWish === false) {
      await axios({
        method: 'POST',
        url: `${BaseUrl}/choice/${recipeId}`,
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
        .then(() => setIsWish(v => !v))
        .catch(err => console.log(err));
    } else {
      await axios({
        method: 'DELETE',
        url: `${BaseUrl}/choice/${recipeId}`,
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
        .then(() => setIsWish(v => !v))
        .catch(err => console.log(err));
    }
  };

  return (
    <View
      onTouchEnd={e => {
        e.stopPropagation();
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
