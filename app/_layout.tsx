import { Stack } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { database, initDatabase, Task } from "../lib/database";

type TasksContextType = {
  tasks: Task[];
  addTask: (t: string, d: string, cat: string) => void;
  updateTask: (id: number, t: string, d: string, cat: string, s: string) => void;
  deleteTask: (id: number) => void;
};

export const TasksContext = createContext<TasksContextType | null>(null);

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) throw new Error("useTasks must be used within a TasksProvider");
  return context;
};

export default function RootLayout() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    initDatabase();
    refresh();
  }, []);

  const refresh = () => setTasks(database.getTasks());

  const addTask = (t: string, d: string, cat: string) => {
    database.addTask(t, d, cat);
    refresh();
  };

  const updateTask = (id: number, t: string, d: string, cat: string, s: string) => {
    database.updateTask(id, t, d, cat, s);
    refresh();
  };

  const deleteTask = (id: number) => {
    database.deleteTask(id);
    refresh();
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Main Tab Container */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* Detail screens stack */}
        <Stack.Screen name="notes" options={{ headerShown: false }} />
      </Stack>
    </TasksContext.Provider>
  );
}