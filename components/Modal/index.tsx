import { ReactNode } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text
} from 'react-native';

type AppModalProps = {
  visible: boolean;
  title?: string;
  message?: string;
  onClose?: () => void | null;
  children?: ReactNode;
  animationType?: 'none' | 'slide' | 'fade';
};

export default function AppModal({
  visible,
  title,
  message,
  onClose,
  children,
  animationType = 'fade',
}: AppModalProps) {
  return (
    <Modal visible={visible} animationType={animationType} transparent onRequestClose={onClose} >
      <Pressable onPress={onClose} style={animationType === 'slide' ? styles.slideBackdrop : styles.backdrop}>
        <Pressable onPress={() => { }} style={styles.container}>
          {title ? <Text style={styles.title}>{title}</Text> : null}
          {message ? <Text style={styles.message}>{message}</Text> : null}
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.63)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    borderRadius: 16,
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 60,
    elevation: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  button: {
    alignSelf: 'flex-end',
    paddingVertical: 10,
    paddingHorizontal: 18,
    backgroundColor: '#007AFF',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
