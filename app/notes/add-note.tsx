import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTasks } from "../_layout";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");

  const { addTask } = useTasks();
  const router = useRouter();

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert("Required", "Please provide a task title.");
      return;
    }

    try {
      addTask(title, description, category);
      router.back();
    } catch (error) {
      console.error("Save error:", error);
      Alert.alert("Error", "Could not save the task.");
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.formCard}>
        <Text style={styles.label}>Task Title</Text>
        <TextInput
          style={styles.input}
          placeholder="What needs to be done?"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Work, Personal, School"
          value={category}
          onChangeText={setCategory}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Add more details here..."
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          value={description}
          onChangeText={setDescription}
        />

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Ionicons
            name="add-circle-outline"
            size={20}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.saveBtnText}>Create Task</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelBtnText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc", padding: 20 },
  formCard: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 20,
    elevation: 3,
  },
  label: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#4f46e5",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    marginBottom: 25,
    paddingVertical: 10,
    fontSize: 16,
    color: "#1e293b",
  },
  textArea: {
    height: 100,
    borderBottomWidth: 0,
    backgroundColor: "#f9fafb",
    borderRadius: 10,
    padding: 12,
  },
  saveBtn: {
    backgroundColor: "#4f46e5",
    flexDirection: "row",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  saveBtnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  cancelBtn: { padding: 15, alignItems: "center" },
  cancelBtnText: { color: "#64748b", fontWeight: "500" },
});
