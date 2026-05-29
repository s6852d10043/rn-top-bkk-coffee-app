import { supabase } from "@/services/supabase";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";

import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type CoffeeShop = {
  id: number;
  name: string;
  district: string;
  description: string;
  image_url: string;
  phone: string;
  latitude: string;
  longitude: string;
};

export default function Home() {
  const [shops, setShops] = useState<CoffeeShop[]>([]);

  useEffect(() => {
    const fetchShops = async () => {
      const { data, error } = await supabase
        .from("coffee_shops_tb")
        .select("*")
        .order("name", { ascending: true });

      if (error) {
        Alert.alert("คำเตือน", "พบปัญหาในการดึงข้อมูล");
      } else {
        setShops(data || []);
      }
    };

    fetchShops();
  }, []);

  const showListShops = ({ item }: { item: CoffeeShop }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: "/detail",
            params: {
              name: item.name,
              district: item.district,
              description: item.description,
              image_url: item.image_url,
              phone: item.phone,
              latitude: item.latitude,
              longitude: item.longitude,
            },
          });
        }}
        style={styles.cardSty}
      >
        <Image source={{ uri: item.image_url }} style={styles.imgSty} />

        <View style={styles.detailBox}>
          <Text style={styles.nameTxt}>{item.name}</Text>

          <View style={styles.locationRow}>
            <Ionicons name="location-sharp" size={16} color="red" />
            <Text style={styles.locationTxt}>{item.district}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={shops}
        keyExtractor={(item) => item.id.toString()}
        renderItem={showListShops}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f2f2f2",
  },

  cardSty: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 18,
    marginBottom: 18,
    overflow: "hidden",

    // ปรับเงา Card ตรงนี้
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },

  imgSty: {
    width: 110,
    height: 110,
  },

  detailBox: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 15,
  },

  nameTxt: {
    fontFamily: "Kanit_700Bold",
    fontSize: 18,
    color: "#000",
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  locationTxt: {
    fontFamily: "Kanit_400Regular",
    fontSize: 14,
    color: "#666",
    marginLeft: 5,
  },
});
