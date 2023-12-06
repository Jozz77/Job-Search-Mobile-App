import { Stack, useRouter, useSearchParams } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, RefreshControl, ScrollView, Text, View } from "react-native";
import usefetch from "../../hook/usefetch";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES, icons } from "../../constants";
import ScreenHeaderBtn from "../../components/common/header/ScreenHeaderBtn";
import Company from "../../components/jobdetails/company/Company";
import Tabs from "../../components/jobdetails/tabs/Tabs";
import Specifics from "../../components/jobdetails/specifics/Specifics";
import About from "../../components/jobdetails/about/About";
import Footer from "../../components/jobdetails/footer/Footer";

export default function JobDetails() {
  const params = useSearchParams();
  const router = useRouter();

  const tabs = ["About", "Qualifications", "Responsibilities"]
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const { data, error, isloading, refetch } = usefetch("job-details", {
    job_id: params.id,
  });

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {};

  const employerName = data?.[0]?.employer_name;
  console.log("Employer Name:", employerName || "N/A");

  if (error) {
    console.error("Fetch Error:", error);
  }
  const displayTabContent = () => {
    switch (activeTab) {
      case "Qualifications":
        return <Specifics
        title="Qualifications"
        points={data[0].job_highlights?.Qualifications ?? ['N/A']}
         />
      case "About":
        return <About
        info={data[0].job_description ?? "No data provided"}
        />
      case "Responsibilities":
        return <Specifics
        title="Responsibilities"
        points={data[0].job_highlights?.Responsibilities ?? ['N/A']}
         />
      default:
        break;
    }
  }
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      {/* <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerBackVisible: false,
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
          ),
          headerTitle: "",
        }}
      > */}
        
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}

          >
            {isloading ? (
                <ActivityIndicator size='large' color={COLORS.primary} />
            ) : error ? (
                <Text> Something went wrong</Text>
            ) : data.length === 0 ? (
                <Text>No data</Text>
            ) : (
                <View style={{flex: 1, padding: SIZES.medium, paddingBottom: 100 }}>
                    <Company 
                    companyLogo={data[0].employer_logo}
                    jobTitle={data[0].job_title}
                    companyName={data[0].employer_name}
                    location={data[0].job_country}
                    />

                    <Tabs 
                    tabs={tabs}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    />
                    {displayTabContent()}
                </View>
            )}
          </ScrollView>

          <Footer url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results'} />
      {/* </Stack.Screen> */}
    </SafeAreaView>
  );
}
