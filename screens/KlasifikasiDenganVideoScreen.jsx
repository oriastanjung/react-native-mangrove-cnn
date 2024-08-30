import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Dimensions, // Import Dimensions
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { klasifikasiGambar } from "../api/services/mangrove";
import { Video } from "expo-av";
import splashbg from "../assets/splashbg.png";
import colors from "../colors";
import { BACKEND_URL } from "../config";

const KlasifikasiDenganVideoScreen = () => {
  const navigation = useNavigation();
  const [photo, setPhoto] = useState(null);
  const [result, setResult] = useState("");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true); // State for video loading

  const { width, height } = Dimensions.get("window"); // Get screen dimensions

  const handleChoosePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const { uri, fileSize } = await FileSystem.getInfoAsync(
        result.assets[0].uri
      );
      if (fileSize > 1.5 * 1024 * 1024) {
        Alert.alert(
          "File Size Error",
          "The selected file size exceeds 1.5 MB. Please select a smaller file."
        );
        return;
      }

      const compressedPhoto = await compressImage(result.assets[0]);
      setPhoto(compressedPhoto);
      handleUploadPhoto(compressedPhoto);
    }
  };

  const compressImage = async (photo) => {
    const manipResult = await ImageManipulator.manipulateAsync(
      photo.uri,
      [{ resize: { width: 600, height: 500 } }],
      { compress: 0.75, format: ImageManipulator.SaveFormat.JPEG }
    );
    return {
      uri: manipResult.uri,
      name: photo.name,
      type: "image/jpeg",
    };
  };

  const handleUploadPhoto = async (selectedPhoto) => {
    setLoading(true);
    try {
      const base64 = await FileSystem.readAsStringAsync(selectedPhoto.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const response = await klasifikasiGambar(base64);
      setData({ ...response.data_tanaman, confidence: response.confidence });
      setResult(response.message);
    } catch (error) {
      console.log("Upload error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!photo && (
        <ImageBackground
          resizeMode="cover"
          source={splashbg}
          style={styles.container}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate("home")}
          >
            <Ionicons name="chevron-back" size={32} color="white" />
            <Text style={{ ...styles.backButtonText, color: "white" }}>
              Back
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, styles.chooseBtn]}
            onPress={handleChoosePhoto}
          >
            <Text style={styles.btnText}>Open Gallery</Text>
          </TouchableOpacity>
        </ImageBackground>
      )}
      {photo && (
        <SafeAreaView style={styles.containerKlasifikasi}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate("home")}
          >
            <Ionicons name="chevron-back" size={32} color="white" />
            <Text style={{ ...styles.backButtonText, color: "white" }}>Back</Text>
          </TouchableOpacity>
          {/* <View style={{ paddingHorizontal: 16 }}>
            <Image source={{ uri: photo.uri }} style={styles.image} />
          </View> */}
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.greenDark} />
              <Text>
                Sedang Melakukan Klasifikasi
              </Text>
            </View>
          ) : (
            data && (
              // <ScrollView>
              //   <View style={styles.groupInfo}>
              //     <Text style={styles.infoTitle}>Classification Result :</Text>
              //     <Text style={styles.infoDesc}>{data.nama}</Text>
              //     <Text style={styles.infoDesc}>
              //       Confidence Level : {data.confidence}
              //     </Text>
              //   </View>
              //   <View style={styles.groupInfo}>
              //     <Text style={styles.infoTitle}>Description :</Text>
              //     <Text style={styles.infoDesc}>{data.dekripsi}</Text>
              //   </View>
              //   <View style={styles.groupInfo}>
              //     <Text style={styles.infoTitle}>Ecology :</Text>
              //     <Text style={styles.infoDesc}>{data.ekologi}</Text>
              //   </View>
              //   <View style={styles.groupInfo}>
              //     <Text style={styles.infoTitle}>Benefit :</Text>
              //     <Text style={styles.infoDesc}>{data.manfaat}</Text>
              //   </View>
              //   <View style={styles.groupInfo}>
              //     <Text style={styles.infoTitle}>Spread :</Text>
              //     <Text style={styles.infoDesc}>{data.penyebaran}</Text>
              //   </View>
              // </ScrollView>
              <ScrollView>
                <View style={styles.containerVideo}>
                  {videoLoading && (
                    <View style={styles.videoLoadingContainer}>
                      <ActivityIndicator
                        size="large"
                        color={"white"}
                      />
                      <Text style={{ color : "white" }}>Sedang Load Video</Text>
                    </View>
                  )}
                  <Video
                    source={{
                      uri: data.videoSRC,
                    }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="contain"
                    shouldPlay
                    onLoadStart={() => setVideoLoading(true)} // Start loading
                    onLoad={() => setVideoLoading(false)} // Stop loading when the video is loaded
                    style={{ width: width, height: height }} // Set video to full screen
                  />
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
  containerVideo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    position: "relative",
    // marginTop: 20,
  },
  videoLoadingContainer: {
    position: "absolute",
    top: "50%",
    left: "40%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  backButton: {
    flexDirection: "row",
    position: "absolute",
    top: 50,
    left: 10,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  backButtonText: {
    fontSize: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerKlasifikasi: {
    flex: 1,
    backgroundColor: "white",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
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
  },
  containerKlasifikasi: {
    flex: 1,
  },
  image: {
    marginTop: 100,
    width: "100%",
    height: 300,
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
});

export default KlasifikasiDenganVideoScreen;
