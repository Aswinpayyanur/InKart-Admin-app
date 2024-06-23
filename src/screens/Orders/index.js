import {View, Text, Image, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import colors from '../../common/colors';
import CustomTextInput from '../../components/CustomTextInput';
import Snackbar from 'react-native-snackbar';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import EmptyData from '../../common/EmptyData';
import {useDimensionContext} from '../../context';
import style from './style';
import moment from 'moment';
import NavigationBack from '../../common/NavigationBack';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  //const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Orders',
      headerLeft: () => <NavigationBack />,
    });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      getOrders();
    }, []),
  );

  const getOrders = async () => {
    await firestore()
      .collection('Orders')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          setOrders([]);
          Snackbar.show({
            text: 'No Products found',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: colors.red,
            textColor: colors.white,
          });
        } else {
          const objArray = [];
          snapshot.docs.forEach(document => {
            if (document.exists) {
              const result = {id: document?.id, ...document.data()};
              objArray.push(result);
            }
          });
          setOrders(objArray);
        }
      });
  };

  const handleSearch = async text => {
    //setSearchText(text);
    await firestore()
      .collection('Orders')
      .orderBy('orderId')
      .startAt(String(text))
      .endAt(String(text) + '\uf8ff')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          Snackbar.show({
            text: 'No results found',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: colors.red,
            textColor: colors.white,
          });

          setOrders([]);
        } else {
          const objArray = [];
          snapshot?.docs?.forEach(document => {
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
          });
          setOrders(objArray);
        }
      });
  };

  const dateFormat = time => {
    return moment(new Date(time)).format('DD-MM-YYYY HH:mm:ss');
  };

  return (
    <View style={responsiveStyle.mainContainer}>
      <CustomTextInput
        width="95%"
        border={true}
        //value={searchText}
        placeholder="Search Here"
        onChangeText={handleSearch}
        icon={
          <Image
            source={require('../../assets/images/search-black.png')}
            style={responsiveStyle.searchIcon}
          />
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>

      <FlatList
        contentContainerStyle={responsiveStyle.flatListContainer}
        showsVerticalScrollIndicator={false}
        data={orders}
        extraData={orders}
        // ListHeaderComponent={() => <Header />}
        ListEmptyComponent={() => <EmptyData />}
        renderItem={({item, index}) => {
          if (item.username === 'admin') {
            return null;
          } else {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('OrderDetails', {order: item})
                }
                style={responsiveStyle.flatView}>
                <View style={responsiveStyle.innerView}>
                  <View>
                    <Text style={responsiveStyle.orderId}>
                      ID : {item.orderId}
                    </Text>
                    <Text style={responsiveStyle.orderedOn}>
                      Ordered on : {dateFormat(item.created)}
                    </Text>
                    <Text style={responsiveStyle.address} numberOfLines={3}>
                      {item.address1 ??
                        'HA Restro Caps Villa, 894, 473739, USA, LATGYIN'}
                    </Text>
                    <Text style={responsiveStyle.address}>{item.address2}</Text>
                    <Text style={responsiveStyle.paidText}>
                      Paid:
                      <Text style={responsiveStyle.greenText}>
                        {item.totalAmount}
                      </Text>
                      , items:
                      <Text style={responsiveStyle.greenText}>
                        {item.cartItems.length}
                      </Text>
                    </Text>
                  </View>
                  <Image
                    source={require('../../assets/images/map.png')}
                    style={responsiveStyle.map}
                  />
                </View>
                <View style={responsiveStyle.bottomView}>
                  <Text style={responsiveStyle.bottomText}>
                    {item.orderStatus}
                  </Text>
                  <Text style={responsiveStyle.bottomText}>
                    Rate & Review Products
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }
        }}
      />
      </ScrollView>
    </View>
  );
};

export default Orders;
