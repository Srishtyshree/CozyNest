import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MaterialCommunityIcons as Icon} from '@expo/vector-icons';
import {colors} from '../styles/colors';
import {typography} from '../styles/typography';

const AboutScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={24} color={colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>About Us</Text>
                <View style={{width: 40}} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>Cozynest</Text>
                    <Text style={styles.tagline}>Urni Decor</Text>
                </View>

                <Text style={styles.sectionTitle}>Our Story</Text>
                <Text style={styles.bodyText}>
                    Cozynest was founded with a simple mission: to help everyone create a beautiful, comfortable home they love. We believe that professional interior design shouldn't be a luxury, and that your space should reflect your unique personality.
                </Text>

                <Text style={styles.sectionTitle}>Our Values</Text>
                <View style={styles.valueItem}>
                    <Icon name="check-circle-outline" size={24} color={colors.primary} />
                    <Text style={styles.valueText}>Quality Craftsmanship in every piece</Text>
                </View>
                <View style={styles.valueItem}>
                    <Icon name="check-circle-outline" size={24} color={colors.primary} />
                    <Text style={styles.valueText}>Sustainable materials and ethical sourcing</Text>
                </View>
                <View style={styles.valueItem}>
                    <Icon name="check-circle-outline" size={24} color={colors.primary} />
                    <Text style={styles.valueText}>Customer-first design philosophy</Text>
                </View>

                <Text style={styles.footerText}>© 2026 Cozynest Urni Decor. All rights reserved.</Text>
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
    content: {padding: 24},
    logoContainer: {alignItems: 'center', marginBottom: 32},
    logoText: {...typography.h1, color: colors.primary, fontWeight: '800'},
    tagline: {...typography.bodyMedium, color: colors.textSecondary, letterSpacing: 4, textTransform: 'uppercase'},
    sectionTitle: {...typography.h3, color: colors.textPrimary, marginTop: 24, marginBottom: 12},
    bodyText: {...typography.body, color: colors.textSecondary, lineHeight: 24},
    valueItem: {flexDirection: 'row', alignItems: 'center', marginTop: 12},
    valueText: {...typography.bodyMedium, marginLeft: 12, color: colors.textPrimary},
    footerText: {...typography.caption, color: colors.textLight, textAlign: 'center', marginTop: 40, marginBottom: 20},
});

export default AboutScreen;
