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
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const AboutScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* <Image
        source={require("../assets/mangrove.png")}
        style={styles.mainImageTop}
      /> */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("home")}
      >
        <Ionicons name="chevron-back" size={32} color="white" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.headText}>
        <Text style={styles.text}>MANGROVE-ID</Text>
      </View>
      <View style={{ position : "absolute", zIndex : 100, bottom : "15%", display : "flex", flexDirection : "column", gap: 5, width : "80%",borderRadius : 24, paddingHorizontal : 16, backgroundColor : "white" , paddingVertical : 24  }}>
        <Text style={{ color : "black", fontSize : 18, fontWeight : "700" ,textAlign : "center" }}>Created by Mangrove ID</Text>
        <Text style={{ color : "black", fontSize : 18, fontWeight : "700" ,textAlign : "center" }}>2024 ©  All Rights Reserved</Text>
        <Text style={{ color : "black" , fontSize : 16, fontWeight : "700", marginTop : 30,textAlign : "left"  }}>People participated : </Text>
        <Text style={{ color : "black" , fontSize : 16, fontWeight : "500", marginTop : 25 ,textAlign : "left"}}>1. Dr. Donny Apdillah, S.Pi., M.Si</Text>
        <Text style={{ color : "black", fontSize : 16, fontWeight : "500", marginTop : 10 ,textAlign : "left"}}>2. Nola Ritha, S.T., M.Cs </Text>
        <Text style={{ color : "black", fontSize : 16, fontWeight : "500", marginTop : 10 ,textAlign : "left"}}>3. Trinanda </Text>
        <Text style={{ color : "black", fontSize : 16, fontWeight : "500", marginTop : 10 ,textAlign : "left"}}>4. Alramadan Oloansyah Dasopang </Text>
        <Text style={{ color : "black", fontSize : 16, fontWeight : "500", marginTop : 10 ,textAlign : "left"}}>5. Teti Herliana </Text>
        <Text style={{ color : "black", fontSize : 16, fontWeight : "500", marginTop : 10 ,textAlign : "left"}}>6. O. Riastanjung </Text>
      </View>
      <ImageBackground
        resizeMode="cover"
        source={splashbg}
        style={styles.gridContainer}
      ></ImageBackground>
    </View>
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
    zIndex: 100,
  },
  backButtonText: {
    color: "white",
    fontSize: 20,
  },
  infoBTN: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "5%",
    right: "5%",
  },
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
  headText: {
    backgroundColor: colors.greenDark,
    position: "absolute",
    top: 200,
    zIndex: 3,
    marginBottom: 20,
    // fontWeight: "400",
    borderRadius: 16,
    paddingHorizontal: 30,
    // paddingVertical: 10,
    paddingTop: 4,
    paddingBottom: 0,
  },
  text: {
    fontSize: 32,
    fontFamily: "Poppins_900Black",
    color: "white",
  },
  gridContainer: {
    flex: 1,
    paddingTop: 160,
    // marginTop: 150,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 5,
  },
  bottomSplash: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 100,
    zIndex: 2,
  },
  btn: {
    position: "relative",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 10,
    margin: 10, // Adds spacing between buttons
    width: 160, // Fixed width
    height: 160, // Fixed height
    justifyContent: "center", // Center the content vertically
  },
  btnBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.greenDark,
    // opacity: 0.75, // Set the desired opacity here
    borderRadius: 10, // Make sure the borderRadius matches the button's borderRadius
  },
  icon: {
    marginBottom: 20,
    zIndex: 1,
  },
  btnText: {
    fontFamily: "OpenSans_700Bold",
    color: "white",
    fontSize: 18,
    textAlign: "center",
    zIndex: 1,
    fontWeight: "700",
  },
});

export default AboutScreen;
