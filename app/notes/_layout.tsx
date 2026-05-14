import { Stack } from "expo-router";

export default function NotesLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#4f46e5" },
        headerTintColor: "#fff",
      }}
    >
      {/* We set index to headerShown: false because the Tab bar or Search bar handles the UI there */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[id]" options={{ title: "Edit Task" }} />
      <Stack.Screen name="add-note" options={{ title: "New Task", presentation: "modal" }} />
    </Stack>
  );
}