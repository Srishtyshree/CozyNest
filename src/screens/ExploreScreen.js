import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MaterialCommunityIcons as Icon} from '@expo/vector-icons';
import CategoryCard from '../components/CategoryCard';
import {colors} from '../styles/colors';
import {typography} from '../styles/typography';
import {globalStyles} from '../styles/globalStyles';

const {width} = Dimensions.get('window');

const ExploreScreen = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('room');

  const roomCategories = [
    {id: '1', name: 'Living Room', filterParams: {name: 'Living'}, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400', count: 245},
    {id: '2', name: 'Bedroom', filterParams: {name: 'Bedroom'}, image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400', count: 189},
    {id: '3', name: 'Kitchen', apiCategory: 'kitchen', image: 'https://images.unsplash.com/photo-1556909390-38a497fd6671?w=400', count: 156},
    {id: '4', name: 'Bathroom', filterParams: {name: 'Bathroom'}, image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400', count: 98},
    {id: '5', name: 'Dining Room', apiCategory: 'garden', image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400', count: 132}, // Garden as closest API match for dining/outdoor
    {id: '6', name: 'Home Office', apiCategory: 'desk', image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400', count: 112},
  ];

  const styleCategories = [
    {id: '1', name: 'Modern', filterParams: {name: 'modern'}, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400', count: 324},
    {id: '2', name: 'Minimalist', filterParams: {name: 'minimalist'}, image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400', count: 267},
    {id: '3', name: 'Bohemian', filterParams: {name: 'bohemian'}, image: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=400', count: 198},
    {id: '4', name: 'Industrial', filterParams: {name: 'industrial'}, image: 'https://images.unsplash.com/photo-1556228578-dd6a8bc0b2b8?w=400', count: 145},
    {id: '5', name: 'Scandinavian', filterParams: {name: 'scandinavian'}, image: 'https://images.unsplash.com/photo-1556909114-f6e7a7c6f1e2?w=400', count: 176},
  ];

  const typeCategories = [
    {id: '1', name: 'Sofas', apiCategory: 'sofa', icon: 'sofa-outline'},
    {id: '2', name: 'Tables', apiCategory: 'table', icon: 'table-furniture'},
    {id: '3', name: 'Chairs', apiCategory: 'chair', icon: 'chair-rolling'},
    {id: '4', name: 'Beds', apiCategory: 'bed', icon: 'bed-outline'},
    {id: '5', name: 'Lighting', apiCategory: 'lamp', icon: 'lamp-outline'},
    {id: '6', name: 'Decor', apiCategory: 'decor', icon: 'flower-outline'},
  ];

  const priceRanges = [
    {id: '1', name: 'Under $100', params: {max_price: 100}},
    {id: '2', name: '$100 - $500', params: {min_price: 100, max_price: 500}},
    {id: '3', name: '$500 - $1000', params: {min_price: 500, max_price: 1000}},
    {id: '4', name: 'Over $1000', params: {min_price: 1000}},
  ];

  const tabs = [
    {key: 'room', label: 'By Room'},
    {key: 'style', label: 'By Style'},
    {key: 'type', label: 'By Type'},
    {key: 'price', label: 'By Price'},
  ];

  const handleCategoryPress = (category) => {
    navigation.navigate('ProductList', {
      category: category,
      apiCategory: category.apiCategory,
      filterParams: category.filterParams || {},
    });
  };

  const renderCategoryItem = ({item}) => (
    <CategoryCard
      category={item}
      onPress={() => handleCategoryPress(item)}
      style={{width: width * 0.7}}
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

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabs}
          style={styles.tabsContainer}
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

        <View style={styles.section}>
          {activeTab === 'room' && (
            <FlatList
              horizontal
              data={roomCategories}
              renderItem={renderCategoryItem}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            />
          )}

          {activeTab === 'style' && (
            <FlatList
              horizontal
              data={styleCategories}
              renderItem={renderCategoryItem}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            />
          )}

          {activeTab === 'type' && (
            <View style={styles.gridContainer}>
              {typeCategories.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  style={styles.typeItem}
                  onPress={() => handleCategoryPress(type)}
                >
                  <View style={styles.typeIconContainer}>
                    <Icon name={type.icon} size={32} color={colors.primary} />
                  </View>
                  <Text style={styles.typeText}>{type.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {activeTab === 'price' && (
            <View style={styles.priceContainer}>
              {priceRanges.map((range) => (
                <TouchableOpacity
                  key={range.id}
                  style={styles.priceItem}
                  onPress={() => handleCategoryPress(range, range.params)}
                >
                  <Text style={styles.priceText}>{range.name}</Text>
                  <Icon name="chevron-right" size={20} color={colors.textLight} />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.white},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {...typography.h3},
  iconButton: {width: 40, height: 40, alignItems: 'center', justifyContent: 'center'},
  content: {paddingBottom: 24},
  tabsContainer: {marginBottom: 16},
  tabs: {paddingHorizontal: 16},
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 10,
  },
  tabActive: {backgroundColor: colors.primary, borderColor: colors.primary},
  tabText: {...typography.bodySmall, color: colors.textSecondary},
  tabTextActive: {color: colors.white},
  section: {marginTop: 8},
  horizontalList: {paddingLeft: 16, paddingRight: 4},
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  typeItem: {
    width: (width - 60) / 3,
    alignItems: 'center',
    marginBottom: 24,
    marginHorizontal: 10,
  },
  typeIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.cream,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  typeText: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  priceContainer: {
    paddingHorizontal: 16,
  },
  priceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  priceText: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
});

export default ExploreScreen;