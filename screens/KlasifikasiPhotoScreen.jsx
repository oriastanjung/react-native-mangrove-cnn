import React, { useEffect, useRef, useState } from "react";
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
import * as ImagePicker from "expo-image-picker"; // Ubah import ini
import axios from "axios";
import splashbg from "../assets/splashbg.png";
import colors from "../colors";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import { CameraView } from "expo-camera";
const KlasifikasiPhotoScreen = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(false);
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = useRef(null);
  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasPermission(cameraPermission);
      console.log("permisssion >> ]", cameraPermission);
    })();
  }, []);

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      try {
        const options = { quality: 1 }; // Adjust quality for performance/size trade-off
        const data = await cameraRef.current.takePictureAsync(options);
        setCapturedImage(data);
        // Handle upload if camera is ready (prevents accidental upload)
        await handleUploadFile(data);
      } catch (error) {
        console.error("Error taking photo:", error);
      }
    }
  };

  const handleUploadFile = async (selectedFile) => {
    const data = new FormData();
    data.append("file", {
      name: "photo.jpg", // Nama file yang diunggah (bisa disesuaikan)
      type: "image/jpeg", // Tipe file gambar
      uri: selectedFile.uri,
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
      {!capturedImage && (
        <View
          style={{
            paddingVertical: 100,
            flex: 1,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CameraView ref={cameraRef} style={styles.camera} facing={"back"}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                position: "relative",
                bottom: 0,
              }}
            >
              <TouchableOpacity
                style={[
                  styles.btn,
                  styles.chooseBtn,
                  { position: "absolute", bottom: 0 },
                ]}
                onPress={handleTakePhoto} // Mengubah onPress event
              >
                <Text style={styles.btnText}>Ambil Foto</Text>
              </TouchableOpacity>
            </View>
          </CameraView>
        </View>
      )}
      {capturedImage && console.log(capturedImage)}
      {capturedImage && (
        <Image source={{ uri: capturedImage.uri }} style={styles.image} />
      )}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("home")}
      >
        <Ionicons name="chevron-back" size={32} color="black" />
        <Text style={styles.backButtonText}>Kembali Ke Menu Utama</Text>
      </TouchableOpacity>
      {file && <Image source={{ uri: file.uri }} style={styles.image} />}
      {file && <Text style={styles.fileName}>Selected File: {file.name}</Text>}

      {result && <Text style={styles.textPrediksi}>Klasifikasi: {result}</Text>}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    width: "90%",
    height: 500,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    color: "black",
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

export default KlasifikasiPhotoScreen;
