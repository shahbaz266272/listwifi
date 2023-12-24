import React, { useState } from "react"
import {
  View,
  ScrollView,
  SafeAreaView,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native"
import { Stack, useRouter } from "expo-router"
import { COLORS } from "../../constants"
import tw from "twrnc"
import { ActivityIndicator } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNotes } from "../../contexts/NoteProvider"

const Addjob = () => {
  const router = useRouter()
  const { notes, setNotes } = useNotes()
  const [isLoading, setisLoading] = useState(false)
  const [movieform, setmovieform] = useState({
    title: "",
    password: "",
    security: "",
    notes: "",
  })
  const AddMovie = () => {
    setisLoading(true)
    if (
      (movieform?.title === "",
      movieform?.password === "",
      movieform?.security === "",
      movieform?.notes === "")
    ) {
      alert("Insert Data in All Fields")
      setisLoading(false)
    } else {
      AsyncStorage.setItem(
        Math.random().toString(),
        JSON.stringify({
          title: movieform?.title,
          password: movieform?.password,
          security: movieform?.security,
          notes: movieform?.notes,
        })
      )
        .then((_res) => {
          alert("Wifi Added Successfully!")

          setisLoading(false)
          // router.back()
          setNotes({ callapi: Math.random() })
          router.push(`/`)
        })
        .catch((err) => {
          alert(err)

          setisLoading(false)
        })
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#DBB2FF" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitle: "Add New Movie",
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={tw`p-4 flex flex-col gap-2`}>
            <Text style={tw`text-[#DBB2FF] font-bold  text-lg`}>Title *</Text>
            <TextInput
              style={tw`bg-slate-200 rounded-lg p-2 text-[#DBB2FF]`}
              onChangeText={(text) =>
                setmovieform({
                  ...movieform,
                  title: text,
                })
              }
              placeholder="title"
              placeholderTextColor="#AEAEAE"
            />

            <Text style={tw`text-[#DBB2FF] font-bold  text-lg`}>
              Password *
            </Text>
            <TextInput
              style={tw`bg-slate-200 rounded-lg p-2 text-[#DBB2FF]`}
              onChangeText={(text) =>
                setmovieform({
                  ...movieform,
                  password: text,
                })
              }
              placeholder="password"
              placeholderTextColor="#AEAEAE"
            />
            <Text style={tw`text-[#DBB2FF] font-bold  text-lg`}>
              Security *
            </Text>
            <TextInput
              style={tw`bg-slate-200 rounded-lg p-2 text-[#DBB2FF]`}
              onChangeText={(text) =>
                setmovieform({
                  ...movieform,
                  security: text,
                })
              }
              placeholder="security"
              placeholderTextColor="#AEAEAE"
            />
            <Text style={tw`text-[#DBB2FF] font-bold  text-lg`}>Notes *</Text>
            <TextInput
              style={tw`bg-slate-200 rounded-lg p-2 text-[#DBB2FF]`}
              multiline
              onChangeText={(text) =>
                setmovieform({
                  ...movieform,
                  notes: text,
                })
              }
              placeholder="notes"
              placeholderTextColor="#AEAEAE"
            />

            {isLoading ? (
              <ActivityIndicator size="large" color={COLORS.primary} />
            ) : (
              <TouchableOpacity
                disabled={isLoading}
                style={tw`bg-[#DBB2FF] rounded-lg py-2 mt-3`}
                onPress={AddMovie}
              >
                <Text style={tw`text-white text-center text-lg`}>Add Wifi</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Addjob
