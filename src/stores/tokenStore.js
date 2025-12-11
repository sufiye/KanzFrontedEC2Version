import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useTokens = create(persist(
    (set) => ({
  accessToken: "",
  refreshToken:"",
  loading:false,
  setLoading: (loadingState) => set((state) => ({...state,loading:loadingState})),
  setAccessToken: (token) => set((state) => ({...state, accessToken: token  })),
  setRefreshToken: (token) => set((state) => ({...state,  refreshToken: token  })),
  clearTokens:() => set((state)=> ({...state,accessToken:"",refreshToken:""})),
}),{name:"tokens"}))
