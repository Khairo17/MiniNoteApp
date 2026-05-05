import { useState } from 'react'; // 1. Import useState
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Pressable, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useTasks } from '../_layout'; 
import { Ionicons } from '@expo/vector-icons';

export default function TasksList() {
  const router = useRouter();
  const { tasks, deleteTask } = useTasks(); 
  
  // 2. Create state for the search text
  const [searchQuery, setSearchQuery] = useState('');

  // 3. Filter tasks based on the search query (matching title or category)
  const filteredTasks = tasks.filter((item) => {
    const itemTitle = item.title ? item.title.toLowerCase() : '';
    const itemCategory = item.category ? item.category.toLowerCase() : '';
    const query = searchQuery.toLowerCase();
    
    return itemTitle.includes(query) || itemCategory.includes(query);
  });

  return (
    <View style={styles.container}>
      {/* 4. Add the Search Bar UI */}
      <View style={styles.searchHeader}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#64748b" style={styles.searchIcon} />
          <TextInput
            placeholder="Search tasks or categories..."
            placeholderTextColor="#94a3b8"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery} // Update state as you type
            clearButtonMode="while-editing"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color="#94a3b8" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={filteredTasks} // 5. Use the filtered list here
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        // 6. Show message when no results are found
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchQuery ? "No matching tasks found." : "No tasks added yet."}
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <Pressable 
              onPress={() => router.push(`/notes/${item.id}`)}
              style={({ pressed }) => [styles.clickable, { opacity: pressed ? 0.7 : 1 }]}
            >
              <View style={styles.headerRow}>
                <Text style={styles.categoryText}>{item.category || 'General'}</Text>
                <View style={[styles.badge, item.status === 'Completed' ? styles.badgeDone : styles.badgePending]}>
                  <Text style={[styles.badgeText, { color: item.status === 'Completed' ? '#16a34a' : '#d97706' }]}>
                    {item.status}
                  </Text>
                </View>
              </View>
              <Text style={styles.titleText}>{item.title}</Text>
              <Text style={styles.descriptionText} numberOfLines={1}>{item.description}</Text>
            </Pressable>

            <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.deleteBtn}>
              <Ionicons name="trash-outline" size={20} color="#ef4444" />
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.fab} onPress={() => router.push('/add-note')}>
        <Ionicons name="add" size={35} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  // --- Search Bar Styles ---
  searchHeader: {
    backgroundColor: '#4f46e5',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    height: 45,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 16, color: '#1e293b' },
  emptyContainer: { alignItems: 'center', marginTop: 40 },
  emptyText: { color: '#64748b', fontSize: 16 },
  // --- Original Styles ---
  cardContainer: { backgroundColor: '#fff', borderRadius: 16, marginBottom: 12, flexDirection: 'row', elevation: 2 },
  clickable: { flex: 1, padding: 18 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  categoryText: { fontSize: 10, fontWeight: 'bold', color: '#4f46e5', textTransform: 'uppercase' },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8, borderWidth: 1, borderColor: 'transparent' },
  badgePending: { backgroundColor: '#fffbeb', borderColor: '#fef3c7' },
  badgeDone: { backgroundColor: '#f0fdf4', borderColor: '#dcfce7' },
  badgeText: { fontSize: 10, fontWeight: 'bold' },
  titleText: { fontSize: 18, fontWeight: 'bold', color: '#1e293b' },
  descriptionText: { fontSize: 14, color: '#64748b', marginTop: 4 },
  deleteBtn: { width: 50, justifyContent: 'center', alignItems: 'center', borderLeftWidth: 1, borderLeftColor: '#f1f5f9' },
  fab: { position: 'absolute', bottom: 30, right: 25, backgroundColor: '#4f46e5', width: 65, height: 65, borderRadius: 33, justifyContent: 'center', alignItems: 'center', elevation: 5 }
});