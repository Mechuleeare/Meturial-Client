import {useState} from 'react';
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

  const wishClick = async () => {
    const Token = await AsyncStorage.getItem('AccessToken');
    if (isWish === false) {
      try {
        const result = await axios.post(`${BaseUrl}/choice/${recipeId}`, {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        });
        console.log(result.data);
        setIsWish(!isWish);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const result = await axios.delete(`${BaseUrl}/choice/${recipeId}`, {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        });
        console.log(result.data);
        setIsWish(!isWish);
      } catch (error) {
        console.log(error);
      }
    }
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
