import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import TaskBoard from './components/TaskBoard';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  return (
    <LinearGradient
    colors={['rgba(223,203,230,1)', 'rgba(155,192,248,1)']}
    style={styles.container}
  >
    <SafeAreaView style={styles.innerContainer}>
      <TaskBoard />
    </SafeAreaView>
  </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical:30
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
