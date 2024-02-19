import { cn } from "@/functions/cn";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}
const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
    return (
        <div className={cn('fixed inset-0 bg-black/50 z-50', isOpen ? 'block' : 'hidden')}>
            <div className={cn('bg-white p-4 rounded-lg w-1/2 mx-auto my-12')}>
                <button onClick={onClose} className={cn('absolute top-2 right-2')}>
                    X
                </button>
                {children}
            </div>
        </div>
    );
}
export default Modal;