import { CameraView } from "expo-camera";
import { StyleSheet, View } from "react-native";

type CameraComponentProps = {
  open: boolean;
  onClose: () => void;
};

export const CameraComponent = ({ open, onClose }: CameraComponentProps) => {
  if (!open) return null;

  const handleBarcodeScanned = (event: any) => {
    console.log(event);
    const scannedData = event?.nativeEvent?.data ?? event?.data ?? '';
    alert(`Scanned QR Code: ${scannedData}`);
    onClose();
  };

  return (
    <View style={styleSheet.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        onBarcodeScanned={handleBarcodeScanned}
      />
    </View>
  );
};

const styleSheet = StyleSheet.create({
    container: {
        width: '100%',
        height: 450,
        borderRadius: 12,
        overflow: 'hidden',
        marginTop: 12,
    },
});