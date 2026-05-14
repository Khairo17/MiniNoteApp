import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTasks } from "../_layout";

export default function TaskEdit() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { tasks, updateTask } = useTasks();
  const task = tasks.find((t) => t.id.toString() === id);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setCategory(task.category);
      setDescription(task.description);
      setStatus(task.status);
    }
  }, [task]);

  const handleUpdate = () => {
    if (!title.trim()) return;
    updateTask(Number(id), title, description, category, status);
    setShowModal(true);
  };

  if (!task) return null;

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: "Edit Task" }} />

      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="checkmark-circle" size={60} color="#4f46e5" />
            <Text style={styles.modalText}>Changes Saved!</Text>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={() => {
                setShowModal(false);
                router.replace("/(tabs)/task");
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.card}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} />

        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={setCategory}
        />

        <Text style={styles.label}>Status</Text>
        <TouchableOpacity
          style={[
            styles.statusToggle,
            status === "Completed" ? styles.bgDone : styles.bgPending,
          ]}
          onPress={() =>
            setStatus(status === "Pending" ? "Completed" : "Pending")
          }
        >
          <Text style={styles.toggleText}>
            Mark as {status === "Pending" ? "Completed" : "Pending"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          value={description}
          onChangeText={setDescription}
          multiline
          textAlignVertical="top"
        />

        <TouchableOpacity style={styles.saveBtn} onPress={handleUpdate}>
          <Text style={styles.saveBtnText}>Save Task</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc", padding: 20 },
  card: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 20,
    elevation: 3,
  },
  label: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#4f46e5",
    marginBottom: 5,
    textTransform: "uppercase",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    marginBottom: 20,
    paddingVertical: 8,
    fontSize: 16,
  },
  statusToggle: {
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  bgPending: {
    backgroundColor: "#fffbeb",
    borderWidth: 1,
    borderColor: "#fef3c7",
  },
  bgDone: {
    backgroundColor: "#f0fdf4",
    borderWidth: 1,
    borderColor: "#dcfce7",
  },
  toggleText: { fontWeight: "700", color: "#1e293b" },
  saveBtn: {
    backgroundColor: "#4f46e5",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
  },
  saveBtnText: { color: "#fff", fontWeight: "bold" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
    width: "80%",
  },
  modalText: { fontSize: 18, fontWeight: "bold", marginVertical: 15 },
  modalBtn: {
    backgroundColor: "#4f46e5",
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 10,
  },
});
