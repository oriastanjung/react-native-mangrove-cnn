import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ImageBackground,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import splashbg from "../assets/splashbg.png";
import colors from "../colors";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
const KlasifikasiScreen = () => {
  const navigation = useNavigation();
  const [photo, setPhoto] = useState(null);
  const [result, setResult] = useState("");

  const handleChoosePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0]);
      handleUploadPhoto(result.assets[0]); // Memanggil handleUploadPhoto dengan foto yang dipilih
    }
  };

  const handleUploadPhoto = async (selectedPhoto) => {
    const data = new FormData();
    data.append("photo", {
      name: selectedPhoto.uri.split("/").pop(),
      type: "image/jpeg",
      uri:
        Platform.OS === "ios"
          ? selectedPhoto.uri.replace("file://", "")
          : selectedPhoto.uri,
    });

    try {
      // const response = await axios.post('YOUR_API_URL', data, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });
      // console.log('Upload success', response.data);
      console.log("yey berhasil");
      setResult("Mangrove Jenis Agreviana alba");
    } catch (error) {
      console.log("Upload error", error);
    }
  };

  return (
    <ImageBackground
      resizeMode="cover"
      source={splashbg}
      style={styles.container}
    >
      <TouchableOpacity
        style={{flex : 1, flexDirection : "row", position : "absolute", top : 50, left : 10, justifyContent : "center", alignItems :"center"}}
        onPress={() => navigation.navigate("home")}
      >
        <Ionicons name="chevron-back" size={32} color="black" />
        <Text style={{color : "black", fontSize : 20}}>Kembali Ke Menu Utama</Text>
      </TouchableOpacity>
      {photo && <Image source={{ uri: photo.uri }} style={styles.image} />}
      <TouchableOpacity
        style={[styles.btn, styles.chooseBtn]}
        onPress={handleChoosePhoto}
      >
        <Text style={styles.btnText}>Pilih Gambar</Text>
      </TouchableOpacity>

      {result && (
        <Text style={styles.textPrediksi}>Klasifikasi : {result}</Text>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  btn: {
    width: "70%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  btnText: {
    color: "white",
    fontSize: 18,
  },
  chooseBtn: {
    backgroundColor: colors.green,
  },
  uploadBtn: {
    backgroundColor: "#5C6BC0",
  },
  textPrediksi: {
    fontSize: 18,
    color: "black",
    fontWeight: "600",
  },
});

export default KlasifikasiScreen;
