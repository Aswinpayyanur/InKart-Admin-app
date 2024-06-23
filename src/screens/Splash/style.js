import {StyleSheet} from 'react-native';
import colors from '../../common/colors';

const style = (width, height, isPortrait) => StyleSheet.create({
    splashContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
      },
      logo: {
        width: 250,
        height: 150,
        resizeMode: 'contain',
        alignSelf: 'center',
      }
});

export default style;
