import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useDimensionContext} from '../../context';
import style from './style';
import {useNavigation} from '@react-navigation/native';
import NavigationBack from '../../common/NavigationBack';
import CustomTextInput from '../../components/CustomTextInput';
import firestore from '@react-native-firebase/firestore';
import CustomButton from '../../components/CustomButton';
import Snackbar from 'react-native-snackbar';
import colors from '../../common/colors';

const ChangePassword = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [adminData, setAdminData] = useState([]);

  let userId 
  let collectedPassword

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Change Password',
      headerLeft: () => <NavigationBack />,
    });
  }, [navigation]);

  useEffect(() => {
    fetchAdminDetails();
  }, []);


  adminData.map(data => {
   userId = data.id;
   collectedPassword = data.password
  })


  const fetchAdminDetails = async () => {
    firestore()
      .collection('User')
      .where('admin', '==', true)
      .get()
      .then(snapshot => {
        if (!snapshot.empty) {
          const result = [];
          snapshot.docs.forEach(document => {
            const respData = {id: document.id, ...document.data()};
            result.push(respData);
          });
          setAdminData(result);
        }
      });
  };

  const handleSubmit = async () => {
    if (
      currentPassword !== '' &&
      newPassword !== '' &&
      confirmPassword !== ''
    ) {
      if (currentPassword === collectedPassword) {
        if (newPassword === confirmPassword) {
          await firestore()
            .collection('User')
            .doc(userId)
            .update({password: newPassword})
            .then(
              navigation.navigate('Profile'),

              Snackbar.show({
                text: 'Password updated successfully',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: colors.green,
                textColor: colors.white,
              }),
            );
        } else {
          Snackbar.show({
            text: 'New password and Confirm password must be same',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: colors.red,
            textColor: colors.white,
          });
        }
      } else {
        Snackbar.show({
          text: 'Current password is incorrect',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: colors.red,
          textColor: colors.white,
        });
      }
    } else {
      Snackbar.show({
        text: 'Please fill all fields and continue',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: colors.red,
        textColor: colors.white,
      });
    }
  };

  return (
    <View style={responsiveStyle.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={responsiveStyle.Head}>Enter Details</Text>

        <CustomTextInput
          width="100%"
          border={true}
          value={currentPassword}
          placeholder="Current Password"
          onChangeText={text => setCurrentPassword(text)}
          secureTextEntry={true}
        />
        <CustomTextInput
          width="100%"
          border={true}
          value={newPassword}
          placeholder="New Password"
          onChangeText={text => setNewPassword(text)}
          secureTextEntry={true}
        />
        <CustomTextInput
          width="100%"
          border={true}
          value={confirmPassword}
          placeholder="Confirm Password"
          onChangeText={text => setConfirmPassword(text)}
          secureTextEntry={true}
        />
        <CustomButton text="Submit" onPress={handleSubmit} width="100%" />
      </ScrollView>
    </View>
  );
};

export default ChangePassword;
