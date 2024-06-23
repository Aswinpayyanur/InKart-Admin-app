import {StyleSheet} from 'react-native';
import colors from '../../common/colors';

const style = (width, height, isPortrait) => StyleSheet.create({
    mainContainer: {padding: 15, paddingBottom: 100},
    actionSheetView: {padding: 15},
    categoriesView: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor: colors.black_level_3,
        borderBottomWidth: StyleSheet.hairlineWidth,
        padding: 15,
      },
      selectText: {
        color: colors.primary_green,
        fontFamily: 'Lato-Bold',
        fontSize: 20,
      },
      closeIcon:{alignSelf: 'flex-end'},
      camView: {
        paddingBottom: 20,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      },
      camInnerView: {justifyContent: 'center', alignItems: 'center'},
      camText: {
        color: colors.black_level_3,
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        lineHeight: 30,
      },
      uploadView: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        marginVertical: 10,
        borderColor: colors.primary_green,
        borderWidth: 1,
        borderRadius: 8,
      },
      uploadText: {
        color: colors.black_level_2,
        fontSize: 16,
        fontFamily: 'Lato-Regular',
        lineHeight: 55,
      },
      closeIconView: {
        position: 'absolute',
        right: 0,
        top: -10,
        zIndex: 9,
        backgroundColor: colors.white_level_3,
        borderRadius: 25,
        overflow: 'hidden',
      },
      imageIcon: {width: 100, height: 100, resizeMode: 'contain'},
});

export default style;
