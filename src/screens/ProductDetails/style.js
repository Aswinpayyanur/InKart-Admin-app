import {StyleSheet} from 'react-native';
import colors from '../../common/colors';


const style = (width, height, isPortrait) =>
  StyleSheet.create({
    descriptionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    descriptionHead: {
      fontFamily: 'Lato-Bold',
      fontSize: 20,
      color: colors.black,
      marginVertical: 10,
    },
    description: {
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      color: colors.gray,
    },
    scrollViewContainer: {flex: 1},
    innerView: {padding: 15},
    image: {width: '100%', height: 200, resizeMode: 'contain'},
    contentView: {flex: 1, backgroundColor: colors.white, padding: 15},
    mainHead: {
      fontFamily: 'Lato-Black',
      color: colors.black,
      fontSize: 22,
      lineHeight: 45,
    },
    price: {
      fontFamily: 'Lato-Regular',
      color: colors.black,
      fontSize: 18,
    },
    productDetailsView: {
      borderBottomWidth: 1,
      borderBlockColor: colors.gray,
      paddingVertical: 20,
    },
    off: {
      fontFamily: 'Lato-Regular',
      color: colors.primary_green,
      fontSize: 18,
    },
    commonText: {
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      color: colors.shadow,
      lineHeight: 25,
    },
    deliveryHead: {
      fontFamily: 'Lato-Bold',
      fontSize: 18,
      color: colors.black_level_3,
      marginBottom: 8,
    },
    commonText: {
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: colors.shadow,
        lineHeight: 25,
      },
      deliveryHead: {
        fontFamily: 'Lato-Bold',
        fontSize: 18,
        color: colors.black_level_3,
        marginVertical: 20,
      },
  });

export default style;
