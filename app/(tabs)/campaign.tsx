import { View, SafeAreaView, StyleSheet, Text, FlatList, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { useEffect, useState } from "react";
import { getCampaigns } from "../../helpers/campaign"
import { campaignType } from "../../helpers/types/campaign";

export default function campaign() {
    const [campaigns, setCampaign] = useState<campaignType[]>([]);
    const [page, setPage] = useState<number>(1);
    const [isEndReached, setIsEndReached] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const loadMoreCampaigns = async () => {
        if (loading || isEndReached) return; // Prevent multiple calls

        setLoading(true);

        try {
            const data = await getCampaigns(page, 10); // Fetch 10 items per page
            if (data.length > 0) {
                setCampaign((prevCampaigns) => [...prevCampaigns, ...data]);
                setPage((prevPage) => prevPage + 1);
            } else {
                setIsEndReached(true); // No more data to load
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMoreCampaigns();
    }, []);

    const renderItem = ({ item }: { item: campaignType }) => (
        <SafeAreaView style={styles.campaingFrame}>
            <Image source={{ uri: item.url }}
                style={{ width: 200, height: 200, borderRadius: 15 }} />
            <Text style={styles.campaingText}>{item.id}.{item.title}</Text>
        </SafeAreaView>
    );

    const renderFooter = () => {
        if (!loading) return null;
        return <ActivityIndicator style={{ margin: 10 }} />;
    };

    return (
        <View>
            <FlatList
                data={campaigns}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                onEndReached={loadMoreCampaigns}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    campaingFrame: {
        position: 'relative',
        width: 200,
        height: 240,
        marginTop: 70,
        margin: 20,
        padding: 10
    },
    campaingText: {
        position: 'absolute',
        bottom: 40,
        left: 5,
        color: '#fff',
        padding: 5,
        borderRadius: 15,
    }
})