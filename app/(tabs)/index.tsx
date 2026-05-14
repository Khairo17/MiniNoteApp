import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeTab() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Top Navigation Header */}
      <SafeAreaView style={styles.header}>
        <Text style={styles.headerText}>Home</Text>
      </SafeAreaView>

      {/* Background Decorative Circle */}
      <View style={styles.circle} />

      {/* Main Content Card */}
      <View style={styles.card}>
        <View style={styles.iconCircle}>
          {/* Note: Using an emoji to mimic the pencil icon in your image */}
          <Text style={{ fontSize: 45 }}>📝</Text>
        </View>

        <Text style={styles.titleText}>QuickNotes</Text>
        
        <Text style={styles.subtitleText}>
          Capture your thoughts and organize your life in one simple place.
        </Text>

        <TouchableOpacity
          style={styles.viewBtn}
          onPress={() => router.push("/task")}
        >
          <Text style={styles.viewBtnText}>View My Notes</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6b21ff", // Vibrant purple background from your image
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    position: "absolute",
    top: 0,
    width: "100%",
    alignItems: "center",
    paddingVertical: 15,
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  circle: {
    position: "absolute",
    top: -50,
    right: -50,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "rgba(255, 255, 255, 0.15)", // Translucent circle
  },
  card: {
    backgroundColor: "#fff",
    width: "85%",
    borderRadius: 35,
    paddingVertical: 40,
    paddingHorizontal: 25,
    alignItems: "center",
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    // Elevation for Android
    elevation: 10,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#f5f3ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  titleText: {
    fontSize: 34,
    fontWeight: "900",
    color: "#1e293b",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitleText: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 35,
    paddingHorizontal: 10,
  },
  viewBtn: {
    backgroundColor: "#6b21ff",
    flexDirection: "row",
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 10,
  },
  viewBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});