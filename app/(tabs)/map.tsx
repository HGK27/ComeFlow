import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import Icon from '@expo/vector-icons/MaterialIcons';


const MapComponent: React.FC = () => {
    const [locatiolAt, setLocatiolAt] = useState<number | null>(null);
    const [locatioLong, setLocatioLong] = useState<number | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});

            setLocatiolAt(parseFloat(location?.coords?.latitude?.toFixed(5)));
            setLocatioLong(parseFloat(location?.coords?.longitude?.toFixed(5)));
        })();
    }, []);

    let text = 'Waiting...';
    if (errorMsg) {
        text = errorMsg;
    } else {
        text = `Latitude: ${locatiolAt}, Longitude: ${locatioLong}`;
    }
    const coordArray = [{
        latitude: 41.0391683,
        longitude: 28.9982707,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    },
    {
        latitude: 41.0591683,
        longitude: 28.99847,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    },
    {
        latitude: 41.0491683,
        longitude: 28.99847,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    }
    ];
    const Mycoodinate = {
        latitude: locatiolAt ?? 0,
        longitude: locatioLong ?? 0,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    }


    return (
        <View style={styles.container}>
            <Text style={styles.textColor}>Map</Text>
            {locatiolAt !== null && locatioLong !== null ? (
                <MapView style={styles.map}
                    initialRegion={{
                        latitude: locatiolAt ?? 0,
                        longitude: locatioLong ?? 0,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}>
                    <Marker coordinate={Mycoodinate}
                        image={require('../../assets/images/location.png')}>
                        <Icon name="gps-fixed" size={32} color="blue" />
                        <Callout>
                            <View>
                                <Text>Your location</Text>
                            </View>
                        </Callout>
                    </Marker>
                    {coordArray.map((coordinate, index) => (
                        <Marker
                            key={index}
                            coordinate={coordinate}
                            title="test"
                            description="deneme"
                            image={require('../../assets/images/location.png')}>
                            <Icon key={index} name="location-pin" size={24} color="red" />
                            <Callout>
                                <View>
                                    <Text>Dolmabahçe sarayı</Text>
                                </View>
                            </Callout>
                        </Marker>
                    ))}
                </MapView>
            ) : (
                <Text>Fetching location...</Text>
            )}
            <View style={styles.textContainer}>
                <Text style={styles.paragraph}>{text}</Text>
            </View>
        </View>
    );
};

export default MapComponent;

const styles = StyleSheet.create({
    textColor: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 10,
    },
    container: {

    },
    map: {
        width: '100%',
        height: '50%',
    },
    textContainer: {
        marginTop: 10,
        alignItems: 'center',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        textAlign: 'center',
        color: '#fff',
    },
});
