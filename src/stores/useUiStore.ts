import { create } from 'zustand'

// Shared UI state. Add fields as features need them; select narrowly in components.
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface UiState {}

export const useUiStore = create<UiState>(() => ({}))
