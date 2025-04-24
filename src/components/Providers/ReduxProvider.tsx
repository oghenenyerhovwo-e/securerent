'use client'

import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/redux'

interface StoreProviderProps {
  children: ReactNode
}

const ReduxProvider = ({ children }: StoreProviderProps) => {
  return <Provider store={store}>{children}</Provider>
}

export default ReduxProvider
