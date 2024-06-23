import {StyleSheet} from 'react-native';
import colors from '../../common/colors';

const style = (width, height, isPortrait) =>
  StyleSheet.create({
    headerDrawerImage: {
      width: 45,
      height: 45,
      resizeMode: 'contain',
      marginRight: 10,
    },
    headerLogoImage: {
      width: 150,
      height: 45,
      resizeMode: 'contain',
      marginRight: 10,
    },
    mainContainer: {flex: 1, padding: 15},
    itemContainer: {
      width: '95%',
      height: isPortrait ? height * 0.2 : height * 0.25,
      borderRadius: 15,
      alignSelf: 'center',
      padding: 15,
      backgroundColor: colors.category_1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginVertical: 8,
    },
    itemImage: {width: 110, height: 110, resizeMode: 'contain'},
    textContainer: {marginLeft: 15},
    count: {
        fontFamily: 'Lato-Bold',
        fontSize: 32,
        color: colors.black_level_3,
      },
      textHead: {
        fontFamily: 'Lato-Regular',
        fontSize: 18,
        color: colors.black_level_3,
      }
  });

export default style;
