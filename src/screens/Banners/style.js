import {StyleSheet} from 'react-native';
import colors from '../../common/colors';

const style = (width, height, isPortrait) => StyleSheet.create({
    mainView: {flex: 1},
    updateView: {padding: 15},
    updateInnerView: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor: colors.black_level_3,
        borderBottomWidth: StyleSheet.hairlineWidth,
        padding: 15,
      },
      updateHead: {
        color: colors.primary_green,
        fontFamily: 'Lato-Bold',
        fontSize: 20,
      },
      closeIcon: {alignSelf: 'flex-end'},
      inputView: {marginVertical: 20},
      imageView:{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        marginVertical: 10,
        borderColor: colors.primary_green,
        borderWidth: 1,
        borderRadius: 8,
      },
      imageText: {
        color: colors.black_level_2,
        fontSize: 16,
        fontFamily: 'Lato-Regular',
        lineHeight: 55,
      },
      imageCloseIcon: {
        position: 'absolute',
        right: 0,
        top: -10,
        zIndex: 9,
        backgroundColor: colors.white_level_3,
        borderRadius: 25,
        overflow: 'hidden',
      },
      image: {width: 100, height: 100, resizeMode: 'contain'},
      iconView: {
        paddingBottom: 10,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      },iconText: {
        color: colors.black_level_3,
        fontFamily: 'Lato-Bold',
        fontSize: 16,
      },
      flatList: {
        margin: 10,
        alignSelf: 'center',
        paddingBottom: 50,
      },
      backgroundImg: {
        width: width * 0.9,
        height: height * 0.2,
        resizeMode: 'cover',
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: 10,
        marginBottom: 5,
      },
      editIconView: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 9,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white_level_3,
        borderRadius: 8,
        padding: 8,
        zIndex: 9,
      },
      textView: {padding: 20},
      itemHead: {
        color: colors.black_level_3,
        fontSize: 20,
        fontFamily: 'Lato-Black',
      },
      itemDescription: {
        color: colors.black_level_2,
        fontSize: 16,
        fontFamily: 'Lato-Regular',
        marginTop: 8,
      },

});

export default style;
