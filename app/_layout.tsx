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

const TasksContext = createContext<TasksContextType | null>(null);

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

  return (
    <TasksContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </TasksContext.Provider>
  );
}

export const useTasks = () => useContext(TasksContext)!;
