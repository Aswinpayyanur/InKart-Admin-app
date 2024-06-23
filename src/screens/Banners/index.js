import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import React, {useCallback, useLayoutEffect, useRef, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import NavigationBack from '../../common/NavigationBack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../common/colors';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import ActionSheet from 'react-native-actions-sheet';
import CustomButton from '../../components/CustomButton';
import style from './style';
import CustomTextInput from '../../components/CustomTextInput';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import uploadImage from '../../common/storage';
import { useDimensionContext } from '../../context';

const Banner = () => {

  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );


  const [banners, setBanners] = useState([]);
  const [head, setHead] = useState('');
  const [description, setDescription] = useState('');
  const navigation = useNavigation();
  const {width, height} = Dimensions.get('screen');
  const [uploadUri, setUploadUri] = useState(null);
  const actionSheetRef = useRef(null);
  const [type, setType] = useState(null);
  const [bannerId, setBannerId] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Banners',
      headerLeft: () => <NavigationBack />,
      headerRight: () => <RightComponent />,
    });
  }, [navigation]);

  const RightComponent = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setType('add');
          setHead('');
          setDescription('');
          setUploadUri(null);      
          actionSheetRef.current.show();
        }}>
        <AntDesign name="plussquareo" size={30} color={colors.black_level_2} />
      </TouchableOpacity>
    );
  };

  useFocusEffect(
    useCallback(() => {
      getBanners();
    }, []),
  );

  const getBanners = async () => {
    firestore()
      .collection('Banners')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          Snackbar.show({
            text: 'No Banners found',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: colors.red,
            textColor: colors.white,
          });
        } else {
          const objArray = [];
          snapshot?.docs?.forEach(document => {
            const result = {id: document.id, ...document.data()};
            objArray.push(result);
          });

          setBanners(objArray);
        }
      });
  };

  const handleCamera = async () => {
    const options = {
      mediaType: 'photo',
    };
    await launchCamera(options, response => {
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

  const handleCreateBanner = async () => {

    if (uploadUri && head !== '' && description !== '') {
      const responseUri = await uploadImage(uploadUri);
      console.warn(responseUri);

      const banner = {
        head: head,
        description: description,
        image: responseUri,
      };

      await firestore()
        .collection('Banners')
        .add(banner)
        .then(() => {
          Snackbar.show({
            text: 'Banner added successfully',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: colors.primary_green,
            textColor: colors.white,
          });
          actionSheetRef.current?.hide();
          setHead(''), setDescription(''), setUploadUri(null), getBanners();
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

  const handleEdit = bannerData => {
    setBannerId(bannerData.id);
    setHead(bannerData.head);
    setDescription(bannerData.description);
    setUploadUri(bannerData.image);
    setType('update');
    actionSheetRef.current.show();
  };

  const handleDelete = async bannerData => {
    Alert.alert(
      'Confirm Banner Deletion',
      'Do you want to delete this Banner?, deleting the banner will lose the banner data displayed on user dashboard',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Delete Banner',
          onPress: async () =>
            await firestore()
              .collection('Banners')
              .doc(bannerData.id)
              .delete()
              .then(() => {
                Snackbar.show({
                  text: 'Banner Deleted successfully',
                  duration: Snackbar.LENGTH_LONG,
                  backgroundColor: colors.red,
                  textColor: colors.white,
                });
                getBanners();
              }),
        },
      ],
    );
  };

  const handleUpdateBanner = async () => {
    if (bannerId && uploadUri && head !== '' && description !== '') {
      const responseUri = uploadUri.includes('file://')
        ? await uploadImage(uploadUri)
        : uploadUri;
      console.warn(responseUri);

      const banner = {
        head: head,
        description: description,
        image: responseUri,
      };

      await firestore()
        .collection('Banners')
        .doc(bannerId)
        .update(banner)
        .then(() => {
          Snackbar.show({
            text: 'Banner Updated successfully',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: colors.primary_green,
            textColor: colors.white,
          });
          actionSheetRef.current?.hide();
          setHead(''), setDescription(''), setUploadUri(null), getBanners();
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
    <View style={responsiveStyle.mainView}>
      <ActionSheet ref={actionSheetRef}>
        <View style={responsiveStyle.updateView}>
          <View
            style={responsiveStyle.updateInnerView}>
            <Text
              style={responsiveStyle.updateHead}>
              {type === 'add' ? 'Create Banner' : 'Update Banner'}
            </Text>
            <TouchableOpacity
              onPress={() => actionSheetRef.current?.hide()}
              style={responsiveStyle.closeIcon}>
              <AntDesign name="closecircleo" size={25} color={colors.gray} />
            </TouchableOpacity>
          </View>

          <View style={responsiveStyle.inputView}>
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
              value={description}
              placeholder="Description"
              multiline={true}
              onChangeText={text => setDescription(text)}
            />
            <View
              style={responsiveStyle.imageView}>
              <Text
                style={responsiveStyle.imageText}>
                Upload Image
              </Text>
              {uploadUri ? (
                <View>
                  <TouchableOpacity
                    onPress={() => setUploadUri(null)}
                    style={responsiveStyle.imageCloseIcon}>
                    <AntDesign
                      name="closecircleo"
                      size={25}
                      color={colors.black_level_3}
                    />
                  </TouchableOpacity>
                  <Image
                    source={{uri: uploadUri}}
                    style={responsiveStyle.image}
                  />
                </View>
              ) : (
                <Entypo name="image" size={40} color={colors.black_level_2} />
              )}
            </View>
            <View
              style={responsiveStyle.iconView}>
              <TouchableOpacity
                onPress={handleCamera}
                style={{justifyContent: 'center', alignItems: 'center'}}>
                <AntDesign
                  name="camerao"
                  size={35}
                  color={colors.primary_green}
                />
                <Text
                  style={responsiveStyle.iconText}>
                  Camera
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleGallery}
                style={{justifyContent: 'center', alignItems: 'center'}}>
                <Entypo name="image" size={35} color={colors.primary_green} />
                <Text
                  style={responsiveStyle.iconText}>
                  Gallery
                </Text>
              </TouchableOpacity>
            </View>

            <CustomButton
              text={type === 'add' ? 'Create Banner' : 'Update Banner'}
              onPress={type === 'add' ? handleCreateBanner : handleUpdateBanner}
              width="100%"
            />
          </View>
        </View>
      </ActionSheet>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={banners}
        contentContainerStyle={responsiveStyle.flatList}
        renderItem={({item, index}) => {
          return (
            <ImageBackground
              source={{uri: item.image}}
              style={responsiveStyle.backgroundImg}>
              <View
                style={responsiveStyle.editIconView}>
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

              <View style={responsiveStyle.textView}>
                <Text
                  style={responsiveStyle.itemHead}>
                  {item.head}
                </Text>
                <Text
                  style={responsiveStyle.itemDescription}>
                  {item.description}
                </Text>
              </View>
            </ImageBackground>
          );
        }}
      />
    </View>
  );
};

export default Banner;
