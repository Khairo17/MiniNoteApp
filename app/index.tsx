import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.emoji}>📝</Text>
        <Text style={styles.title}>QuickNotes</Text>
        <TouchableOpacity 
          style={styles.mainButton} 
          onPress={() => router.push('/notes')}
        >
          <Text style={styles.buttonText}>View My Notes</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#6200ee' },
  card: { width: width * 0.85, backgroundColor: '#fff', borderRadius: 30, padding: 30, alignItems: 'center', elevation: 10 },
  emoji: { fontSize: 60, marginBottom: 10 },
  title: { fontSize: 32, fontWeight: '900', color: '#333', marginBottom: 20 },
  mainButton: { backgroundColor: '#6200ee', flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 15 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginRight: 10 }
});