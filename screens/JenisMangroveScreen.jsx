import React from "react";
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

const ListComponent = ({ title, description, imgSRC }) => {
  return (
    <View style={styles.item}>
      <Image style={styles.itemImg} source={imgSRC} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemDesc}>{description}</Text>
      </View>
    </View>
  );
};

const data = [
  {
    title: "Avicenia alba",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint earum dicta iusto alias minus necessitatibus incidunt perspiciatis rem a praesentium hic, quo suscipit porro maiores nihil deserunt maxime placeat at?",
    imgSRC: require("../assets/mangrove.png"),
  },
  {
    title: "Avicenia alba1",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint earum dicta iusto alias minus necessitatibus incidunt perspiciatis rem a praesentium hic, quo suscipit porro maiores nihil deserunt maxime placeat at?",
    imgSRC: require("../assets/mangrove.png"),
  },
  {
    title: "Avicenia alba2",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint earum dicta iusto alias minus necessitatibus incidunt perspiciatis rem a praesentium hic, quo suscipit porro maiores nihil deserunt maxime placeat at?",
    imgSRC: require("../assets/mangrove.png"),
  },
  {
    title: "Avicenia alba3",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint earum dicta iusto alias minus necessitatibus incidunt perspiciatis rem a praesentium hic, quo suscipit porro maiores nihil deserunt maxime placeat at?",
    imgSRC: require("../assets/mangrove.png"),
  },
  {
    title: "Avicenia alba4",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint earum dicta iusto alias minus necessitatibus incidunt perspiciatis rem a praesentium hic, quo suscipit porro maiores nihil deserunt maxime placeat at?",
    imgSRC: require("../assets/mangrove.png"),
  },
  {
    title: "Avicenia alba5",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint earum dicta iusto alias minus necessitatibus incidunt perspiciatis rem a praesentium hic, quo suscipit porro maiores nihil deserunt maxime placeat at?",
    imgSRC: require("../assets/mangrove.png"),
  },
  {
    title: "Avicenia alba6",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint earum dicta iusto alias minus necessitatibus incidunt perspiciatis rem a praesentium hic, quo suscipit porro maiores nihil deserunt maxime placeat at?",
    imgSRC: require("../assets/mangrove.png"),
  },
  {
    title: "Avicenia alba7",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint earum dicta iusto alias minus necessitatibus incidunt perspiciatis rem a praesentium hic, quo suscipit porro maiores nihil deserunt maxime placeat at?",
    imgSRC: require("../assets/mangrove.png"),
  },
  {
    title: "Avicenia alba8",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint earum dicta iusto alias minus necessitatibus incidunt perspiciatis rem a praesentium hic, quo suscipit porro maiores nihil deserunt maxime placeat at?",
    imgSRC: require("../assets/mangrove.png"),
  },
  {
    title: "Avicenia alba9",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint earum dicta iusto alias minus necessitatibus incidunt perspiciatis rem a praesentium hic, quo suscipit porro maiores nihil deserunt maxime placeat at?",
    imgSRC: require("../assets/mangrove.png"),
  },
  {
    title: "Avicenia alba10",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint earum dicta iusto alias minus necessitatibus incidunt perspiciatis rem a praesentium hic, quo suscipit porro maiores nihil deserunt maxime placeat at?",
    imgSRC: require("../assets/mangrove.png"),
  },
];

const JenisMangroveScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("home")}
      >
        <Ionicons name="chevron-back" size={32} color="black" />
        <Text style={styles.backButtonText}>Kembali Ke Menu Utama</Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ListComponent
            title={item.title}
            description={item.description}
            imgSRC={item.imgSRC}
          />
        )}
        keyExtractor={(_, idx) => idx.toString()}
        contentContainerStyle={styles.listContentContainer}
      />
    </SafeAreaView>
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
