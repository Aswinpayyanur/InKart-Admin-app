import { StyleSheet } from "react-native";
import colors from "../../common/colors";


const style = (width, height, isPortrait) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white_level_2,
      padding: 20,
    },
    head: {
      fontFamily: 'Lato-Bold',
      fontSize: 25,
      textAlign: 'center',
      color: colors.black,
    },
    userImageView: {
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 25,
    },
    userImage: {
      width: width * 0.3,
      height: width * 0.3,
      borderRadius: width * 0.15,
  
    },
    bigImage: {
      width: width * 0.6,
      height: width * 0.6,
    },
    editTouch: {
      position: 'absolute',
      right: 0,
      bottom: 0,
    },
    edit: {
      width: 40,
      height: 40,
      resizeMode: 'contain',
    },
    modalBg: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.7)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    close: {
        backgroundColor: colors.white,
        borderRadius: 25,
        zIndex: 9,
        position: 'absolute',
        right: width * 0.18,
        top: height * 0.31
    },
    selectBox:{
        backgroundColor: colors.white_level_2,
        padding: 22,
        borderRadius: 15,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    touch: {
        padding: 15,
        justifyContent: 'center',
        backgroundColor: colors.primary_green,
        borderRadius: 15,
        marginHorizontal: 10,
    },
    pickText: {
        fontFamily: 'Lato-Regular',
        fontSize: 18,
        color: colors.white,
    },
    closeChoose: {
        backgroundColor: colors.white,
        borderRadius: 25,
        zIndex: 9,
        position: 'absolute',
        right: -8,
        top: -8
    },
    passwordContainer: {
      width: '100%',
      height: 60,
      borderWidth: 1,
      borderColor: colors.primary_green,
      borderRadius: 8,
      marginVertical: 10,
      backgroundColor: colors.white_level_3,
      justifyContent: 'center',
      paddingLeft: 15,
    },
    passwordText: {
      fontSize: 16,
      fontFamily: 'Lato-Regular',
      color: colors.black_level_2,
    },
  });

export default style;
