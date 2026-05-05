import * as SQLite from 'expo-sqlite';

export type Task = {
  id: number;
  title: string;
  description: string;
  category: string;
  status: string; 
};

const db = SQLite.openDatabaseSync('tasks.db');

export function initDatabase() {
  try {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        category TEXT,
        status TEXT DEFAULT 'Pending'
      );
    `);
  } catch (error) {
    console.error("Database init error:", error);
  }
}

export const database = {
  addTask: (title: string, description: string, category: string) => {
    return db.runSync(
      'INSERT INTO tasks (title, description, category, status) VALUES (?, ?, ?, ?)',
      [title, description, category, 'Pending']
    );
  },

  getTasks: (): Task[] => {
    return db.getAllSync<Task>('SELECT * FROM tasks ORDER BY id DESC');
  },

  updateTask: (id: number, title: string, description: string, category: string, status: string) => {
    // Correct order for the SQL parameters
    return db.runSync(
      'UPDATE tasks SET title = ?, description = ?, category = ?, status = ? WHERE id = ?',
      [title, description, category, status, id]
    );
  },

  deleteTask: (id: number) => {
    db.runSync('DELETE FROM tasks WHERE id = ?', [id]);
  }
};