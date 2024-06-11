import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ImageBackground,
  Alert,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import splashbg from "../assets/splashbg.png";
import colors from "../colors";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const KlasifikasiFileScreen = () => {
  const navigation = useNavigation();
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");

  const handleChooseFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*", // This allows any type of file to be selected
      copyToCacheDirectory: true,
    });

    const { mimeType } = result.assets[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (!allowedTypes.includes(mimeType)) {
      Alert.alert(
        "File Tidak Disupport",
        "Harap pilih file dengan extensi jpg, jpeg, atau png."
      );
      return;
    }

    setFile(result.assets[0]);
    handleUploadFile(result);
  };

  const handleUploadFile = async (selectedFile) => {
    const data = new FormData();
    data.append("file", {
      name: selectedFile.name,
      type: selectedFile.mimeType,
      uri:
        Platform.OS === "ios"
          ? selectedFile.uri.replace("file://", "")
          : selectedFile.uri,
    });

    try {
      // const response = await axios.post('YOUR_API_URL', data, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });
      // console.log('Upload success', response.data);
      console.log("yey berhasil");
      setResult("Mangrove Jenis Avicennia alba");
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
        style={styles.backButton}
        onPress={() => navigation.navigate("home")}
      >
        <Ionicons name="chevron-back" size={32} color="black" />
        <Text style={styles.backButtonText}>Kembali Ke Menu Utama</Text>
      </TouchableOpacity>
      {file && <Image source={{ uri: file.uri }} style={styles.image} />}
      {file && <Text style={styles.fileName}>Selected File: {file.name}</Text>}
      <TouchableOpacity
        style={[styles.btn, styles.chooseBtn]}
        onPress={handleChooseFile}
      >
        <Text style={styles.btnText}>Pilih File</Text>
      </TouchableOpacity>
      {result && <Text style={styles.textPrediksi}>Klasifikasi: {result}</Text>}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    color : "black"
  },
  backButton: {
    flexDirection: "row",
    position: "absolute",
    top: 50,
    left: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    color: "black",
    fontSize: 20,
  },
  fileName: {
    fontSize: 16,
    color: "black",
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
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
});

export default KlasifikasiFileScreen;
