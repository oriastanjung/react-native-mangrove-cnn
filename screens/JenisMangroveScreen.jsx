import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  FlatList,
  View,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../colors";
import { getAllMangrove } from "../api/services/mangrove";
import { BACKEND_URL } from "../config";

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

const ListComponent = ({ title, description, imgSRC, itemId }) => {
  const navigation = useNavigation();
  const handleItemClick = () => {
    // Navigasi ke halaman detail dengan menyertakan ID item
    navigation.navigate("DetailMangroveDataScreen", { itemId });
  };

  const imageUrl = `${BACKEND_URL}${imgSRC}`;
  const truncatedDescription = truncateText(description, 150);

  return (
    <View style={styles.item}>
      <Image style={styles.itemImg} source={{ uri: imageUrl }} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemDesc}>{truncatedDescription}</Text>
        <TouchableOpacity style={styles.btnDetail} onPress={handleItemClick}>
          <Text style={styles.btnText}>Detail</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const JenisMangroveScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllMangrove();
        setData(result); // Set data yang diterima ke state
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("home")}
      >
        <Ionicons name="chevron-back" size={32} color="black" />
        <Text style={styles.backButtonText}>Kembali Ke Menu Utama</Text>
      </TouchableOpacity>
      {/* {data && console.log(data[0].i)} */}
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ListComponent
            title={item.nama}
            description={item.dekripsi}
            imgSRC={
              item.imgSRC ? item.imgSRC : require("../assets/mangrove.png")
            }
            itemId={item.id}
          />
        )}
        keyExtractor={(item, idx) => idx.toString()}
        contentContainerStyle={styles.listContentContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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

export default JenisMangroveScreen;
