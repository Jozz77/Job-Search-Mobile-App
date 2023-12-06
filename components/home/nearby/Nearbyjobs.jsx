import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator} from "react-native";

import styles from "./nearbyjobs.style";
import { useRouter } from "expo-router";
import { COLORS } from "../../../constants";
import usefetch from "../../../hook/usefetch";
import NearbyJobsCard from "./NearbyJobsCard";

const Nearbyjobs = () => {
  // console.log("Rendering Popularjobs");
  const router = useRouter();

  // const isLoading = false;
  // const error = false;

  const { data, isLoading, error}= usefetch(
    'search',{
      query: 'React Developer',
      num_pages: 1,
    }
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={ styles.headerTitle}>Nearby Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
           <View>
             <Text> Something went wrong here</Text>
          <Text>Error details: {JSON.stringify(error)}</Text>

           </View>
        ) : (
         data?.map((job) => (
         <NearbyJobsCard 
         job={job}ndl
         key={`nearby-job-${job?.job_id}`}
         handleNavigate = {() => router.push(`job-details/${job?.job_id}`)}
         />
         ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
