import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { FONT } from '../../../../constants'
import { checkImageURL } from '../../../../utils'

import styles from "./nearbyjobcard.style";

export default function NearbyJobsCard({job, handleNavigate}) {
  return (
    <TouchableOpacity 
        onPress={handleNavigate}
        style={styles.container}
    >
      <TouchableOpacity style={styles.logoContainer}>
        <Image 
         style={styles.logoImage} // Add appropriate styles here
         source={{ uri: checkImageURL(job.employer_logo) 
          ? job.employer_logo
          : 'https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg'
        }} 
         resizeMode='contain'
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={3}>{job.job_title}</Text>
        <Text style={styles.jobType} numberOfLines={1}>{job.job_employment_type}</Text>
      </View>
    </TouchableOpacity>
  )
}
