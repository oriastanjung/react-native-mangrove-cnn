import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import splashbg from "../assets/splashbg.png";
import colors from "../colors";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/mangrove.png")}
        style={styles.mainImageTop}
      />
      <Text style={styles.text}>MANGROVE-ID</Text>
      <ImageBackground
        resizeMode="cover"
        source={splashbg}
        style={styles.gridContainer}
      >
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("klasifikasiScreen")}
          >
            <View style={styles.btnBackground} />
            <Ionicons
              name="image-outline"
              size={84}
              color="white"
              style={styles.icon}
            />
            <Text style={styles.btnText}>Unggah Gambar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("klasifikasiFileScreen")}
          >
            <View style={styles.btnBackground} />
            <Feather name="file-text" size={84} color="white"  style={styles.icon}/>
            <Text style={styles.btnText}>Unggah File</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("photoKlasifikasiScreen")}
          >
            <View style={styles.btnBackground} />
            <AntDesign name="camerao" size={84} color="white" style={styles.icon} />
            <Text style={styles.btnText}>Ambil Gambar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("jenisMangroveScreen")}
          >
            <View style={styles.btnBackground} />
            <MaterialCommunityIcons name="file-document-edit-outline" size={84} color="white" style={styles.icon}/>
            <Text style={styles.btnText}>Daftar Jenis</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  mainImageTop: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 200,
    zIndex: 1,
  },
  text: {
    backgroundColor: colors.green,
    position: "absolute",
    top: 160,
    zIndex: 3,
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "900",
    color: "white",
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  gridContainer: {
    flex: 1,
    paddingTop : 100,
    marginTop: 150,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 50,
  },
  btn: {
    position: "relative",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 10,
    margin: 10, // Adds spacing between buttons
    width: 180, // Fixed width
    height: 180, // Fixed height
    justifyContent: "center", // Center the content vertically
  },
  btnBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.green,
    opacity: 0.75, // Set the desired opacity here
    borderRadius: 10, // Make sure the borderRadius matches the button's borderRadius
  },
  icon: {
    marginBottom: 20,
    zIndex: 1,
  },
  btnText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    zIndex: 1,
    fontWeight : "700"
  },
});

export default HomeScreen;