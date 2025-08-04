import { cn } from "@/functions/cn";
import { useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-stone-50 w-full max-w-4xl max-h-[90vh] shadow-2xl relative flex overflow-hidden rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main content with scrollbar */}
        <div className="flex-1 overflow-y-auto ">
          {/* Content */}
          <div className="">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
