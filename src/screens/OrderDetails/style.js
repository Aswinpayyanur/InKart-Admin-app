import { StyleSheet } from "react-native";
import colors from "../../common/colors";


const style = (width, height, isPortrait) => StyleSheet.create({
    container: {flex: 1},
    scrollView: {padding: width* 0.04},
    contentContainerStyle: {paddingBottom: height * 0.13},
    greenBox: {
        backgroundColor: colors.primary_green,
        borderRadius: width* 0.04,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: width* 0.04,
      },
      greenTextBox: {marginLeft: 0.04},
      updateOrderContainer: {padding: 15},
      updateOrderInnerView: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor: colors.black_level_3,
        borderBottomWidth: StyleSheet.hairlineWidth,
        padding: 15,
      },
      updateOrderText: {
        color: colors.primary_green,
        fontFamily: 'Lato-Bold',
        fontSize: 20,
      },
      dropDownView: {marginVertical: 20},
      orderId: {
        color: colors.white,
        fontFamily: 'Lato-Regular',
        fontSize: 16,
      },
      orderStatus: {
        color: colors.white,
        fontFamily: 'Lato-Black',
        fontSize: 20,
      },
      itemsView: {marginVertical: 20},
      itemsText: {
        color: colors.primary_green,
        fontFamily: 'Lato-Bold',
        fontSize: 20,
      },
      itemsInnerView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
      },
      countView: {
        backgroundColor: colors.primary_green,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginRight: 15,
      },
      cartCount: {
        color: colors.white,
        fontFamily: 'Lato-Bold',
        fontSize: 18,
      },
      productTextView: {width: '55%', overflow: 'hidden', marginLeft: 15},
      productName: {
        color: colors.black,
        fontFamily: 'Lato-Regular',
        fontSize: 18,
      },
      productDescription: {
        color: colors.black_level_3,
        fontFamily: 'Lato-Light',
        fontSize: 15,
      },
      priceView: {width: '20%'},
      productPrice: {
        color: colors.black_level_3,
        fontFamily: 'Lato-Bold',
        fontSize: 18,
      },
      paymentDetailsView: {marginVertical: 15},
      paymentDetailsText: {
        color: colors.primary_green,
        fontFamily: 'Lato-Bold',
        fontSize: 20,
      },
      paymentDetailsInnerView: {
        marginVertical: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 20,
        borderBottomColor: colors.black_level_3,
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
      paymentContentText: {
        lineHeight: 25,
        color: colors.black,
        fontFamily: 'Lato-Regular',
        fontSize: 16,
      },
      paymentValueView: {alignItems: 'flex-end'},
      totalAmountContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      totalAmountText: {
        color: colors.black,
        fontFamily: 'Lato-Bold',
        fontSize: 18,
      },
      addressContainer: {marginVertical: 15},
      addressText:{
        color: colors.primary_green,
        fontFamily: 'Lato-Bold',
        fontSize: 18,
      },
      addressContent: {
        color: colors.black,
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        lineHeight: 20,
      },
      cardContainer: {
        marginVertical: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
      },
      cardNumContainer: {margin: 15},
      cardNumber: {
        color: colors.black,
        fontFamily: 'Lato-Regular',
        fontSize: 16,
      },
      paymentMethod: {
        color: colors.black,
        fontFamily: 'Lato-Regular',
        fontSize: 16,
      },
      ctmBtnView: {bottom: 100}


})

export default style