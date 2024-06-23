import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import style from './style';
import React from 'react';
import {useDimensionContext} from '../../context';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {signout} from '../../storage/actions';
import colors from '../../common/colors';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CustomDrawer = () => {
  const dimensions = useDimensionContext();
  //   const responsiveStyle = style(
  //     dimensions.width,
  //     dimensions.height,
  //     dimensions.isPortrait,
  //   );

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userName = useSelector(state => state.userName);
  const email = useSelector(state => state.email);
  const profileImage = useSelector(state => state.profileImage);

  const handleSignOut = () => {
    dispatch(signout());
  };

  const contents = [
    {
      itemId: 0,
      itemName: 'Home',
      navigation: 'Home',
      icon: (
        <AntDesign
          style={{marginRight: 10}}
          name="home"
          size={25}
          color={colors.black_level_3}
        />
      ),
    },
    {
      itemId: 1,
      itemName: 'Products',
      navigation: 'Products',
      icon: (
        <Feather
          style={{marginRight: 10}}
          name="shopping-bag"
          size={25}
          color={colors.black_level_3}
        />
      ),
    },
    {
      itemId: 2,
      itemName: 'Categories',
      navigation: 'Footer',
      icon: (
        <MaterialIcons
          style={{marginRight: 10}}
          name="category"
          size={25}
          color={colors.black_level_3}
        />
      ),
    },
    {
      itemId: 3,
      itemName: 'Orders',
      navigation: 'Orders',
      icon: (
        <Image
          style={{
            width: 25,
            height: 25,
            resizeMode: 'contain',
            marginRight: 10,
          }}
          source={require('../../assets/images/orders-black.png')}
        />
      ),
    },
    {
      itemId: 5,
      itemName: 'Reviews',
      navigation: 'Footer',
      icon: (
        <MaterialIcons
          style={{marginRight: 10}}
          name="reviews"
          size={25}
          color={colors.black_level_3}
        />
      ),
    },
    {
      itemId: 6,
      itemName: 'Banners',
      navigation: 'Banner',
      icon: (
        <Feather
          style={{marginRight: 10}}
          name="sliders"
          size={25}
          color={colors.black_level_3}
        />
      ),
    },
    {
      itemId: 4,
      itemName: 'Offers',
      navigation: 'Offers',
      icon: (
        <MaterialIcons
          style={{marginRight: 10}}
          name="local-offer"
          size={25}
          color={colors.black_level_3}
        />
      ),
    },
    {
      itemId: 7,
      itemName: 'Logout',
      onPress: handleSignOut,
      icon: (
        <AntDesign
          style={{marginRight: 10}}
          name="logout"
          size={25}
          color={colors.black_level_3}
        />
      ),
    },
  ];

  const handleTouch = itemData => {
    if (itemData.navigation) {
      navigation.navigate(itemData.navigation);
    } else {
      itemData.onPress();
    }
  };

  const handleOpenEditProfile = () => {
    navigation.navigate('Profile');
  };

  

  return (
    <ScrollView style={{flex: 1}}>
      <TouchableOpacity
        onPress={handleOpenEditProfile}
        style={{
          padding: 10,
          marginTop: 10,
          borderBottomWidth: StyleSheet.hairlineWidth,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: 75,
            height: 75,
            borderRadius: 50,
            marginLeft: 5,
            backgroundColor: colors.white_level_3,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}>
          <Image
            source={
              profileImage === ''
                ? require('../../assets/images/dummy-user.png')
                : {uri: profileImage}
            }
            style={{width: 70, height: 70, borderRadius: 25}}
          />
        </View>
        <View style={{padding: 25}}>
          <Text
            style={{
              fontFamily: 'Lato-Black',
              fontSize: 18,
              color: colors.black_level_3,
            }}>
            {userName}
          </Text>
          <Text>{email}</Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          marginTop: 10,
        }}>
        {contents.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => handleTouch(item)}
              key={String(item.itemId)}
              style={{
                padding: 10,
                marginVertical: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                {item.icon}
                <Text
                  style={{
                    fontFamily: 'Lato-Regular',
                    fontSize: 16,
                    color: colors.black_level_3,
                  }}>
                  {item.itemName}
                </Text>
              </View>
              <Image
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: 'contain',
                }}
                source={require('../../assets/images/arrow-right.png')}
              />
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={{paddingVertical: 55}}>
        <Image
          style={{
            width: 150,
            height: 50,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
          source={require('../../assets/images/logo-icon.png')}
        />
        <Text
          style={{
            fontFamily: 'Lato-Regular',
            fontSize: 16,
            color: colors.black_level_3,
            textAlign: 'center',
          }}>
          All rights reserved
        </Text>
      </View>
    </ScrollView>
  );
};

export default CustomDrawer;
