import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MaterialCommunityIcons as Icon} from '@expo/vector-icons';
import {useAuth} from '../context/AuthContext';
import {colors} from '../styles/colors';
import {typography} from '../styles/typography';

const ProfileScreen = ({navigation}) => {
  const {user, logout, updateProfile} = useAuth();

  const handleEditName = () => {
    Alert.prompt(
      'Edit Name',
      'Enter your new display name',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Save', onPress: async (newName) => {
            if (newName && newName.trim()) {
              const result = await updateProfile(newName.trim());
              if (!result.success) {
                Alert.alert('Error', 'Failed to update name');
              }
            }
          }
        },
      ],
      'plain-text',
      user?.name || 'Srishtyshree'
    );
  };

  const menuItems = [
    {id: 'orders', icon: 'package-variant', label: 'My Orders', color: '#4A90E2', screen: 'Orders'},
    {id: 'favorites', icon: 'heart-outline', label: 'Favorites / Wishlist', color: '#F5A623', screen: 'Favorites'},
    {id: 'settings', icon: 'cog-outline', label: 'Settings', color: '#7ED321', screen: 'Settings'},
  ];

  const infoItems = [
    {id: 'about', icon: 'information-outline', label: 'About Us', screen: 'About'},
    {id: 'terms', icon: 'file-document-outline', label: 'Terms of Use', screen: 'Terms'},
  ];

  const handlePress = (item) => {
    if (item.screen) {
      navigation.navigate(item.screen);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>My Profile</Text>
      </View>

      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Card */}
        <View style={styles.userCard}>
          <View style={styles.avatarContainer}>
            <View style={[styles.avatar, {backgroundColor: '#7D8E7E'}]}>
              <Icon name="account" size={50} color={colors.white} />
            </View>
            <TouchableOpacity style={styles.editBadge} onPress={handleEditName}>
              <Icon name="pencil" size={14} color={colors.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{user?.name || 'Srishtyshree'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
        </View>

        {/* Main Menu Sections */}
        <View style={styles.section}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => handlePress(item)}
            >
              <View style={[styles.iconContainer, {backgroundColor: item.color + '15'}]}>
                <Icon name={item.icon} size={22} color={item.color} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Icon name="chevron-right" size={20} color={colors.textLight} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Information Section */}
        <Text style={styles.sectionHeader}>Support & Info</Text>
        <View style={styles.section}>
          {infoItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => handlePress(item)}
            >
              <View style={[styles.iconContainer, {backgroundColor: colors.border}]}>
                <Icon name={item.icon} size={22} color={colors.textSecondary} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Icon name="chevron-right" size={20} color={colors.textLight} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Icon name="logout" size={22} color={colors.error} />
          <Text style={styles.logoutText}>Log Out Account</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Version 1.0.2 • Cozynest</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  userCard: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 8,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.cream,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary + '20',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.white,
  },
  userName: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  userEmail: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
  },
  sectionHeader: {
    ...typography.caption,
    fontWeight: 'bold',
    color: colors.textLight,
    textTransform: 'uppercase',
    marginBottom: 12,
    marginLeft: 4,
  },
  section: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 24,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  menuLabel: {
    flex: 1,
    ...typography.bodyLarge,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FFF5F5',
    borderWidth: 1,
    borderColor: '#FFEBEB',
    marginBottom: 24,
    gap: 10,
  },
  logoutText: {
    ...typography.bodyLarge,
    color: colors.error,
    fontWeight: '600',
  },
  versionText: {
    ...typography.caption,
    textAlign: 'center',
    color: colors.textLight,
  },
});

export default ProfileScreen;


