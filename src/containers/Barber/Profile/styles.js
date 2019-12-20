import React, { Component } from "react";
import { Dimensions } from "react-native";
import Header from "../../../components/Header";
import { ScrollView } from "react-native-gesture-handler";
import colors from "../../../themes/colors";

const { height, width } = Dimensions.get("window");
const styles = {
  container: {
    width:width,
    backgroundColor: colors.themeBackground
  },
  detailsContainer: {
    flex: 1,
    alignItems: "center",
    marginBottom: 20
  },
  profileImageContainer: {
    height: width / 2.7,
    width: width / 2.7,
    borderRadius: width / 2.7 / 2,
    borderWidth: 1,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -width / 5
  },
  icon: {
    height: 50,
    width: 50,
    position: "absolute",
    top: 10,
    right: width / 2 - width / 2.7 / 2
  },
  iconContainer: {},
  profileImage: {
    height: width / 3,
    width: width / 3,
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  infoContainer: {
    height: height / 5,
    justifyContent: "space-around",
    width,
    alignItems: "center"
  },
  allFontStyle: {
    color: "#535361"
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white"
  },
  button: {
    width: width / 2.2,
    backgroundColor: "#FF0000",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 30,
    height: height / 19,
    alignItems: "center"
  },
  buttonText: { color: "white", fontSize: 15, fontWeight: "500" },
  review: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  reviewText: {
    fontSize: 12,
    color: colors.white
  },
  rating: { height: 30, width: width / 4 }
};
