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
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import splashbg from "../assets/splashbg.png";
import colors from "../colors";
import { klasifikasiGambar } from "../api/services/mangrove";
import { Video } from "expo-av";

const KlasifikasiFileScreen = () => {
  const navigation = useNavigation();
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true); // State for video loading

  const { width, height } = Dimensions.get("window"); // Get screen dimensions
  const handleChooseFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // This allows any type of file to be selected
        copyToCacheDirectory: true,
      });

      if (result.type === "cancel") {
        console.log("File selection canceled");
        return;
      }

      // console.log("Document Picker Result:", result);

      const { mimeType, uri } = result.assets[0];

      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/JPG",
        "image/PNG",
        "image/JPEG",
      ];

      if (!allowedTypes.includes(mimeType)) {
        Alert.alert(
          "File Not Supported",
          "Please use file with extension jpg, jpeg, or png."
        );
        return;
      }

      setFile(result.assets[0]);
      handleUploadFile(result.assets[0]);
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  const handleUploadFile = async (selectedFile) => {
    setLoading(true);
    try {
      const base64 = await FileSystem.readAsStringAsync(selectedFile.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const response = await klasifikasiGambar(base64);
      // setData(response.data_tanaman);
      setData({ ...response.data_tanaman, confidence: response.confidence });
      console.log("response >> ", response);
      setResult("Sukses");
      setLoading(false);
    } catch (error) {
      console.log("Upload error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!file && (
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
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, styles.chooseBtn]}
            onPress={handleChooseFile}
          >
            <Text style={styles.btnText}>Upload File</Text>
          </TouchableOpacity>
        </ImageBackground>
      )}
      {file && (
        <SafeAreaView style={styles.containerKlasifikasi}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate("home")}
          >
            <Ionicons name="chevron-back" size={32} color="white" />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          {/* <View style={{ paddingHorizontal: 16 }}>
            <Image source={{ uri: file.uri }} style={styles.image} />
          </View> */}
          {loading ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                flexDirection: "row",
                gap: 5,
                justifyContent: "center",
              }}
            >
              <ActivityIndicator size="large" color={colors.greenDark} />
              <Text style={{ color : "white" }}>Sedang Melakukan Klasifikasi</Text>
            </View>
          ) : (
            // data && (
            //   <ScrollView>
            //     <View style={styles.groupInfo}>
            //       <Text style={styles.infoTitle}>Classification Result :</Text>
            //       <Text style={styles.infoDesc}>{data.nama}</Text>
            //       <Text style={styles.infoDesc}>Confidence Level : {data.confidence}</Text>
            //     </View>
            //     <View style={styles.groupInfo}>
            //       <Text style={styles.infoTitle}>Description :</Text>
            //       <Text style={styles.infoDesc}>{data.dekripsi}</Text>
            //     </View>
            //     <View style={styles.groupInfo}>
            //       <Text style={styles.infoTitle}>Ecology :</Text>
            //       <Text style={styles.infoDesc}>{data.ekologi}</Text>
            //     </View>
            //     <View style={styles.groupInfo}>
            //       <Text style={styles.infoTitle}>Benefit :</Text>
            //       <Text style={styles.infoDesc}>{data.manfaat}</Text>
            //     </View>
            //     <View style={styles.groupInfo}>
            //       <Text style={styles.infoTitle}>Spread :</Text>
            //       <Text style={styles.infoDesc}>{data.penyebaran}</Text>
            //     </View>
            //   </ScrollView>
            // )
            data && (
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
                    onLoad={() => setVideoLoading(false)} // Stop loading when the video is loaded\
                    onEnd
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
    // marginTop: 20,
  },
  backButton: {
    flexDirection: "row",
    position: "absolute",
    top: 50,
    left: 10,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
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
  backButtonText: {
    color: "white",
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
    shadowColor: "#000", // Shadow color
    shadowOffset: {
      // Offset of the shadow
      width: 0, // Horizontal offset
      height: 2, // Vertical offset
    },
    shadowOpacity: 0.25, // Opacity of the shadow
    shadowRadius: 3.84, // Blur radius of the shadow
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
    backgroundColor:"black"
  },
  image: {
    marginTop: 100,
    width: "100%",
    height: 400,
    marginBottom: 20,
    width: "100%",
    borderRadius: 30,
    height: 300,
    zIndex: 1,
    // Shadow properties
    shadowColor: "#000", // Shadow color
    shadowOffset: {
      // Offset of the shadow
      width: 0, // Horizontal offset
      height: 4, // Vertical offset
    },
    shadowOpacity: 0.3, // Opacity of the shadow
    shadowRadius: 4.65, // Blur radius of the shadow
    elevation: 8,
  },

  backButtonText: {
    color: "white",
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
    backgroundColor: colors.greenDark,
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

export default KlasifikasiFileScreen;
