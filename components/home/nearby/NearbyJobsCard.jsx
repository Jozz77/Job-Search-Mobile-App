import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { FONT } from '../../../constants'
import { checkImageURL } from '../../../utils'

export default function NearbyJobsCard({job, handleNavigate}) {
  return (
    <TouchableOpacity 
        onPress={handleNavigate}
        style={{ flexDirection: 'row', alignItems: 'center', gap: 3, flex:  1 }}
    >
      <TouchableOpacity>
        <Image 
         style={{ width: 75, height: 75 }} // Add appropriate styles here
         source={{ uri: checkImageURL(job.employer_logo) 
          ? job.employer_logo
          : 'https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg'
        }} 
         resizeMode='contain'
        />
      </TouchableOpacity>

      <View>
        <Text style={{fontFamily: FONT.bold, fontSize: 14}} numberOfLines={3}>{job.job_title}</Text>
        <Text style={{fontFamily: FONT.bold, fontSize: 12}} numberOfLines={1}>{job.job_employment_type}</Text>
      </View>
    </TouchableOpacity>
  )
}
