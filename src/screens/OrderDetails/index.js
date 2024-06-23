import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import NavigationBack from '../../common/NavigationBack';
import colors from '../../common/colors';
import {useDimensionContext} from '../../context';
import firestore from '@react-native-firebase/firestore';
import style from './style';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../../components/CustomButton';
import ActionSheet from 'react-native-actions-sheet';
import CustomTextInput from '../../components/CustomTextInput';
import Snackbar from 'react-native-snackbar';
import CustomDropDown from '../../components/CustomDropDown';

const OrderDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const order = route.params.order;
  const actionSheetRef = useRef(null);

  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );

  const [orderStatus, setOrderStatus] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (order) {
      setOrderStatus(order?.orderStatus);
    }
  }, [order]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Orders Details',
      headerLeft: () => <NavigationBack />,
    });
  }, [navigation]);

  const handleUpdateOrder = async () => {
    try {
      if (order?.id && status !== '') {
        await firestore()
          .collection('Orders')
          .doc(order.id)
          .update({
            orderStatus: status,
          })
          .then(() => {
            actionSheetRef.current?.hide();
            setOrderStatus(status);
            setTimeout(() => {
              Snackbar.show({
                text: 'Order status is updated',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: colors.primary_green,
                textColor: colors.white,
              });
            }, 1000);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const statusData = [
    {name: 'Ordered'},
    {name: 'Order Inprogress'},
    {name: 'Order Packed'},
    {name: 'Order shipped'},
    {name: 'Out of Delivery'},
    {name: 'Delivered'},
    {name: 'Returned'},
    {name: 'Failed'},
  ];

  return (
    <View>
      <ActionSheet ref={actionSheetRef}>
        <View style={responsiveStyle.updateOrderContainer}>
          <View style={responsiveStyle.updateOrderInnerView}>
            <Text style={responsiveStyle.updateOrderText}>Update Order</Text>
            <TouchableOpacity
              onPress={() => actionSheetRef.current?.hide()}
              style={{alignSelf: 'flex-end'}}>
              <AntDesign name="closecircleo" size={25} color={colors.gray} />
            </TouchableOpacity>
          </View>

          <View style={responsiveStyle.dropDownView}>
            <CustomDropDown
              currentStatus={orderStatus}
              data={statusData}
              setData={text => setStatus(text)}
            />
            <CustomButton
              text="Update Order"
              onPress={handleUpdateOrder}
              width="100%"
            />
          </View>
        </View>
      </ActionSheet>
      <ScrollView
        style={responsiveStyle.scrollView}
        contentContainerStyle={responsiveStyle.contentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <View style={responsiveStyle.greenBox}>
          <Feather name="box" size={45} color={colors.white} />

          <View style={responsiveStyle.greenTextBox}>
            <Text style={responsiveStyle.orderId}>
              Order Id: #{order?.orderId ?? '#NDI845789'}
            </Text>
            <Text style={responsiveStyle.orderStatus}>{orderStatus ?? ''}</Text>
          </View>
        </View>
        <View style={responsiveStyle.itemsView}>
          <Text style={responsiveStyle.itemsText}>Items:</Text>
          {order?.cartItems &&
            order.cartItems.map((ele, index) => {
              return (
                <View key={index} style={responsiveStyle.itemsInnerView}>
                  <View style={responsiveStyle.countView}>
                    <Text style={responsiveStyle.cartCount}>
                      {ele.quantity}
                    </Text>
                  </View>
                  <View>
                    <FontAwesome5
                      name="star-of-life"
                      size={16}
                      color={colors.black_level_2}
                    />
                  </View>
                  <View style={responsiveStyle.productTextView}>
                    <Text style={responsiveStyle.productName}>{ele.name}</Text>
                    <Text style={responsiveStyle.productDescription}>
                      {ele.description}
                    </Text>
                  </View>
                  <View style={responsiveStyle.priceView}>
                    <Text style={responsiveStyle.productPrice}>
                      ₹{ele.price}
                    </Text>
                  </View>
                </View>
              );
            })}
        </View>
        <View style={responsiveStyle.paymentDetailsView}>
          <Text style={responsiveStyle.paymentDetailsText}>
            Payment Details
          </Text>
          <View style={responsiveStyle.paymentDetailsInnerView}>
            <View>
              <Text style={responsiveStyle.paymentContentText}>Bag Total</Text>
              <Text style={responsiveStyle.paymentContentText}>
                Coupon Discount
              </Text>
              <Text style={responsiveStyle.paymentContentText}>Delivery</Text>
            </View>
            <View style={responsiveStyle.paymentDetailsView}>
              <Text style={responsiveStyle.paymentContentText}>₹234</Text>
              <Text
                style={[
                  responsiveStyle.paymentContentText,
                  {color: colors.red},
                ]}>
                Apply Coupon
              </Text>
              <Text style={responsiveStyle.paymentContentText}>₹50.00</Text>
            </View>
          </View>
        </View>
        <View style={responsiveStyle.totalAmountContainer}>
          <Text style={responsiveStyle.totalAmountText}>Total Amount</Text>
          <Text style={responsiveStyle.totalAmountText}>
            ₹{order.totalAmount}
          </Text>
        </View>
        <View style={responsiveStyle.addressContainer}>
          <Text style={responsiveStyle.addressText}>Address:</Text>
        </View>
        <Text style={responsiveStyle.addressContent}>{order.userName}</Text>
        <Text style={responsiveStyle.addressContent}>
          {order.userPhone}, {order.userEmail}
        </Text>
        <View style={responsiveStyle.paymentDetailsView}>
          <Text style={responsiveStyle.addressText}>Payment Method</Text>
          <View style={responsiveStyle.cardContainer}>
            <FontAwesome name="cc-visa" size={30} color={colors.black} />
            <View style={responsiveStyle.cardNumContainer}>
              <Text style={responsiveStyle.cardNumber}>
                **** **** **** 2387
              </Text>
              <Text style={responsiveStyle.paymentMethod}>
                {order?.paymentMethod ?? ''}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={(StyleSheet.absoluteFillObject, responsiveStyle.ctmBtnView)}>
        <CustomButton
          width={'90%'}
          text={'Update Status'}
          onPress={() => actionSheetRef.current?.show()}
        />
      </View>
    </View>
  );
};

export default OrderDetails;
