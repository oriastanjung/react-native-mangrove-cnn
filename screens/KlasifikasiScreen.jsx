import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import splashbg from "../assets/splashbg.png";
import colors from "../colors";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { klasifikasiGambar } from "../api/services/mangrove";

const KlasifikasiScreen = () => {
  const navigation = useNavigation();
  const [photo, setPhoto] = useState(null);
  const [result, setResult] = useState("");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

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
      setPhoto(result.assets[0]);
      handleUploadPhoto(result.assets[0]); // Memanggil handleUploadPhoto dengan foto yang dipilih
    }
  };

  const handleUploadPhoto = async (selectedPhoto) => {
    setLoading(true);
    try {
      const base64 = await FileSystem.readAsStringAsync(selectedPhoto.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const response = await klasifikasiGambar(base64);
      setData(response.data_tanaman);
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
            <Ionicons name="chevron-back" size={32} color="black" />
            <Text style={styles.backButtonText}>Kembali Ke Menu Utama</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, styles.chooseBtn]}
            onPress={handleChoosePhoto}
          >
            <Text style={styles.btnText}>Pilih Gambar</Text>
          </TouchableOpacity>
        </ImageBackground>
      )}
      {photo && (
        <SafeAreaView style={styles.containerKlasifikasi}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate("home")}
          >
            <Ionicons name="chevron-back" size={32} color="black" />
            <Text style={styles.backButtonText}>Kembali Ke Menu Utama</Text>
          </TouchableOpacity>
          <View style={{ paddingHorizontal: 16 }}>
            <Image source={{ uri: photo.uri }} style={styles.image} />
          </View>
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
              <Text>Sedang Melakukan Klasifikasi</Text>
            </View>
          ) : (
            <ScrollView>
              {data && (
                <>
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
                </>
              )}
            </ScrollView>
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
    zIndex: 2,
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
  },
  containerKlasifikasi: {
    flex: 1,
  },
  image: {
    marginTop: 100,
    width: "100%",
    height: 400,
    marginBottom: 20,
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

export default KlasifikasiScreen;
