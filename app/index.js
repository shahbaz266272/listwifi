import React, { useState } from "react"
import {
  View,
  ScrollView,
  SafeAreaView,
  LogBox,
  StatusBar,
  TouchableOpacity,
  Text,
  Image,
} from "react-native"
import { Stack, useRouter } from "expo-router"
import { COLORS, icons, images, SIZES } from "../constants"
import tw from "twrnc"

import { Nearbyjobs, ScreenHeaderBtn } from "../components"
import { useNotes } from "../contexts/NoteProvider"
// Ignore log notification by message
LogBox.ignoreLogs(["Warning: ..."])

//Ignore all log notifications
LogBox.ignoreAllLogs()
const Home = () => {
  const router = useRouter()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <StatusBar hidden={false} barStyle="dark-content" />

      <Stack.Screen
        hidden
        options={{
          headerStyle: { backgroundColor: "#DBB2FF" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitle: "Wifi-List",
        }}
      />
      <View style={{ flex: 1, padding: SIZES.medium }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {/* <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) {
                router.push(`/search/${searchTerm}`)
              }
            }}
          /> */}
          <Nearbyjobs />
        </ScrollView>
        <View style={tw`flex flex-row justify-end`}>
          <TouchableOpacity
            style={tw`p-2 rounded-lg`}
            onPress={() => router.push(`/add-movie`)}
          >
            <Image source={icons.addwifi} resizeMode="cover" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Home
