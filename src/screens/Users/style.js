import {StyleSheet} from 'react-native';
import colors from '../../common/colors';

const style = (width, height, isPortrait) =>
  StyleSheet.create({
    searchIcon: {width: 25, height: 25, resizeMode: 'contain'},
    blockContainer: {
      padding: 4,
      borderRadius: 8,
      borderWidth: 1,
      position: 'absolute',
      top: 15,
      right: 15,
      width: 68,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    blockText: {
      fontWeight: 'bold',
      fontSize: 15,

      lineHeight: 35,
    },
    mainContainer: {flex: 1, margin: 15},
    userContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginVertical: 8,
      padding: 10,
      width: '95%',
      backgroundColor: colors.light_gray_2,
      alignSelf: 'center',
      borderRadius: 15,
    },
    userImage: {
      width: 80,
      height: 80,
      resizeMode: 'contain',
      borderRadius: 40,
      overflow: 'hidden',
    },
    textContainer: {marginLeft: 10},
    userName: {
      fontSize: 18,
      color: colors.black_level_2,
    },
    email: {
      fontSize: 16,
      color: 'red',
    },
    phone: {
      fontSize: 16,
      color: colors.black_level_3,
    },
  });

export default style;
