
import { MainButton, SecondaryButton } from "@/components/Button";
import { CameraComponent } from "@/components/Camera";
import AppModal from "@/components/Modal";

interface CameraModalProps {
    visible: boolean;
    onClose: () => void;
    onPinSelect: () => void;
    onDone: () => void;
}

export const CameraModal = ({ visible, onClose, onPinSelect, onDone }: CameraModalProps) => (
    <AppModal
        animationType="slide"
        title="Scan the QR code shown on the vend display"
        visible={visible}
        children={
            <>
                        <CameraComponent
                            open={visible}
                            // onClose={() => setActiveModal(null)}
                            onClose={onClose}
                        />
                        <SecondaryButton
                            title="Use Pin Instead"
                            // onPress={() => { setActiveModal('pin'); }}
                            onPress={onPinSelect}
                        />
                        <MainButton
                            title="I'm Done"
                            // onPress={() => setActiveModal(null)}
                            onPress={onDone}
                        />
                    </>
                }
            />
);