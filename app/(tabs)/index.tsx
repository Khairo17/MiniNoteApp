import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTasks } from "../_layout";

export default function HomeTab() {
  const router = useRouter();
  const { tasks } = useTasks();

  const activeTasks = tasks.filter((t) => t.status === "Pending");
  const completedTasks = tasks.filter((t) => t.status === "Completed");

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Task Dashboard</Text>

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.counter}>{activeTasks.length}</Text>
          <Text style={styles.cardLabel}>Active Tasks</Text>
        </View>

        <View style={[styles.card, styles.cardCompleted]}>
          <Text style={[styles.counter, styles.completedText]}>
            {completedTasks.length}
          </Text>
          <Text style={styles.cardLabel}>Completed</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push("/notes/add-note")}
      >
        <Text style={styles.btnText}>+ Add New Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 24,
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 24,
    textAlign: "center",
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 36,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    width: "47%",
    alignItems: "center",
    elevation: 3,
  },
  cardCompleted: { backgroundColor: "#f0fdf4" },
  counter: { fontSize: 32, fontWeight: "bold", color: "#4f46e5" },
  completedText: { color: "#16a34a" },
  cardLabel: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 8,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  btn: {
    backgroundColor: "#4f46e5",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    elevation: 2,
  },
  btnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
