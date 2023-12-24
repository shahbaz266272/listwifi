import { View, Text, TouchableOpacity, Image, Alert } from "react-native"

import styles from "./nearbyjobcard.style"
import { checkImageURL } from "../../../../utils"
import Swipeout from "react-native-swipeout"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { COLORS, icons, images } from "../../../../constants"
import tw from "twrnc"
import InternetIcon from "../../InternetIcon"
import RightIcon from "../../nexticon"

const NearbyJobCard = ({ job, handleNavigate, onDelete }) => {
  const deleteNote = async () => {
    await AsyncStorage.removeItem(job?.id?.toString())
    onDelete()
  }
  const displayDeleteAlert = () => {
    Alert.alert(
      "Are You Sure!",
      "This action will delete your Movie permanently!",
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

  const swipeoutBtns = [
    {
      text: "Delete",
      backgroundColor: "red",
      style: { borderRadius: 10 },
      onPress: displayDeleteAlert,
    },
  ]
  return (
    <Swipeout right={swipeoutBtns} autoClose={true} backgroundColor="#fff">
      <TouchableOpacity style={styles.container} onPress={handleNavigate}>
        <TouchableOpacity>
          <InternetIcon />
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text style={styles.jobName} numberOfLines={1}>
            {job?.title}
          </Text>

          <Text style={styles.jobType}>{job.security}</Text>
        </View>

        <TouchableOpacity>
          <RightIcon />
        </TouchableOpacity>
      </TouchableOpacity>
    </Swipeout>
  )
}

export default NearbyJobCard
