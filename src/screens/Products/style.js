import {StyleSheet} from 'react-native';
import colors from '../../common/colors';

const style = (width, height, isPortrait) => StyleSheet.create({
    searchIconStyle: {width: 25, height: 25, resizeMode: 'contain'},
    mainContainer: {paddingBottom: 50, flex: 1, margin: 15, marginTop: 0},
    subContainer: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.primary_green,
        marginVertical: 8,
        borderRadius: 15,
        width: '48%',
        height: height * 0.32,
        alignSelf: 'center',
        overflow: 'hidden',
      },
      iconView: {
        position: 'absolute',
        top: 10,
        right: 5,
        zIndex: 9,
        flexDirection: 'row',
        alignItems: 'center',
      },
      innerView: {
        alignSelf: 'center',
        width: '95%',
        height: height * 0.15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginVertical: 5,
      },
      image: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        overflow: 'hidden',
      },
      textContainer: {marginLeft: 10, overflow: 'hidden', width: '75%'},
      itemHead: {
        fontFamily: 'Lato-Bold',
        fontSize: 20,
        color: colors.primary_green,
        lineHeight: 35,
      },
      description: {
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: colors.black_level_1,
      },
      price: {
        fontFamily: 'Lato-Bold',
        fontSize: 18,
        color: colors.black_level_3,
        lineHeight: 35,
      },
});

export default style;
