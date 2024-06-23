import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import CustomButton from '../../components/CustomButton';
import NavigationBack from '../../common/NavigationBack';
import firestore from '@react-native-firebase/firestore';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import CustomTextInput from '../../components/CustomTextInput';
import CustomDropDown from '../../components/CustomDropDown';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../common/colors';
import ActionSheet from 'react-native-actions-sheet';
import uploadImage from '../../common/storage';
import Snackbar from 'react-native-snackbar';
import {useDimensionContext} from '../../context';
import style from './style';

const CreateProduct = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );

  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const actionSheetRef = useRef(null);
  const [uploadUri, setUploadUri] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(null);
  const [quantity, setQuantity] = useState('');
  const route = useRoute();
  const {type, data} = route.params;

  useEffect(() => {
    setName(data?.name);
    setUploadUri(data?.image);
    setDescription(data?.description);
    setPrice(data?.price);
    setQuantity(data?.quantity ?? 1);
  }, [data]);

  useEffect(() => {
    if (category) {
      setCategory(category);
      console.warn('category...', category);
    }
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: type === 'create' ? 'Create Product' : 'Edit Product',
      headerLeft: () => <NavigationBack />,
    });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      getCategories();
    }, []),
  );

  const getCategories = async () => {
    await firestore()
      .collection('Categories')
      .get()
      .then(snapshot => {
        if (!snapshot.empty) {
          const objArray = [];
          snapshot.docs.forEach(document => {
            if (document.exists) {
              const result = {id: document.id, ...document.data()};
              objArray.push(result);
            }
          });
          setCategories(objArray);
          setCategoryWithObj(objArray);
        }
      });
  };

  const setCategoryWithObj = objArray => {
    if (data && data.categoryId) {
      const result = objArray.find(ele => ele.id === data.categoryId);
      setCategory(result);
    }
  };

  const handleCamera = async () => {
    const options = {
      mediaType: 'photo',
    };
    await launchCamera(options, response => {
      actionSheetRef.current.hide();
      if (response && response.assets) {
        setUploadUri(response.assets[0]?.uri);
      }
    });
  };

  const handleGallery = async () => {
    const options = {
      mediaType: 'photo',
    };
    await launchImageLibrary(options, response => {
      if (response && response.assets) {
        setUploadUri(response.assets[0]?.uri);
      }
    });
  };

  const handleCreateProduct = async () => {
    if (
      uploadUri &&
      name !== '' &&
      description !== '' &&
      category !== '' &&
      price !== '' &&
      quantity !== ''
    ) {
      const responseUri = await uploadImage(uploadUri);
      console.warn(responseUri);

      const product = {
        created: Date.now(),
        updated: Date.now(),
        name: name,
        description: description,
        categoryId: category.id,
        categoryName: category.name,
        price: price,
        quantity,
        quantity,
        image: responseUri,
      };

      await firestore()
        .collection('Products')
        .add(product)
        .then(() => {
          Snackbar.show({
            text: 'Product added successfully',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: colors.primary_green,
            textColor: colors.white,
          });
          navigation.goBack();
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

  const handleUpdateProduct = async () => {
    if (
      uploadUri &&
      name !== '' &&
      description !== '' &&
      category !== '' &&
      price !== '' &&
      quantity !== ''
    ) {
      const responseUri = uploadUri.includes('file://')
        ? await uploadImage(uploadUri)
        : uploadUri;

      const product = {
        updated: Date.now(),
        name: name,
        description: description,
        categoryId: category.id,
        categoryName: category.name,
        price: price,
        quantity,
        quantity,
        image: responseUri,
      };

      await firestore()
        .collection('Products')
        .doc(data.id)
        .update(product)
        .then(() => {
          Snackbar.show({
            text: 'Product Updated successfully',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: colors.primary_green,
            textColor: colors.white,
          });
          navigation.goBack();
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
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={responsiveStyle.mainContainer}>
      <ActionSheet ref={actionSheetRef}>
        <View style={responsiveStyle.actionSheetView}>
          <View style={responsiveStyle.categoriesView}>
            <Text style={responsiveStyle.selectText}>Select option</Text>
            <TouchableOpacity
              onPress={() => actionSheetRef.current?.hide()}
              style={responsiveStyle.closeIcon}>
              <AntDesign name="closecircleo" size={25} color={colors.gray} />
            </TouchableOpacity>
          </View>

          <View style={responsiveStyle.camView}>
            <TouchableOpacity
              onPress={handleCamera}
              style={responsiveStyle.camInnerView}>
              <AntDesign
                name="camerao"
                size={40}
                color={colors.primary_green}
              />
              <Text style={responsiveStyle.camText}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleGallery}
              style={responsiveStyle.camInnerView}>
              <Entypo name="image" size={40} color={colors.primary_green} />
              <Text style={responsiveStyle.camText}>Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ActionSheet>

      <CustomTextInput
        width="100%"
        border={true}
        value={name}
        placeholder="Name"
        onChangeText={text => setName(text)}
      />
      <CustomTextInput
        width="100%"
        border={true}
        value={description}
        placeholder="Description"
        onChangeText={text => setDescription(text)}
        multiline={true}
      />
      {categories.length > 0 ? (
        <CustomDropDown
          prevData={category}
          data={categories}
          setData={obj => setCategory(obj)}
          createProduct={true}
        />
      ) : null}

      <CustomTextInput
        width="100%"
        border={true}
        value={price}
        placeholder="Price"
        onChangeText={text => setPrice(text)}
      />
      <CustomTextInput
        width="100%"
        border={true}
        value={quantity}
        placeholder="Quantity"
        onChangeText={text => setQuantity(text)}
      />

      <TouchableOpacity
        onPress={() => actionSheetRef.current.show()}
        style={responsiveStyle.uploadView}>
        <Text style={responsiveStyle.uploadText}>Upload Product Image</Text>
        {uploadUri ? (
          <View>
            <TouchableOpacity
              onPress={() => setUploadUri(null)}
              style={responsiveStyle.closeIconView}>
              <AntDesign
                name="closecircleo"
                size={25}
                color={colors.black_level_3}
              />
            </TouchableOpacity>
            <Image
              source={{uri: uploadUri}}
              style={responsiveStyle.imageIcon}
            />
          </View>
        ) : (
          <Entypo name="image" size={40} color={colors.black_level_2} />
        )}
      </TouchableOpacity>

      <CustomButton
        width={'100%'}
        text={type === 'create' ? 'Create' : 'Update'}
        onPress={type === 'create' ? handleCreateProduct : handleUpdateProduct}
      />
    </ScrollView>
  );
};

export default CreateProduct;
