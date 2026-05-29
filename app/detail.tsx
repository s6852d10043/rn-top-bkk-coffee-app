// =========================
// Import Icon ต่าง ๆ
// =========================
import { Ionicons } from "@expo/vector-icons";

// =========================
// ใช้รับค่าที่ส่งมาจากหน้า Home
// =========================
import { useLocalSearchParams } from "expo-router";

import React from "react";

// =========================
// Import Component พื้นฐาน
// =========================
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// =========================
// Import แผนที่ + Marker
// =========================
import MapView, { Marker } from "react-native-maps";

export default function Detail() {
  // =========================
  // รับค่าที่ส่งมาจากหน้า Home
  // =========================
  const { name, district, description, image_url, phone, latitude, longitude } =
    useLocalSearchParams();

  // =========================
  // ฟังก์ชันเปิด Google Maps
  // =========================
  const openMap = () => {
    Linking.openURL(
      `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
    );
  };

  // =========================
  // ฟังก์ชันโทรศัพท์
  // ใช้ได้ทั้ง Android และ iOS
  // =========================
  const handleCall = async () => {
    try {
      // ลบตัวอักษรที่ไม่ใช่ตัวเลข
      const cleanPhone = String(phone).replace(/[^0-9+]/g, "");

      // เปิดหน้าโทรศัพท์
      await Linking.openURL(`tel:${cleanPhone}`);
    } catch (error) {
      console.log("Phone call error:", error);
    }
  };

  return (
    // =========================
    // ScrollView สำหรับเลื่อนหน้าจอ
    // =========================
    <ScrollView style={styles.container}>
      {/* =========================
          รูปร้านกาแฟ
      ========================= */}
      <Image source={{ uri: String(image_url) }} style={styles.image} />

      {/* =========================
          กล่องข้อมูลร้าน
      ========================= */}
      <View style={styles.content}>
        {/* =========================
            ชื่อร้าน
        ========================= */}
        <Text style={styles.name}>{name}</Text>

        {/* =========================
            แถวแสดงเขต
        ========================= */}
        <View style={styles.row}>
          {/* ไอคอนหมุด */}
          <Ionicons name="location-sharp" size={18} color="red" />

          {/* เขต */}
          <Text style={styles.district}>{district}</Text>
        </View>

        {/* =========================
            หัวข้อรายละเอียดร้าน
        ========================= */}
        <Text style={styles.title}>รายละเอียดร้าน</Text>

        {/* =========================
            รายละเอียดร้าน
        ========================= */}
        <Text style={styles.description}>{description}</Text>

        {/* =========================
            ปุ่มโทรศัพท์
        ========================= */}
        <TouchableOpacity style={styles.button} onPress={handleCall}>
          {/* ไอคอนโทร */}
          <Ionicons name="call" size={20} color="red" />

          {/* ข้อความเบอร์โทร */}
          <Text style={styles.buttonText}>โทร: {phone}</Text>
        </TouchableOpacity>

        {/* =========================
            หัวข้อแผนที่
        ========================= */}
        <Text style={styles.mapTitle}>แผนที่ร้าน:</Text>

        {/* =========================
            กดแผนที่แล้วเปิด Google Maps
        ========================= */}
        <TouchableOpacity activeOpacity={0.9} onPress={openMap}>
          {/* =========================
              แผนที่ร้าน
          ========================= */}
          <MapView
            style={styles.map}
            // ปิดการเลื่อนแผนที่
            scrollEnabled={false}
            zoomEnabled={false}
            rotateEnabled={false}
            pitchEnabled={false}
            // ตำแหน่งเริ่มต้น
            initialRegion={{
              latitude: parseFloat(latitude as string),
              longitude: parseFloat(longitude as string),
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            {/* =========================
                หมุดบนแผนที่
            ========================= */}
            <Marker
              coordinate={{
                latitude: parseFloat(latitude as string),
                longitude: parseFloat(longitude as string),
              }}
              title={String(name)}
              description={String(district)}
              // กดหมุดแล้วเปิด Google Maps
              onPress={openMap}
            />
          </MapView>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// =========================
// Style ต่าง ๆ
// =========================
const styles = StyleSheet.create({
  // พื้นหลังหลัก
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },

  // รูปร้าน
  image: {
    width: "100%",
    height: 260,
  },

  // กล่องข้อมูลร้าน
  content: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 18,

    // เงา Android
    elevation: 8,

    // เงา iOS
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,

    shadowOffset: {
      width: 0,
      height: 5,
    },
  },

  // ชื่อร้าน
  name: {
    fontFamily: "Kanit_700Bold",
    fontSize: 28,
    color: "#000",
  },

  // แถว Location
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  // เขต
  district: {
    fontFamily: "Kanit_400Regular",
    fontSize: 16,
    color: "#666",
    marginLeft: 5,
  },

  // หัวข้อรายละเอียดร้าน
  title: {
    fontFamily: "Kanit_700Bold",
    fontSize: 18,

    color: "white",

    backgroundColor: "#be3434",

    paddingVertical: 12,
    paddingHorizontal: 15,

    marginTop: 25,
    marginBottom: 12,

    borderRadius: 10,
  },

  // รายละเอียดร้าน
  description: {
    fontFamily: "Kanit_400Regular",
    fontSize: 16,
    color: "#555",
    lineHeight: 28,
  },

  // ปุ่มโทร
  button: {
    marginTop: 25,
    backgroundColor: "#4CAF50",

    padding: 15,
    borderRadius: 12,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  // ข้อความในปุ่ม
  buttonText: {
    fontFamily: "Kanit_700Bold",
    color: "white",
    fontSize: 16,
    marginLeft: 8,
  },

  // หัวข้อแผนที่
  mapTitle: {
    fontFamily: "Kanit_700Bold",
    fontSize: 20,
    color: "#000",
    marginTop: 30,
    marginBottom: 12,
  },

  // แผนที่
  map: {
    width: "100%",
    height: 250,
    borderRadius: 15,
  },
});
