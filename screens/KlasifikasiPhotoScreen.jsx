import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator"; // Import ImageManipulator
import splashbg from "../assets/splashbg.png";
import colors from "../colors";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { klasifikasiGambar } from "../api/services/mangrove";

const KlasifikasiPhotoScreen = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(false);
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleTakePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
      });
      if (!result.canceled) {
        const compressedImage = await compressImage(result.assets[0]);
        const fileInfo = await FileSystem.getInfoAsync(compressedImage.uri);
        if (fileInfo.size > 1.5 * 1024 * 1024) {
          Alert.alert("File too large", "Please select an image less than 1.5MB.");
          return;
        }
        setSelectedImage(compressedImage);
        handleUploadFile(compressedImage);
      }
    } catch (error) {
      console.error("Error taking photo:", error);
    }
  };

  const compressImage = async (image) => {
    const manipResult = await ImageManipulator.manipulateAsync(
      image.uri,
      [{ resize: { width: 600, height: 500 } }], // Resize the image
      { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG } // Adjust compression as needed
    );
    return {
      uri: manipResult.uri,
      name: image.name,
      type: "image/jpeg",
    };
  };

  const handleUploadFile = async (image) => {
    try {
      setLoading(true);
      const base64 = await FileSystem.readAsStringAsync(image.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const response = await klasifikasiGambar(base64);
      setData({ ...response.data_tanaman, confidence: response.confidence });
      setResult("Success");
      setLoading(false);
    } catch (error) {
      console.error("Upload error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!selectedImage && (
        <ImageBackground
          resizeMode="cover"
          source={splashbg}
          style={styles.container}
        >
          <View style={styles.cameraContainer}>
            <TouchableOpacity
              style={[styles.btn, styles.chooseBtn]}
              onPress={handleTakePhoto}
            >
              <Text style={styles.btnText}>Open Camera</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate("home")}
          >
            <Ionicons name="chevron-back" size={32} color="black" />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </ImageBackground>
      )}
      {selectedImage && (
        <SafeAreaView style={styles.containerKlasifikasi}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate("home")}
          >
            <Ionicons name="chevron-back" size={32} color="black" />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <View style={{ paddingHorizontal: 16 }}>
            <Image source={{ uri: selectedImage.uri }} style={styles.image} />
          </View>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.green} />
              <Text>Sedang Melakukan Klasifikasi</Text>
            </View>
          ) : (
            data && (
              <ScrollView>
                <View style={styles.groupInfo}>
                  <Text style={styles.infoTitle}>Classification Result :</Text>
                  <Text style={styles.infoDesc}>{data.nama}</Text>
                  <Text style={styles.infoDesc}>Confidence Level : {data.confidence}</Text>
                </View>
                <View style={styles.groupInfo}>
                  <Text style={styles.infoTitle}>Description :</Text>
                  <Text style={styles.infoDesc}>{data.dekripsi}</Text>
                </View>
                <View style={styles.groupInfo}>
                  <Text style={styles.infoTitle}>Ecology :</Text>
                  <Text style={styles.infoDesc}>{data.ekologi}</Text>
                </View>
                <View style={styles.groupInfo}>
                  <Text style={styles.infoTitle}>Benefit :</Text>
                  <Text style={styles.infoDesc}>{data.manfaat}</Text>
                </View>
                <View style={styles.groupInfo}>
                  <Text style={styles.infoTitle}>Spread :</Text>
                  <Text style={styles.infoDesc}>{data.penyebaran}</Text>
                </View>
              </ScrollView>
            )
          )}
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
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
  groupInfo: {
    paddingHorizontal: 30,
    marginTop: 15,
    marginBottom: 10,
    borderWidth: 1,
    marginHorizontal: 20,
    borderRadius: 16,
    borderColor: "white",
    padding: 10,
    backgroundColor: "white",
    // Shadow properties
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 9,
  },
  infoTitle: {
    fontSize: 24,
    fontWeight: "600",
    fontFamily: "OpenSans_600Semibold",
  },
  infoDesc: {
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
    fontWeight: "400",
    textAlign: "justify",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    color: "black",
  },
  containerKlasifikasi: {
    flex: 1,
    backgroundColor: "white",
    color: "black",
  },
  image: {
    marginTop: 100,
    width: "100%",
    height: 400,
    marginBottom: 20,
    borderRadius: 30,
    zIndex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  cameraContainer: {
    paddingVertical: 100,
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
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
    backgroundColor: colors.greenDark,
  },
  uploadBtn: {
    backgroundColor: "#5C6BC0",
  },
  loadingContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  textPrediksi: {
    fontSize: 18,
    color: "black",
    fontWeight: "600",
  },
});

export default KlasifikasiPhotoScreen;
