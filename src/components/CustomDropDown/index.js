import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../common/colors';

const CustomDropDown = props => {
  const {data, setData, currentStatus, createProduct, prevData} = props;
  const [activeSections, setActiveSections] = useState([]);
  const [selected, setSelected] = useState(prevData? prevData.name : data[0].name);

  useEffect(() => {
    if (data) {
      setSelected(prevData? prevData.name : currentStatus ?? data[0].name)
    }
  }, [ prevData]);

  const SECTION = [{id: 0, sectionData: prevData? prevData.name : data[0].name}];

  const _updateSections = activeSections => {
    setActiveSections(activeSections);
  };

  const _renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '99%',
        }}>
        <Text
          style={{
            color: colors.black_level_2,
            fontSize: 16,
            fontFamily: 'Lato-Regular',
          }}>
          {selected}
        </Text>
        <AntDesign name="down" size={25} colors={colors.black_level_2} />
      </View>
    );
  };

  const _renderContent = () => {
    return (
      <FlatList
        data={data}
        style={{marginTop: 10}}
        renderItem={({item, index}) => {
          if (item === selected) {
            return null;
          } else {
            return (
              <TouchableOpacity
                onPress={() => {
                  setData(createProduct ? item : item.name);
                  setSelected(item.name);
                  setActiveSections([]);
                }}
                style={{
                  borderTopColor: colors.black_level_3,
                  borderTopWidth: StyleSheet.hairlineWidth,
                  paddingVertical: 10,
                }}>
                <Text
                  style={{
                    color: colors.black_level_2,
                    fontSize: 16,
                    fontFamily: 'Lato-Regular',
                  }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }
        }}
      />
    );
  };

  return (
    <View>
      <Accordion
        sections={SECTION}
        activeSections={activeSections}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        onChange={_updateSections}
        underlayColor="transparent"
        sectionContainerStyle={{
          borderRadius: 8,
          borderWidth: 1,
          padding: 15,
          borderColor: colors.primary_green,
          backgroundColor: colors.white_level_3,
        }}
      />
    </View>
  );
};

export default CustomDropDown;
