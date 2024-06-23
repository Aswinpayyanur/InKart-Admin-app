import React, {useLayoutEffect, useState} from 'react';
import {View, Text, Image, Modal, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import ImagePicker from 'react-native-image-crop-picker';
import Snackbar from 'react-native-snackbar';

import style from './style';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {updateProfileImage} from './controller';
import NavigationBack from '../../common/NavigationBack';
import {useDimensionContext} from '../../context';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import {launchCamera} from 'react-native-image-picker';
import colors from '../../common/colors';
import {updateProfile} from '../../storage/actions';

//import {updateProfile} from '../../storage/action';
// import {
//   validateEmail,
//   validatePhoneNumber,
// } from '../../components/common/validation';

const Profile = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Profile',
      headerLeft: () => <NavigationBack />,
    });
  }, [navigation]);

  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );

  const userId = useSelector(state => state.userId);
  const userName = useSelector(state => state.userName);
  const email = useSelector(state => state.email);
  const profileImage = useSelector(state => state.profileImage);

  const [nameOfUser, setNameOfUser] = useState(userName);
  const [modal, setModal] = useState(false);
  const [stateEmail, setStateEmail] = useState(email);
  const [modalChoose, setModalChoose] = useState(false);
  const [userImage, setUserImage] = useState('');

  const dispatch = useDispatch();

  const handleOpenImage = () => {
    setModal(true);
  };
  const handleEditImage = () => {
    setModalChoose(true);
  };
  const handlePickFromGallery = () => {
    setModalChoose(false);
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setUserImage(image.path ?? '');
        setModalChoose(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  // const handleFromCamera = () => {
  //   setModalChoose(false);

  //   ImagePicker.openCamera({
  //     width: 300,
  //     height: 400,
  //     cropping: true,
  //   })
  //     .then(image => {
  //       console.log(image);
  //     })
  //     .catch(err => console.log(err));
  // };

  const handleFromCamera = async () => {
    setModalChoose(false);
    const options = {
      mediaType: 'photo',
    };
    await launchCamera(options, response => {
      if (response && response.assets) {
        setUserImage(response.assets[0]?.uri ?? '');
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

  const handleUpdateProfile = async () => {
    //if (validateEmail(stateEmail.trim())) {
    if (nameOfUser !== '') {
      let newUrl = profileImage;
      if (userImage !== '') {
        newUrl = await updateProfileImage(userImage);
      }
      await firestore()
        .collection('User')
        .doc(userId)
        .update({
          username: nameOfUser,
          email: stateEmail,
          profileimage: newUrl,
        })
        .then(() => {
          dispatch(
            updateProfile({
              userId: userId,
              userName: nameOfUser,
              email: stateEmail,
              profileImage: newUrl,
            }),
          );
          setUserImage('');
          Snackbar.show({
            text: 'Profile is Updated',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: colors.primary_green,
            textColor: colors.white,
          });
        });
    } else {
      Snackbar.show({
        text: 'Fill up all fields to continue',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: colors.red,
        textColor: colors.white,
      });
    }
    // } else {
    //   Snackbar.show({
    //     text: 'Given email address is not valid',
    //     duration: Snackbar.LENGTH_SHORT,
    //     backgroundColor: colors.red,
    //     textColor: colors.white,
    //   });
    // }
    // } else {
    //   Snackbar.show({
    //     text: 'Given Phone number is not valid',
    //     duration: Snackbar.LENGTH_SHORT,
    //     backgroundColor: colors.red,
    //     textColor: colors.white,
    //   });
    // }
  };

  return (
    <ScrollView
      showVerticalScrollView={false}
      style={responsiveStyle.container}>
      <Text style={responsiveStyle.head}>{userName}</Text>
      <View style={responsiveStyle.userImageView}>
        <TouchableOpacity onPress={handleOpenImage}>
          <Image
            source={
              userImage === ''
                ? profileImage === ''
                  ? require('../../assets/images/dummy-user.png')
                  : {uri: profileImage}
                : {uri: userImage}
            }
            style={responsiveStyle.userImage}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleEditImage}
          style={responsiveStyle.editTouch}>
          <Image
            source={require('../../assets/images/edit-green.png')}
            style={responsiveStyle.edit}
          />
        </TouchableOpacity>
      </View>

      <CustomTextInput
        border={true}
        onChangeText={text => setNameOfUser(text)}
        value={nameOfUser}
        width="100%"
        placeholder="First Name"
      />

      <CustomTextInput
        border={true}
        type={'email'}
        width="100%"
        value={stateEmail}
        onChangeText={text => setStateEmail(text)}
        placeholder="Email"
      />

      <TouchableOpacity onPress={()=> navigation.navigate('ChangePassword')}
        style={responsiveStyle.passwordContainer}>
        <Text
          style={responsiveStyle.passwordText}>
          Change Password
        </Text>
      </TouchableOpacity>

      <CustomButton
        type="primary"
        text="Update Profile"
        width="100%"
        onPress={handleUpdateProfile}
      />

      <Modal
        visible={modal}
        onRequestClose={() => setModal(false)}
        transparent={true}>
        <View style={responsiveStyle.modalBg}>
          <TouchableOpacity
            onPress={() => setModal(false)}
            style={responsiveStyle.close}>
            <Image
              source={require('../../assets/images/close.png')}
              style={responsiveStyle.edit}
            />
          </TouchableOpacity>
          <Image
            source={
              userImage === ''
                ? profileImage === ''
                  ? require('../../assets/images/dummy-user.png')
                  : {uri: profileImage}
                : {uri: userImage}
            }
            style={responsiveStyle.bigImage}
          />
        </View>
      </Modal>

      <Modal
        visible={modalChoose}
        onRequestClose={() => setModalChoose(false)}
        transparent={true}>
        <View style={responsiveStyle.modalBg}>
          <View style={responsiveStyle.selectBox}>
            <TouchableOpacity
              onPress={() => setModalChoose(false)}
              style={responsiveStyle.closeChoose}>
              <Image
                source={require('../../assets/images/close.png')}
                style={responsiveStyle.edit}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handlePickFromGallery}
              style={responsiveStyle.touch}>
              <Text style={responsiveStyle.pickText}>Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleFromCamera}
              style={responsiveStyle.touch}>
              <Text style={responsiveStyle.pickText}>Camera</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Profile;
