import {View, Text} from 'react-native';
import React from 'react';
import colors from './colors';

const EmptyData = () => {
  return (
    <View
      style={{
        backgroundColor: colors.light_gray_2,
        marginVertical: 8,
        borderRadius: 15,
        width: '95%',
        alignSelf: 'center',
        padding: 10,
      }}>
      <Text style={{
                fontFamily: 'Lato-Bold',
                fontSize: 20,
                color: colors.black_level_3,
                lineHeight: 35,
              }}>No results found</Text>
    </View>
  );
};

export default EmptyData;
