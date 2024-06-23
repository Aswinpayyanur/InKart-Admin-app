import {StyleSheet} from 'react-native';
import colors from '../../common/colors';


const style = (width, height, isPortrait) =>
  StyleSheet.create({
    mainContainer: {flex: 1, margin: 10},
    searchIcon: {width: 25, height: 25, resizeMode: 'contain'},
    flatListContainer: {paddingBottom: 50, flex: 1},
    container: {
      flex: 1,
      backgroundColor: colors.white_level_3,
    },
    flatView: {
      backgroundColor: colors.light_green,
      borderRadius: 15,
      padding: 15,
      marginTop: 10,
      marginHorizontal: 8,
      marginBottom: 15,
      overflow: 'hidden',
    },
    innerView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomColor: colors.gray,
      borderBottomWidth: 1,
      paddingBottom: 15,
    },
    orderId: {
      fontFamily: 'Lato-Bold',
      fontSize: 16,
      color: colors.black,
    },
    orderedOn: {
      fontFamily: 'Lato-Regular',
      fontSize: isPortrait ? width * 0.032 : height * 0.032,
      color: colors.primery_green,
    },
    address: {
      fontFamily: 'Lato-Regular',
      fontSize: 14,
      color: colors.gray,
      width: width * 0.6,
    },
    paidText: {
      fontFamily: 'Lato-Regular',
      fontSize: 14,
      color: colors.black,
    },
    greenText: {
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      color: colors.primery_green,
    },
 
    map: {
      width: 100,
      height: 100,
      borderRadius: 15,
      overflow: 'hidden',
      resizeMode: 'cover',
      
    },
    bottomView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 15,
    },
    bottomText: {
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      color: colors.black_level_3,
    },
   
  });

export default style;
