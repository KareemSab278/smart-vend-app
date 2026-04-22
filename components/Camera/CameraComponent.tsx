import { CameraView, PermissionStatus, useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

type CameraComponentProps = {
  open: boolean;
  onClose: () => void;
};

export const CameraComponent = ({ open, onClose }: CameraComponentProps) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [opened, setOpened] = useState<boolean>(open);
  const scannedRef = useRef(false);

  useEffect(() => {
    setOpened(open);
    if (open) {
      scannedRef.current = false;
    }
  }, [open]);

  useEffect(() => {
    if (opened && permission?.status === PermissionStatus.UNDETERMINED) {
      requestPermission();
    }
  }, [opened, permission, requestPermission]);

  if (!opened) return null;

  if (!permission?.granted) {
    return (
      <View style={styleSheet.permissionContainer}>
        <Text style={styleSheet.permissionText}>Camera permission is required.</Text>
        <Button title="Allow camera" onPress={requestPermission} />
      </View>
    );
  }

  const handleBarcodeScanned = () => {
    if (scannedRef.current) return;
    scannedRef.current = true;
    setOpened(false);
    onClose();
    alert("Scan successful! Please continue on the smart fridge screen.");

  };

  return (
    <View style={styleSheet.container}>
      {opened && <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        onBarcodeScanned={handleBarcodeScanned}
      />}
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
  permissionContainer: {
    width: '100%',
    height: 450,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  permissionText: {
    marginBottom: 12,
    textAlign: 'center',
  },
});