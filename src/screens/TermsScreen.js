import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MaterialCommunityIcons as Icon} from '@expo/vector-icons';
import {colors} from '../styles/colors';
import {typography} from '../styles/typography';

const TermsScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={24} color={colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Terms of Use</Text>
                <View style={{width: 40}} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.lastUpdated}>Last Updated: February 2026</Text>

                <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
                <Text style={styles.bodyText}>
                    By accessing and using this application, you agree to be bound by these Terms of Use and all applicable laws and regulations.
                </Text>

                <Text style={styles.sectionTitle}>2. Use License</Text>
                <Text style={styles.bodyText}>
                    Permission is granted to temporarily download one copy of the materials (information or software) on Cozynest's application for personal, non-commercial transitory viewing only.
                </Text>

                <Text style={styles.sectionTitle}>3. Privacy Policy</Text>
                <Text style={styles.bodyText}>
                    Your privacy is important to us. It is Cozynest's policy to respect your privacy regarding any information we may collect from you across our application.
                </Text>

                <Text style={styles.sectionTitle}>4. Governing Law</Text>
                <Text style={styles.bodyText}>
                    These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which Cozynest operates.
                </Text>

                <View style={styles.spacer} />
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
    lastUpdated: {...typography.caption, color: colors.textLight, marginBottom: 20},
    sectionTitle: {...typography.h4, color: colors.textPrimary, marginTop: 24, marginBottom: 8},
    bodyText: {...typography.bodySmall, color: colors.textSecondary, lineHeight: 20},
    spacer: {height: 40},
});

export default TermsScreen;
