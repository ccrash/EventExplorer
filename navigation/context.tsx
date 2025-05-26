import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface ContextType {
  isEligible: boolean
  setIsEligible: (value: boolean) => void
}

export const Context = createContext<ContextType>({
  isEligible: false,
  setIsEligible: () => {},
})

interface ProviderProps {
  children: ReactNode
}

export const ContextProvider = ({ children }: ProviderProps) => {
  const [isEligible, setIsEligible] = useState(false)

  return (
    <Context.Provider value={{ isEligible, setIsEligible }}>
      {children}
    </Context.Provider>
  )
}

export const useContextProvider = () => {
  return useContext(Context)
}

export default ContextProvider