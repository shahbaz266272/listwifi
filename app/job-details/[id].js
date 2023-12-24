import { Stack, useRouter, useSearchParams } from "expo-router"
import { useCallback, useEffect, useState } from "react"
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Share,
  Alert,
  TouchableOpacity,
} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import tw from "twrnc"
import QRCode from "react-qr-code"

import { ScreenHeaderBtn } from "../../components"
import { COLORS, icons } from "../../constants"
import { Image } from "react-native"
import { useNotes } from "../../contexts/NoteProvider"

const JobDetails = () => {
  const params = useSearchParams()
  const [isLoading, setisLoading] = useState(false)
  const [data, setdata] = useState({})
  const [error, seterror] = useState(false)
  const { notes, setNotes } = useNotes()

  const router = useRouter()

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    GetMovies()
    setRefreshing(false)
  }, [])

  const GetMovies = () => {
    setisLoading(true)
    seterror(false)
    AsyncStorage.getItem(params?.id)
      .then((res) => {
        setdata(JSON.parse(res))
        setisLoading(false)
      })
      .catch((err) => {
        setisLoading(false)
      })
  }
  useEffect(() => {
    GetMovies()
  }, [])
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Title: ${data.title}\nPassword: ${data.password}\nSecurity: ${data?.security}\nNotes: ${data?.notes}`,
      })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.error("Error sharing:", error.message)
    }
  }
  const deleteNote = async () => {
    await AsyncStorage.removeItem(params?.id?.toString())
    setNotes({ callapi: Math.random() })
    router.push(`/`)
  }
  const displayDeleteAlert = (id) => {
    Alert.alert(
      "Are You Sure!",
      "This action will delete this Wifi permanently!",
      [
        {
          text: "Delete",
          onPress: () => {
            deleteNote()
            // Trigger the onDelete function passed from the parent
          },
        },
        {
          text: "No Thanks",
          onPress: () => console.log("no thanks"),
        },
      ],
      {
        cancelable: true,
      }
    )
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#DBB2FF" },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={icons.share}
              dimension="60%"
              handlePress={handleShare}
            />
          ),
          headerTitle: "",
        }}
      />

      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : (
            <View style={tw`bg-white shadow-md h-full overflow-auto px-2 py-3`}>
              <View style={tw`flex flex-row gap-2 mt-2`}>
                <Text style={tw`text-[#000] text-2xl font-semibold `}>
                  Wifi:
                </Text>
                <Text style={tw`text-[#DBB2FF] text-2xl font-semibold `}>
                  {data?.title}
                </Text>
              </View>
              <View style={tw`flex flex-row gap-2 mt-2`}>
                <Text style={tw`text-[#000] text-2xl font-semibold `}>
                  Password:
                </Text>
                <Text style={tw`text-[#DBB2FF] text-2xl font-semibold `}>
                  {data?.password}
                </Text>
              </View>
              <View style={tw`flex flex-row gap-2 mt-2`}>
                <Text style={tw`text-[#000] text-2xl font-semibold `}>
                  Security:
                </Text>
                <Text style={tw`text-[#DBB2FF] text-2xl font-semibold `}>
                  {data?.security}
                </Text>
              </View>

              <View style={tw`flex flex-row justify-center align-middle py-6`}>
                <QRCode
                  size={250}
                  bgcolor="white"
                  fgColor="black"
                  value={`wifi:${data.title},password:${data.password}`}
                />
              </View>
              <View style={tw`flex flex-col gap-2 mt-2`}>
                <Text style={tw`text-[#000] text-2xl font-semibold `}>
                  Notes:
                </Text>
                <Text style={tw`text-[#DBB2FF] text-2xl font-semibold `}>
                  {data?.notes}
                </Text>
              </View>
              <View style={tw`flex flex-row justify-end`}>
                <TouchableOpacity
                  style={tw`p-2 rounded-lg`}
                  onPress={() => displayDeleteAlert()}
                >
                  <Image source={icons.deleteicon} style={tw`w-15 h-15`} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      </>
    </SafeAreaView>
  )
}

export default JobDetails
