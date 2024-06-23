import {StyleSheet} from 'react-native';
import colors from '../../common/colors';

const style = (width, height, isPortrait) => StyleSheet.create({
    logInBgImg: {width: '100%', height: 150},
    mainContainer: {
        marginTop: -25,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: '#fff',
      },
      logInLogo: {
        width: 250,
        height: 150,
        resizeMode: 'contain',
        alignSelf: 'center',
      },
      logInText: {
        fontFamily: 'Lato-Bold',
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 15,
        color: colors.black,
      },
      icon: {width: 25, height: 25, resizeMode: 'contain'},
});

export default style;
