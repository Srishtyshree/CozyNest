import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MaterialCommunityIcons as Icon} from '@expo/vector-icons';
import {colors} from '../styles/colors';
import {typography} from '../styles/typography';

const OrdersScreen = ({navigation}) => {
    const orders = [
        {id: '1', date: 'Feb 10, 2026', total: 1240.00, status: 'Processing', items: 3},
        {id: '2', date: 'Jan 15, 2026', total: 450.00, status: 'Delivered', items: 1},
        {id: '3', date: 'Dec 20, 2025', total: 890.00, status: 'Delivered', items: 2},
    ];

    const renderOrder = ({item}) => (
        <TouchableOpacity style={styles.orderCard}>
            <View style={styles.orderHeader}>
                <Text style={styles.orderId}>Order #{item.id}</Text>
                <View style={[styles.statusBadge, {backgroundColor: item.status === 'Processing' ? colors.primary + '20' : colors.success + '20'}]}>
                    <Text style={[styles.statusText, {color: item.status === 'Processing' ? colors.primary : colors.success}]}>
                        {item.status}
                    </Text>
                </View>
            </View>
            <View style={styles.orderDetail}>
                <Text style={styles.detailText}>{item.date} • {item.items} items</Text>
                <Text style={styles.orderTotal}>${item.total.toFixed(2)}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={24} color={colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Orders</Text>
                <View style={{width: 40}} />
            </View>

            <FlatList
                data={orders}
                renderItem={renderOrder}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Icon name="package-variant" size={64} color={colors.textLight} />
                        <Text style={styles.emptyText}>You haven't placed any orders yet.</Text>
                    </View>
                }
            />
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
    list: {padding: 16},
    orderCard: {
        backgroundColor: colors.white,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: colors.border,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    orderId: {...typography.bodyLarge, fontWeight: '700'},
    statusBadge: {paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12},
    statusText: {...typography.caption, fontWeight: '600'},
    orderDetail: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'},
    detailText: {...typography.bodySmall, color: colors.textSecondary},
    orderTotal: {...typography.h4, color: colors.primary},
    empty: {marginTop: 100, alignItems: 'center', paddingHorizontal: 40},
    emptyText: {...typography.bodyMedium, color: colors.textSecondary, textAlign: 'center', marginTop: 16},
});

export default OrdersScreen;
