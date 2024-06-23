import {View, Text, Image} from 'react-native';
import React from 'react';
import colors from '../../common/colors';
import { useDimensionContext } from '../../context';
import style from './style';

const Splash = () => {

  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  return (
    <View
      style={responsiveStyle.splashContainer}>
      <Image
        source={require('../../assets/images/logo-icon.png')}
        style={responsiveStyle.logo}
      />
    </View>
  );
};

export default Splash;
