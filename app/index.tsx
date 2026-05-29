import React, { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

import { router } from "expo-router";

export default function Index() {
  // หน่วงเวลา 3 วินาที แล้วไปหน้า home
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/home");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* รูปกาแฟ */}
      <Image
        source={require("@/assets/images/coffeeshop.png")}
        style={styles.imgSty}
      />

      {/* ชื่อแอป */}
      <Text style={styles.txtSty1}>TOP BKK COFFEE</Text>

      {/* ข้อความ */}
      <Text style={styles.txtSty2}>ที่สุดของร้านกาแฟในกรุงเทพฯ</Text>

      {/* Loading */}
      <ActivityIndicator
        size="large"
        color="#4f1c02"
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  imgSty: {
    width: 150,
    height: 150,
  },

  txtSty1: {
    fontFamily: "Kanit_700Bold",
    fontSize: 30,
    marginTop: 20,
    color: "#4f1c02",
  },

  txtSty2: {
    fontFamily: "Kanit_400Regular",
    color: "#747474",
    marginTop: 10,
  },
});
