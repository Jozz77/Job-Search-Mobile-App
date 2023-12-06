import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'

import styles from './tabs.style'
import { SIZES } from '../../../constants';
import Specifics from '../specifics/Specifics';



const TabButton = ({ name, activeTab, onHandleSearchType }) => {
  return (
    <TouchableOpacity style={styles.btn(name, activeTab)} onPress={onHandleSearchType}>
      <Text style={styles.btnText(name, activeTab)}>{name}</Text>
    </TouchableOpacity>
  );
};


const Tabs = ({tabs, activeTab, setActiveTab}) => {
  return (
    <View style={styles.container}>
      {/* <Text>jjjjjdj</Text> */}
      <FlatList 
      data={tabs}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ columnGap:SIZES.medium / 2}}
      renderItem={({item}) => (
        <TabButton
        name={item}
        activeTab={activeTab}
        onHandleSearchType={() => setActiveTab(item)}
        keyExtractor={(item) => item}
         />
  )}
      />
    </View>
  )
}

export default Tabs