import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useLayoutEffect, useState, useCallback, useEffect} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import colors from '../../common/colors';
import NavigationBack from '../../common/NavigationBack';
import firestore from '@react-native-firebase/firestore';
import CustomTextInput from '../../components/CustomTextInput';
import Snackbar from 'react-native-snackbar';
import EmptyData from '../../common/EmptyData';
import {useDimensionContext} from '../../context';
import style from './style';
const Users = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );

  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Users',
      headerStyle: {
        backgroundColor: colors.white,
      },
      headerTintColor: colors.black_level_3,
      headerTitleStyle: {
        fontFamily: 'Lato-Bold',
        fontSize: 24,
      },
      headerLeft: () => <NavigationBack />,
    });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      getUsers();
    }, []),
  );
  useEffect(() => {}, [users]);

  const getUsers = async () => {
    await firestore()
      .collection('User')
      .where('admin', '==', false)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          Snackbar.show({
            text: 'no users found',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: colors.red,
            textColor: colors.white,
          });
        } else {
          const objArray = [];
          snapshot?.docs.forEach(document => {
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
          });
          setUsers(objArray);
        }
      });
  };

  const Header = () => (
    <CustomTextInput
      width={'95%'}
      border={true}
      value={searchText}
      placeholder={'Search here...'}
      onChangeText={text => handleSearch(text)}
      icon={
        <Image
          source={require('../../assets/images/search-black.png')}
          style={responsiveStyle.searchIcon}
        />
      }
    />
  );

  const handleSearch = async text => {
    setSearchText(text);
    await firestore()
      .collection('User')
      .orderBy('username')
      .startAt(text)
      .endAt(text + '\uf8ff')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          Snackbar.show({
            text: 'No results found',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: colors.red,
            textColor: colors.white,
          });
          setUsers([]);
        } else {
          const objArray = [];
          snapshot?.docs.forEach(document => {
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
          });
          setUsers(objArray);
        }
      });
  };

  const BlockUser = ({data}) => {
    return (
      <TouchableOpacity
        onPress={() => handleBlockUser(data)}
        style={[
          responsiveStyle.blockContainer,
          {borderColor: data?.active ? colors.red : colors.primary_green},
        ]}>
        <Text
          style={[
            responsiveStyle.blockText,
            {color: data?.active ? colors.red : colors.primary_green},
          ]}>
          {data?.active ? ' Block' : 'Unblock'}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleBlockUser = async data => {
    await firestore()
      .collection('User')
      .doc(data.id)
      .update({
        active: data?.active ? false : true,
      })
      .then(() => {
        const updated_users = users.map(obj => {
          if (obj.id === data?.id) {
            obj.active = data?.active ? false : true;
          }
          return obj;
        });
        setUsers(updated_users);
      });
  };
  return (
    <FlatList
      style={responsiveStyle.mainContainer}
      data={users}
      extraData={users}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => <Header />}
      ListEmptyComponent={() => <EmptyData />}
      renderItem={({item, index}) => (
        <View style={responsiveStyle.userContainer}>
          <Image
            source={
              item?.profileImage
                ? {uri: item?.profileImage}
                : require('../../assets/images/user-black.png')
            }
            style={responsiveStyle.userImage}
          />
          <View style={responsiveStyle.textContainer}>
            <Text style={responsiveStyle.userName}>{item?.username}</Text>
            <Text style={responsiveStyle.email}>{item?.email}</Text>
            <Text style={responsiveStyle.phone}>{item?.mobilenumber}</Text>
          </View>

          <BlockUser data={item} />
        </View>
      )}
    />
  );
};

export default Users;
