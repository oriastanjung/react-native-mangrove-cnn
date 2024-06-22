import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../colors";

function Button({onClick, children, isLarge}) {
  return (
    <TouchableOpacity style={isLarge ? styles.btnDetailLg : styles.btnDetail} onPress={onClick}>
      <Text style={isLarge ? styles.btnTextLg : styles.btnText}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnDetailLg: {
    marginTop: 6,
    // backgroundColor: colors.primary,

    padding: 12,
    borderRadius: 16,
    borderWidth : 2,
    borderColor : colors.green,
    alignItems: "center", // Center text inside the button
  },
  btnDetail: {
    marginTop: 6,
    padding: 7,
    borderRadius: 16,
    borderWidth : 2,
    borderColor : colors.green,
    alignItems: "center", // Center text inside the button
  },
  btnTextLg :  {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "800",
  },
  btnText:  {
    color: "black",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
  },
});

export default Button;
