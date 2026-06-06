// contexts/AuthRequiredContext.tsx
"use client"

import { createContext, useContext, useState, ReactNode } from 'react';
import AuthRequiredModal from '../components/modals/AuthRequiredModal';

interface AuthRequiredContextType {
    showAuthModal: (backUrl: string) => void;
    hideAuthModal: () => void;
}

const AuthRequiredContext = createContext<AuthRequiredContextType | undefined>(undefined);

export function AuthRequiredProvider({ children }: { children: ReactNode }) {
    const [modalState, setModalState] = useState<{
        isOpen: boolean;
        backUrl: string;
    }>({
        isOpen: false,
        backUrl: '',
    });

    const showAuthModal = (backUrl: string) => {
        setModalState({ isOpen: true, backUrl });
    };

    const hideAuthModal = () => {
        setModalState({ isOpen: false, backUrl: '' });
    };

    return (
        <AuthRequiredContext.Provider value={{ showAuthModal, hideAuthModal }}>
            {children}
            {modalState.isOpen && (
                <AuthRequiredModal
                    onClose={hideAuthModal}
                    open={modalState.isOpen}
                    back_url={modalState.backUrl}
                />
            )}
        </AuthRequiredContext.Provider>
    );
}

export function useAuthRequired() {
    const context = useContext(AuthRequiredContext);
    if (context === undefined) {
        throw new Error('useAuthRequired must be used within an AuthRequiredProvider');
    }
    return context;
}