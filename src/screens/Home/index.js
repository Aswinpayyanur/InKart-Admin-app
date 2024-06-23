import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import colors from '../../common/colors';
import firestore from '@react-native-firebase/firestore';
import {useDimensionContext} from '../../context';
import style from './style';

const Home = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const navigation = useNavigation();
  const [orders, setOrders] = useState(0);
  const [users, setUsers] = useState(0);
  const [products, setProducts] = useState(0);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Home',
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={require('../../assets/images/drawer.png')}
            style={responsiveStyle.headerDrawerImage}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={require('../../assets/images/logo-icon.png')}
            style={responsiveStyle.headerLogoImage}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    getAllCount();
  }, []);

  const getAllCount = async () => {
    const orderRef = await firestore().collection('Orders').get();
    const userRef = await firestore()
      .collection('User')
      .where('admin', '==', false)
      .get();
    const productRef = await firestore().collection('Products').get();

    setOrders(orderRef.size);
    setUsers(userRef.size);
    setProducts(productRef.size);
  };

  return (
    <View style={responsiveStyle.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>

     
      <TouchableOpacity
        onPress={() => navigation.navigate('Orders')}
        style={responsiveStyle.itemContainer}>
        <Image
          style={responsiveStyle.itemImage}
          source={require('../../assets/images/orders.png')}
        />
        <View style={responsiveStyle.textContainer}>
          <Text style={responsiveStyle.count}>{orders}</Text>
          <Text style={responsiveStyle.textHead}> Orders</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Products')}
        style={[
          responsiveStyle.itemContainer,
          {backgroundColor: colors.category_2},
        ]}>
        <Image
          style={responsiveStyle.itemImage}
          source={require('../../assets/images/products.png')}
        />
        <View style={responsiveStyle.textContainer}>
          <Text style={responsiveStyle.count}>{products}</Text>
          <Text style={responsiveStyle.textHead}> Products</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Users')}
        style={[
          responsiveStyle.itemContainer,
          {backgroundColor: colors.category_3},
        ]}>
        <Image
          style={responsiveStyle.itemImage}
          source={require('../../assets/images/users.png')}
        />
        <View style={responsiveStyle.textContainer}>
          <Text style={responsiveStyle.count}>{users}</Text>
          <Text style={responsiveStyle.textHead}> Users</Text>
        </View>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Home;
