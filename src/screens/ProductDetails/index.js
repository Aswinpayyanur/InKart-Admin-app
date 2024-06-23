import {View, Text, Image, ScrollView, StyleSheet} from 'react-native';
import React, {useLayoutEffect, useRef, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import colors from '../../common/colors';
import NavigationBack from '../../common/NavigationBack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Accordion from 'react-native-collapsible/Accordion';
import style from './style';
import {useDimensionContext} from '../../context';
import CustomTextInput from '../../components/CustomTextInput';
import ActionSheet from 'react-native-actions-sheet';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ProductDetails = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );

  const navigation = useNavigation();
  const route = useRoute();
  const product = route.params.product;
  const actionSheetRef = useRef(null);

  const [curActiveSections, setCurActiveSections] = useState([0]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Description',

      headerLeft: () => <NavigationBack />,
      headerRight: () => <RightComponent />,
    });
  }, [navigation]);

  const RightComponent = () => {
    return (
      <TouchableOpacity onPress={() => {navigation.navigate('CreateProduct', {type: 'edit', data: product})} }>
        <FontAwesome name="edit" size={30} color={colors.black_level_2} />
      </TouchableOpacity>
    );
  };

  const DetailsArray = [
    {
      title: 'Manufacture details',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
    },
    {
      title: 'Product Disclaimer',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
    },
    {
      title: 'Features & details',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
    },
  ];

  const _updateSections = activeSections => {
    setCurActiveSections(activeSections);
  };
  const _renderHeader = sections => {
    return (
      <View
        style={responsiveStyle.descriptionContainer}>
        <Text style={responsiveStyle.descriptionHead}>{sections.title}</Text>
        <AntDesign name="down" size={25} color={colors.gray} />
      </View>
    );
  };
  const _renderContent = sections => {
    return (
      <View>
        <Text style={responsiveStyle.description}>{sections.content}</Text>
      </View>
    );
  };

  

  return (
    <ScrollView style={responsiveStyle.scrollViewContainer}>
      <View style={responsiveStyle.innerView}>
        <Image
          source={{uri: product.image}}
          style={responsiveStyle.image}
        />
      </View>

      <View style={responsiveStyle.contentView}>
        <Text
          style={responsiveStyle.mainHead}>
          {product.name}
        </Text>

        <Text
          style={responsiveStyle.price}>
          ₹{product.price}
          {'  '}
          <Text
            style={responsiveStyle.off}>
            25% off
          </Text>
        </Text>
        <View
          style={responsiveStyle.productDetailsView}>
          <Text style={responsiveStyle.descriptionHead}>Product Details</Text>
          <Text style={responsiveStyle.description}>
            {product?.description}
          </Text>
        </View>
        <Accordion
          activeSections={curActiveSections}
          sections={DetailsArray}
          renderHeader={_renderHeader}
          renderContent={_renderContent}
          onChange={_updateSections}
          underlayColor="transparent"
          sectionContainerStyle={{
            paddingVertical: 10,
            borderBottomColor: colors.gray,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <View>
          <Text style={responsiveStyle.deliveryHead}>
            Check Deliverypin code
          </Text>
          <Text style={responsiveStyle.commonText}>
            Enter pin code to check delivery date/pickup option.
          </Text>
          <CustomTextInput
            width="100%"
            border={true}
            placeholder="Pin-code"
            onChangeText={text => {}}
            icon={<Text>Check</Text>}
          />
          <Text style={responsiveStyle.commonText}>
            Free delivery on orders above 499.00.
          </Text>
          <Text style={responsiveStyle.commonText}>
            cash on delivery available
          </Text>
          <Text style={responsiveStyle.commonText}>
            Easy 7 days return and replacement
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductDetails;
