import { Stack } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { database, initDatabase, Task } from "../lib/database";

type TasksContextType = {
  tasks: Task[];
  addTask: (t: string, d: string, cat: string) => void;
  updateTask: (
    id: number,
    t: string,
    d: string,
    cat: string,
    s: string,
  ) => void;
  deleteTask: (id: number) => void;
};

// 1. Create the context to share state across screens
const TasksContext = createContext<TasksContextType | null>(null);

export default function Layout() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // 2. Initialize the database and load tasks on app launch
  useEffect(() => {
    initDatabase();
    refresh();
  }, []);

  // 3. Helper function to update the state from the local SQLite database
  const refresh = () => setTasks(database.getTasks());

  // 4. Context functions to modify tasks and refresh the state
  const addTask = (t: string, d: string, cat: string) => {
    database.addTask(t, d, cat);
    refresh();
  };

  const updateTask = (
    id: number,
    t: string,
    d: string,
    cat: string,
    s: string,
  ) => {
    database.updateTask(id, t, d, cat, s);
    refresh();
  };

  const deleteTask = (id: number) => {
    database.deleteTask(id);
    refresh();
  };

  // 5. Provide the state and functions to the child routes and set up the header/routes
  return (
    <TasksContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#4f46e5" },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen name="notes/index" options={{ title: "My Tasks" }} />
        <Stack.Screen name="notes/[id]" options={{ title: "Edit Task" }} />
        <Stack.Screen
          name="add-note"
          options={{ title: "New Task", presentation: "modal" }}
        />
      </Stack>
    </TasksContext.Provider>
  );
}

// 6. Custom hook for easy consumption of the context in your components
export const useTasks = () => useContext(TasksContext)!;
