import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { checkImageURL } from '../../../../utils'
import { FONT } from '../../../../constants'

import styles from "./popularjobcard.style";

export default function PopularJobCard({item, selectedJob,  handleCardPress}) {
  return (
    <TouchableOpacity 
        onPress={handleCardPress}
    >
      <TouchableOpacity>
        <Image 
         style={{ width: 75, height: 75 }} // Add appropriate styles here
         source={{ uri: checkImageURL(item.employer_logo) 
          ? item.employer_logo
          : 'https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg'
        }} 
         resizeMode='contain'
        />
      </TouchableOpacity>
      <Text numberOfLines={1}>{item.employer_name}</Text>

      <View>
        <Text style={{fontFamily: FONT.bold, fontSize: 14}} numberOfLines={1}>{item.job_title}</Text>
        <Text style={{fontFamily: FONT.bold, fontSize: 12}} numberOfLines={1}>{item.job_country}</Text>
      </View>
    </TouchableOpacity>
  )
}
