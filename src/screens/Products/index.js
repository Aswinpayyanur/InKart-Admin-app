import React, {useCallback, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
  ScrollView,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import colors from '../../common/colors';
import EmptyData from '../../common/EmptyData';
import CustomTextInput from '../../components/CustomTextInput';
import NavigationBack from '../../common/NavigationBack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import style from './style';
import {useDimensionContext} from '../../context';

const Products = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );

  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const {width, height} = Dimensions.get('screen');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Products',
      headerLeft: () => <NavigationBack />,
      headerRight: () => <RightComponent />,
    });
  }, [navigation]);

  const RightComponent = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('CreateProduct', {type: 'create'})}>
        <AntDesign name="plussquareo" size={30} color={colors.black_level_2} />
      </TouchableOpacity>
    );
  };

  useFocusEffect(
    useCallback(() => {
      getProducts();
    }, []),
  );

  const getProducts = async () => {
    await firestore()
      .collection('Products')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
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
              const result = {id: document.id, ...document.data()};
              objArray.push(result);
            }
          });
          setProducts(objArray);
        }
      });
  };

  const handleSearch = async text => {
    await firestore()
      .collection('Products')
      .orderBy('name')
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

          setProducts([]);
        } else {
          const objArray = [];
          snapshot?.docs?.forEach(document => {
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
          });
          setProducts(objArray);
        }
      });
  };

  const handleEdit = ProductData => {
    navigation.navigate('CreateProduct', {type: 'edit', data: ProductData});
  };

  const handleDelete = async ProductData => {
    Alert.alert(
      'Confirm Product Deletion',
      'Do you want to delete this product?, deleting the product will lose the product data',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () =>
            await firestore()
              .collection('Products')
              .doc(ProductData.id)
              .delete()
              .then(() => {
                Snackbar.show({
                  text: 'Product Deleted successfully',
                  duration: Snackbar.LENGTH_LONG,
                  backgroundColor: colors.red,
                  textColor: colors.white,
                });
                getProducts();
              }),
        },
      ],
    );
  };

  return (
    <View style={{flex: 1, paddingTop: 5}}>
      <ScrollView showsVerticalScrollIndicator={false}>

      
      <CustomTextInput
        width="92%"
        border={true}
        placeholder="Search Here"
        onChangeText={handleSearch}
        icon={
          <Image
            source={require('../../assets/images/search-black.png')}
            style={responsiveStyle.searchIconStyle}
          />
        }
      />
      <FlatList
        style={{}}
        contentContainerStyle={responsiveStyle.mainContainer}
        showsVerticalScrollIndicator={false}
        data={products}
        numColumns={2}
        extraData={products}
        //ListHeaderComponent={() => <Header />}
        ListEmptyComponent={() => <EmptyData />}
        renderItem={({item, index}) => {
          if (item.username === 'admin') {
            return null;
          } else {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ProductDetails', {product: item})
                }
                style={[
                  responsiveStyle.subContainer,
                  {marginLeft: index % 2 === 1 ? 15 : 0},
                ]}>
                <View style={responsiveStyle.iconView}>
                  <Feather
                    onPress={() => handleEdit(item)}
                    name="edit"
                    size={25}
                    color={colors.black_level_2}
                  />
                  <AntDesign
                    onPress={() => handleDelete(item)}
                    name="delete"
                    size={25}
                    color={colors.black_level_2}
                    style={{marginLeft: 10}}
                  />
                </View>

                <View style={responsiveStyle.innerView}>
                  <Image
                    source={
                      item?.image
                        ? {uri: item?.image}
                        : require('../../assets/images/user-black.png')
                    }
                    style={responsiveStyle.image}
                  />
                </View>

                <View style={responsiveStyle.textContainer}>
                  <Text numberOfLines={1} style={responsiveStyle.itemHead}>
                    {item.name}
                  </Text>
                  <Text numberOfLines={1} style={responsiveStyle.description}>
                    {item.description}
                  </Text>
                  <Text style={responsiveStyle.price}>₹{item.price}</Text>
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

export default Products;
