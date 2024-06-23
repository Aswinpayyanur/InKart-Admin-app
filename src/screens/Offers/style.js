import {StyleSheet} from 'react-native';
import colors from '../../common/colors';


const style = (width, height, isPortrait) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
    },
    container: {
      backgroundColor: colors.white_level_2,
    },
    flatList: {
      alignSelf: 'center',
      marginVertical: height * 0.015,
    },
    renderView: {
      flexDirection: 'row',
      alignItems: 'center',
      width: width,
      alignSelf: 'center',
      justifyContent: 'center',
      marginBottom: height * 0.015,
    },
    offCircleView: {marginRight: (-height * 0.025) / 2, zIndex: 99},
    circle: {
      width: 25,
      height: 25,
      borderRadius: 25 / 2,
      backgroundColor: colors.white_level_2,
    },
    circleCenterView: {
      justifyContent: 'space-between',
      height: 100,
      backgroundColor: colors.light_green,
    },
    circleCenter: {
      width: 25,
      height: 25,
      borderRadius: 25 / 2,
      backgroundColor: colors.white_level_2,
    },
    offCodeMainView: {
      width: '25%',
      height: 100,
      backgroundColor: colors.light_green,
      paddingRight: 15,
      paddingVertical: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    offCodeText: {
      fontFamily: 'Lato-Regular',
      color: colors.black_level_3,
      fontSize: 14,
    },
    offCodeView: {
      marginVertical: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 15,
      backgroundColor: colors.primary_green,
      overflow: 'hidden',
    },
    offCode: {
      fontFamily: 'Lato-Regular',
      color: colors.white,
      textAlign: 'center',
    },
  });

export default style;
