import { Stack } from "expo-router";

export default function TaskStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#4f46e5" },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="index" options={{ title: "My Tasks" }} />
      <Stack.Screen name="[id]" options={{ title: "Edit Task" }} />
      <Stack.Screen
        name="add-note"
        options={{ title: "New Task", presentation: "modal" }}
      />
    </Stack>
  );
}
