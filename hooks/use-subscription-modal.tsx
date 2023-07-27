import { create } from 'zustand';

interface UseSubscriptionModalStore {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

export const useSubscriptionModal =
	create<UseSubscriptionModalStore>((set) => ({
		isOpen: false,
		onOpen: () => set({ isOpen: true }),
		onClose: () => set({ isOpen: false }),
	}));
