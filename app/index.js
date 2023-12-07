import { RefreshControl, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { COLORS, FONT, SIZES, SHADOWS, icons, images } from "../constants";
import { Stack, useRouter } from 'expo-router';
import ScreenHeaderBtn from '../components/common/header/ScreenHeaderBtn';
import Welcome from '../components/home/welcome/Welcome';
import Popularjobs from '../components/home/popular/Popularjobs';
import Nearbyjobs from '../components/home/nearby/Nearbyjobs';
import { useState } from 'react';
import usefetch from '../hook/usefetch';

export default function Page() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [refreshing, setRefreshing] = useState(false);

    //  // Data for the Welcome component
    //  const { data: welcomeData, error: welcomeError, isloading: welcomeIsLoading, refetch: refetchWelcome } = usefetch("welcome-endpoint", { /* welcome query params here */ });

     // Data for the Popularjobs component
     const { data: popularJobsData, error: popularJobsError, isloading: popularJobsIsLoading, refetch: refetchPopularJobs } = usefetch("search", {
        query: "React Developer",
        num_pages: 1,
      });
 
     // Data for the Nearbyjobs component
     const { data: nearbyJobsData, error: nearbyJobsError, isloading: nearbyJobsIsLoading, refetch: refetchNearbyJobs } = usefetch(
        'search',{
          query: 'Node Developer',
          num_pages: 1,
        });
 
     const onRefresh = () => {
         setRefreshing(true);
 
         // You can perform additional logic here if needed
 
         // Refetch data for Welcome component
        //  refetchWelcome();
 
         // Refetch data for Popularjobs component
         refetchPopularJobs();
 
         // Refetch data for Nearbyjobs component
         refetchNearbyJobs();
 
         setSearchTerm("");
 
         // Simulate a delay with setTimeout
         setTimeout(() => {
             setRefreshing(false);
         }, 2000);
     };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
        <Stack.Screen
        options={{
            headerStyle: {backgroundColor: COLORS.lightWhite},
            headerShadowVisible: false,
            headerLeft: () => (
                <ScreenHeaderBtn iconUrl={icons.menu} dimension= "70%" />
            ),
            headerRight: () => (
                <ScreenHeaderBtn iconUrl={images.profile} dimension= "100%" />
            ),
            headerTitle: ""
        }}
        />
        <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={COLORS.tertiary} // Change the color of the refresh indicator
            />
        }
        >
            <View style={{flex: 1, padding: SIZES.medium}}>
                <Welcome 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleClick= {() => {
                    if (searchTerm){
                        router.push(`/search/${searchTerm}`)
                    }
                    setSearchTerm("")
                }

                }
                />
                <Popularjobs />
                <Nearbyjobs />
            </View>
        </ScrollView>
    </SafeAreaView>
  );
};
