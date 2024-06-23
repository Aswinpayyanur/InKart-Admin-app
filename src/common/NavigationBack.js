import {Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React from 'react';

const NavigationBack = () => {
    const navigation = useNavigation()
  return (
  
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require('../assets/images/left-arrow.png')}
          style={{
            width: 35,
            height: 35,
            resizeMode: 'contain',
            marginRight: 10,
          }}
        />
      </TouchableOpacity>
   
  );
};

export default NavigationBack;
