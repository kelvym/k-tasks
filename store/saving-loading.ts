import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

type SavingLoadingState = {
  isLoading: boolean
  changeStatus: (status: boolean) => void
}

export const useSavingLoading = create<SavingLoadingState>()(
  devtools(
    persist(
      (set) => ({
        isLoading: false,
        changeStatus: (status: boolean) => set(() => ({ isLoading: status })),
      }),
      {
        name: 'venue-config-storage',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
)
