import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import colors from '../../common/colors';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import {useDispatch} from 'react-redux';
import {login} from '../../storage/actions';
import {useDimensionContext} from '../../context';
import style from './style';

const Login = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (email.trim() !== '' && password.trim() !== '') {
      await firestore()
        .collection('User')
        .where('admin', '==', true)
        .where('email', '==', email.trim().toLowerCase())
        .get()
        .then(async snapshot => {
          if (!snapshot.empty) {
            snapshot.forEach(documentSnapshot => {
              const respData = documentSnapshot.data();
              console.warn('respdata ', respData);
              if (password.trim() === respData.password) {
                dispatch(
                  login({
                    userId: documentSnapshot.id,
                    userName: respData.username,
                    email: respData.email,
                    profileImage: respData.profileimage,
                  }),
                );
                Snackbar.show({
                  text: 'Login successfull',
                  duration: Snackbar.LENGTH_LONG,
                  backgroundColor: colors.primary_green,
                  textColor: colors.white,
                });
              } else {
                Snackbar.show({
                  text: 'The password you entered is wrong',
                  duration: Snackbar.LENGTH_LONG,
                  backgroundColor: colors.primary_green,
                  textColor: colors.white,
                });
              }
            });
          }
        })
        .catch(err => console.warn(err));
    } else {
      Snackbar.show({
        text: 'The entered credentials are wrong. Please check again',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: colors.red,
        textColor: colors.white,
      });
    }
  };

  const handleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={{flex: 1}}>
      <Image
        source={require('../../assets/images/login-bg.jpg')}
        style={responsiveStyle.logInBgImg}
      />
      <ScrollView style={responsiveStyle.mainContainer}>
        <Image
          source={require('../../assets/images/logo-icon.png')}
          style={responsiveStyle.logInLogo}
        />
        <Text style={responsiveStyle.logInText}>Admin Login</Text>
        <CustomTextInput
          width="90%"
          border={true}
          placeholder="E-mail"
          onChangeText={text => setEmail(text)}
          icon={
            <Image
              source={require('../../assets/images/user-black.png')}
              style={responsiveStyle.icon}
            />
          }
        />
        <CustomTextInput
          width="90%"
          border={true}
          placeholder="Password"
          onChangeText={text => setPassword(text)}
          secureTextEntry={secureTextEntry}
          icon={
            <TouchableOpacity onPress={handleSecureTextEntry}>
              <Image
                source={
                  secureTextEntry
                    ? require('../../assets/images/eye_hide.png')
                    : require('../../assets/images/eye_view.png')
                }
                style={responsiveStyle.icon}
              />
            </TouchableOpacity>
          }
        />
        <CustomButton text="Login" onPress={handleLogin} width="90%" />
      </ScrollView>
    </View>
  );
};

export default Login;
