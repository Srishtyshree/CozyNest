import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MaterialCommunityIcons as Icon} from '@expo/vector-icons';
import {colors} from '../styles/colors';
import {typography} from '../styles/typography';

const SettingsScreen = ({navigation}) => {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  const SettingItem = ({icon, label, value, onValueChange, type = 'toggle'}) => (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.iconContainer}>
          <Icon name={icon} size={22} color={colors.textSecondary} />
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>
      {type === 'toggle' ? (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{false: colors.border, true: colors.primaryLight}}
          thumbColor={value ? colors.primary : '#f4f3f4'}
        />
      ) : (
        <Icon name="chevron-right" size={20} color={colors.textLight} />
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{width: 40}} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.section}>
          <SettingItem icon="bell-outline" label="Notifications" value={notifications} onValueChange={setNotifications} />
          <SettingItem icon="theme-light-dark" label="Dark Mode" value={darkMode} onValueChange={setDarkMode} />
          <TouchableOpacity onPress={() => { }}>
            <SettingItem icon="shield-check-outline" label="Privacy & Security" type="link" />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>App Info</Text>
        <View style={styles.section}>
          <TouchableOpacity onPress={() => navigation.navigate('About')}>
            <SettingItem icon="information-outline" label="About Cozynest" type="link" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
            <SettingItem icon="file-document-outline" label="Terms of Service" type="link" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.deleteText}>Delete Account</Text>
        </TouchableOpacity>
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
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {...typography.h3, color: colors.textPrimary},
  backButton: {padding: 8},
  content: {padding: 16},
  sectionTitle: {...typography.caption, fontWeight: '700', color: colors.textLight, textTransform: 'uppercase', marginBottom: 12, marginLeft: 4},
  section: {backgroundColor: colors.white, borderRadius: 12, borderWidth: 1, borderColor: colors.border, marginBottom: 24, overflow: 'hidden'},
  item: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: colors.border},
  itemLeft: {flexDirection: 'row', alignItems: 'center'},
  iconContainer: {marginRight: 12},
  label: {...typography.bodyLarge, color: colors.textPrimary},
  deleteButton: {marginTop: 20, padding: 16, alignItems: 'center'},
  deleteText: {...typography.bodyMedium, color: colors.error, fontWeight: '600'},
});

export default SettingsScreen;
