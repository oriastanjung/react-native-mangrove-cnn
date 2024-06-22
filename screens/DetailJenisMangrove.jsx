import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import colors from "../colors";
import { getAllMangrove } from "../api/services/mangrove";
import { BACKEND_URL } from "../config";

function DetailJenisMangrove() {
  const navigation = useNavigation();
  const route = useRoute();
  const { itemId } = route.params;
  const [data, setData] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllMangrove();
        const selectedData = result.filter((item) => item.id == itemId);
        setData(selectedData[0]); // Set data yang diterima ke state
        setImageUrl(`${BACKEND_URL}${selectedData[0].imgSRC}`);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [itemId]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("jenisMangroveScreen")}
      >
        <Ionicons name="chevron-back" size={32} color="black" />
        <Text style={styles.backButtonText}>Kembali Ke Menu Utama</Text>
      </TouchableOpacity>
      {data && (
        <>
          <ScrollView>
            <View style={{ flex: 1, width: "100%", paddingHorizontal: 16 }}>
              <Image
                source={{ uri: imageUrl }}
                style={styles.mainImageTop}
              />
            </View>
            <View style={styles.groupInfo}>
              <Text style={styles.infoTitle}>Nama :</Text>
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
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
  mainImageTop: {
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
  btnDetail: {
    marginTop: 6,
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 10,
    alignItems: "center", // Center text inside the button
  },
  btnText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "800",
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
    color: "black",
    fontSize: 20,
  },
  item: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
    marginBottom: 40,
  },
  itemImg: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  itemInfo: {
    flex: 1,
    flexDirection: "column",
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  itemDesc: {
    fontSize: 14,
    fontWeight: "400",
  },
  container: {
    flex: 1,
    paddingTop: 100,
  },
  listContentContainer: {
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  text: {
    fontSize: 42,
  },
});

export default DetailJenisMangrove;
