import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {useCallback, useLayoutEffect, useRef, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import colors from '../../common/colors';
import firestore from '@react-native-firebase/firestore';
import NavigationBack from '../../common/NavigationBack';
import Snackbar from 'react-native-snackbar';
import style from './style';
import {useDimensionContext} from '../../context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import ActionSheet from 'react-native-actions-sheet';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import Clipboard from '@react-native-clipboard/clipboard';

const Offers = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );

  const actionSheetRef = useRef(null);
  const actionSheetChooseOptionRef = useRef(null);
  const [offers, setOffers] = useState([]);
  const [head, setHead] = useState('');
  const [subHead, setSubHead] = useState('');
  const [offer, setOffer] = useState('');
  const [offerCode, setOfferCode] = useState('');

  const [type, setType] = useState(null);
  const [selected, setSelected] = useState(null);

  useFocusEffect(
    useCallback(() => {
      getOffers();
    }, []),
  );

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Offers',
      headerLeft: () => <NavigationBack />,
      headerRight: () => <RightComponent />,
    });
  }, [navigation]);

  const RightComponent = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setType('add');
          actionSheetRef.current.show();
        }}>
        <AntDesign name="plussquareo" size={30} color={colors.black_level_2} />
      </TouchableOpacity>
    );
  };

  const getOffers = async () => {
    await firestore()
      .collection('Offers')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          setOffers([]);
          Snackbar.show({
            text: 'No Offers found',
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
          setOffers(objArray);
        }
      });
  };

  const handleCreateOffer = async () => {};

  const handleEdit = async () => {
    actionSheetChooseOptionRef.current.hide();

    setHead(selected.head);
    setSubHead(selected.subhead);
    setOffer(selected.offer);
    setOfferCode(selected.offercode);
    setType('edit');

    setTimeout(() => {
      actionSheetRef.current.show();
    }, 1000);
  };

  const handleCopy = async () => {
    setTimeout(() => {
      Clipboard.setString(selected.offerCode);
    }, 1000);
    actionSheetChooseOptionRef.current.hide();
  };

  const handleDelete = async () => {
    actionSheetChooseOptionRef.current.hide();
    Alert.alert('Confirm Offer Deletion', 'Do you want to delete this Offer?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Delete Offer',
        onPress: async () =>
          await firestore()
            .collection('Offers')
            .doc(selected.id)
            .delete()
            .then(() => {
              Snackbar.show({
                text: 'Banner Deleted successfully',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: colors.red,
                textColor: colors.white,
              });
              setSelected(null);
              getOffers();
            }),
      },
    ]);
  };

  const handleUpdateOffer = async () => {
    actionSheetRef.current.hide();
    if (head !== '' && subHead !== '' && offer !== '' && offerCode !== '') {
      const offerData = {
        head: head,
        subhead: subHead,
        offer: offer,
        offercode: offerCode,
      };

      await firestore()
        .collection('Offers')
        .doc(selected.id)
        .update(offerData)
        .then(() => {
          Snackbar.show({
            text: 'Product Updated successfully',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: colors.primary_green,
            textColor: colors.white,
          });
          getOffers();
        });
    } else {
      Snackbar.show({
        text: 'Fill up all fields to continue',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: colors.red,
        textColor: colors.white,
      });
    }
  };

  return (
    <View style={{padding: 15}}>
      <ActionSheet ref={actionSheetRef}>
        <View style={{padding: 15}}>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              borderBottomColor: colors.black_level_3,
              borderBottomWidth: StyleSheet.hairlineWidth,
              padding: 15,
            }}>
            <Text
              style={{
                color: colors.primary_green,
                fontFamily: 'Lato-Bold',
                fontSize: 20,
              }}>
              {type === 'add' ? 'Create Offer' : 'Update Offer'}
            </Text>
            <TouchableOpacity
              onPress={() => {
                actionSheetRef.current?.hide(),
                  setType(null),
                  setSelected(null);
                setHead('');
                setSubHead('');
                setOffer('');
                setOfferCode('');
              }}
              style={{alignSelf: 'flex-end'}}>
              <AntDesign name="closecircleo" size={25} color={colors.gray} />
            </TouchableOpacity>
          </View>

          <View style={{marginVertical: 20}}>
            <CustomTextInput
              width="100%"
              border={true}
              value={head}
              placeholder="Heading"
              onChangeText={text => setHead(text)}
            />
            <CustomTextInput
              width="100%"
              border={true}
              value={subHead}
              placeholder="Description"
              onChangeText={text => setSubHead(text)}
            />
            <CustomTextInput
              width="100%"
              border={true}
              value={offer}
              placeholder="Offer Percentage"
              onChangeText={text => setOffer(text)}
            />
            <CustomTextInput
              width="100%"
              border={true}
              value={offerCode}
              placeholder="Offer Code"
              onChangeText={text => setOfferCode(text)}
            />

            <CustomButton
              text={type === 'add' ? 'Create' : 'Update'}
              onPress={type === 'add' ? handleCreateOffer : handleUpdateOffer}
              width="100%"
            />
          </View>
        </View>
      </ActionSheet>

      <ActionSheet ref={actionSheetChooseOptionRef}>
        <View style={{padding: 15}}>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              borderBottomColor: colors.black_level_3,
              borderBottomWidth: StyleSheet.hairlineWidth,
              padding: 15,
            }}>
            <Text
              style={{
                color: colors.primary_green,
                fontFamily: 'Lato-Bold',
                fontSize: 20,
              }}>
              Choose Action
            </Text>
            <TouchableOpacity
              onPress={() => actionSheetChooseOptionRef.current?.hide()}
              style={{alignSelf: 'flex-end'}}>
              <AntDesign
                name="closecircleo"
                size={25}
                color={colors.black_level_3}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              margin: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              <Feather
                onPress={handleEdit}
                name="edit"
                size={40}
                color={colors.black_level_3}
              />
              <Text
                style={{
                  color: colors.primary_green,
                  fontFamily: 'Lato-Bold',
                  fontSize: 16,
                  lineHeight: 30,
                }}>
                Edit
              </Text>
            </View>
            <View>
              <AntDesign
                onPress={handleCopy}
                name="copy1"
                size={40}
                color={colors.black_level_3}
              />
              <Text
                style={{
                  color: colors.primary_green,
                  fontFamily: 'Lato-Bold',
                  fontSize: 16,
                  lineHeight: 30,
                }}>
                Copy
              </Text>
            </View>

            <View>
              <AntDesign
                onPress={handleDelete}
                name="delete"
                size={40}
                color={colors.black_level_3}
              />
              <Text
                style={{
                  color: colors.primary_green,
                  fontFamily: 'Lato-Bold',
                  fontSize: 16,
                  lineHeight: 30,
                }}>
                Delete
              </Text>
            </View>
          </View>
        </View>
      </ActionSheet>

      <FlatList
        data={offers}
        extraData={offers}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setSelected(item), actionSheetChooseOptionRef.current.show();
              }}
              style={responsiveStyle.renderView}>
              {/* start design */}

              <View style={responsiveStyle.offCircleView}>
                <View style={responsiveStyle.circle}></View>
                <View style={responsiveStyle.circle}></View>
                <View style={responsiveStyle.circle}></View>
                <View style={responsiveStyle.circle}></View>
              </View>

              <View
                style={{
                  width: '64%',
                  height: 100,
                  backgroundColor: colors.light_green,
                  padding: 20,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontFamily: 'Lato-Black',
                      color: colors.primary_green,
                      fontSize: 50,
                    }}>
                    {item.offer}
                  </Text>
                  <View>
                    <Text
                      style={{
                        fontFamily: 'Lato-Regular',
                        color: colors.primary_green,
                        fontSize: 14,
                      }}>
                      %
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Lato-Regular',
                        color: colors.primary_green,
                        fontSize: 14,
                      }}>
                      OFF
                    </Text>
                  </View>
                  <View style={{marginLeft: 15}}>
                    <Text
                      style={{
                        fontFamily: 'Lato-Bold',
                        color: colors.black,
                        fontSize: 16,
                      }}>
                      {item.head}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Lato-Regular',
                        color: colors.black_level_3,
                        fontSize: 12,
                      }}>
                      {item.subhead}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={responsiveStyle.circleCenterView}>
                <View
                  style={[
                    responsiveStyle.circleCenter,
                    {marginTop: -25 / 2},
                  ]}></View>
                <View
                  style={[
                    responsiveStyle.circleCenter,
                    {marginBottom: -25 / 2},
                  ]}></View>
              </View>

              <View style={responsiveStyle.offCodeMainView}>
                <Text style={responsiveStyle.offCodeText}>Use code</Text>
                <View style={responsiveStyle.offCodeView}>
                  <Text style={responsiveStyle.offCode}>{item.offercode}</Text>
                </View>
              </View>

              {/* end design */}

              <View style={{marginLeft: -25 / 2}}>
                <View style={responsiveStyle.circle}></View>
                <View style={responsiveStyle.circle}></View>
                <View style={responsiveStyle.circle}></View>
                <View style={responsiveStyle.circle}></View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Offers;
