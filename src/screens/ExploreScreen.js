import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import CategoryCard from '../components/CategoryCard';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';
import { globalStyles } from '../styles/globalStyles';

const { width } = Dimensions.get('window');

const ExploreScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('room');

  const roomCategories = [
    { id: '1', name: 'Living Room', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400', count: 245 },
    { id: '2', name: 'Bedroom', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400', count: 189 },
    { id: '3', name: 'Kitchen', image: 'https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=400', count: 156 },
    { id: '4', name: 'Bathroom', image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400', count: 98 },
    { id: '5', name: 'Dining Room', image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400', count: 132 },
    { id: '6', name: 'Home Office', image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400', count: 112 },
  ];

  const styleCategories = [
    { id: '1', name: 'Modern', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400', count: 324 },
    { id: '2', name: 'Minimalist', image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400', count: 267 },
    { id: '3', name: 'Bohemian', image: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=400', count: 198 },
    { id: '4', name: 'Industrial', image: 'https://images.unsplash.com/photo-1556228578-dd6a8bc0b2b8?w=400', count: 145 },
    { id: '5', name: 'Scandinavian', image: 'https://images.unsplash.com/photo-1556909114-f6e7a7c6f1e2?w=400', count: 176 },
  ];

  const tabs = [
    { key: 'room', label: 'By Room' },
    { key: 'style', label: 'By Style' },
    { key: 'type', label: 'By Product Type' },
    { key: 'price', label: 'By Price Range' },
  ];

  const renderRoomItem = ({ item }) => (
    <CategoryCard
      category={item}
      onPress={() => navigation.navigate('ProductList', { category: item })}
      style={{ width: width * 0.7 }}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Categories</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="tune-variant" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabs}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              style={[styles.tab, activeTab === tab.key && styles.tabActive]}
            >
              <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {activeTab === 'room' && (
          <View style={styles.section}>
            <FlatList
              horizontal
              data={roomCategories}
              renderItem={renderRoomItem}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            />
          </View>
        )}

        {activeTab === 'style' && (
          <View style={styles.gridPlaceholder}>
            <Text style={styles.placeholderText}>Styles grid coming soon</Text>
          </View>
        )}

        {activeTab === 'type' && (
          <View style={styles.gridPlaceholder}>
            <Text style={styles.placeholderText}>Product types coming soon</Text>
          </View>
        )}

        {activeTab === 'price' && (
          <View style={styles.gridPlaceholder}>
            <Text style={styles.placeholderText}>Price ranges coming soon</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: { ...typography.h3 },
  iconButton: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  content: { paddingBottom: 24 },
  tabs: { paddingHorizontal: 16 },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 10,
  },
  tabActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  tabText: { ...typography.bodySmall, color: colors.textSecondary },
  tabTextActive: { color: colors.white },
  section: { marginTop: 16 },
  horizontalList: { paddingLeft: 16, paddingRight: 4 },
  gridPlaceholder: { padding: 24, alignItems: 'center' },
  placeholderText: { ...typography.bodyMedium, color: colors.textSecondary },
});

export default ExploreScreen;