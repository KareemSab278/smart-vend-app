import { CameraView } from "expo-camera";
import { StyleSheet, View } from "react-native";

export const CameraComponent = ({ open }: { open: boolean }) => {

    if (!open) return null;

    const onBarcodeScanned = (event: any) => {
        console.log(event);
    }

    return (
        <View style={styleSheet.container}>
            <CameraView
                style={StyleSheet.absoluteFillObject}
                facing="back"
                barcodeScannerSettings={{
                    barcodeTypes: ['qr'],
                }}
                onBarcodeScanned={onBarcodeScanned}
            />
        </View>
    );

}

const styleSheet = StyleSheet.create({
    container: {
        width: '100%',
        height: 450,
        borderRadius: 12,
        overflow: 'hidden',
        marginTop: 12,
    },
});