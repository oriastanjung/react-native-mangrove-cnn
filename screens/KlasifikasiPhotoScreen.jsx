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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
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
  const [loading, setLoading] = useState(false); // Loading state added
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    (async () => {
      await ImagePicker.requestCameraPermissionsAsync();
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleTakePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
      });
      if (!result.cancelled) {
        setSelectedImage(result.assets[0]);
        handleUploadFile(result.assets[0]);
      }
    } catch (error) {
      console.error("Error taking photo:", error);
    }
  };

  const handleUploadFile = async (image) => {
    try {
      setLoading(true); // Set loading to true when starting upload
      const base64 = await FileSystem.readAsStringAsync(image.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const response = await klasifikasiGambar(base64);
      setData(response.data_tanaman);
      setResult("Mangrove Jenis Avicennia alba");
    } catch (error) {
      console.log("Upload error", error);
    } finally {
      setLoading(false); // Set loading to false when upload is complete
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
              style={[
                styles.btn,
                styles.chooseBtn,
                
              ]}
              onPress={handleTakePhoto}
            >
              <Text style={styles.btnText}>Ambil Foto</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate("home")}
          >
            <Ionicons name="chevron-back" size={32} color="black" />
            <Text style={styles.backButtonText}>Kembali Ke Menu Utama</Text>
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
            <Text style={styles.backButtonText}>Kembali Ke Menu Utama</Text>
          </TouchableOpacity>
          <Image source={{ uri: selectedImage.uri }} style={styles.image} />
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.green} />
              <Text>Sedang Melakukan Klasifikasi</Text>
            </View>
          ) : (
            data && (
              <ScrollView>
                <View style={styles.groupInfo}>
                  <Text style={styles.infoTitle}>Hasil Klasifikasi :</Text>
                  <Text style={styles.infoDesc}>{data.nama}</Text>
                </View>
                <View style={styles.groupInfo}>
                  <Text style={styles.infoTitle}>Deskripsi :</Text>
                  <Text style={styles.infoDesc}>{data.dekripsi}</Text>
                </View>
                <View style={styles.groupInfo}>
                  <Text style={styles.infoTitle}>Ekologi :</Text>
                  <Text style={styles.infoDesc}>{data.ekologi}</Text>
                </View>
                <View style={styles.groupInfo}>
                  <Text style={styles.infoTitle}>Manfaat :</Text>
                  <Text style={styles.infoDesc}>{data.manfaat}</Text>
                </View>
                <View style={styles.groupInfo}>
                  <Text style={styles.infoTitle}>Penyebaran :</Text>
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
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "black",
  },
  infoDesc: {
    fontSize: 16,
    color: "black",
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
  image: { marginTop: 100, width: "100%", height: 400, marginBottom: 20 },
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
    backgroundColor: colors.green,
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
