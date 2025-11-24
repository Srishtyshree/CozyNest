import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>User settings and preferences will appear here.</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: { paddingHorizontal: 16, paddingVertical: 12 },
  title: { ...typography.h3 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  text: { ...typography.bodyMedium, color: colors.textSecondary, textAlign: 'center' },
});

export default ProfileScreen;


