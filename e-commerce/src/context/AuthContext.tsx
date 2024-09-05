'use client'
import React,{createContext,useContext,useState,useEffect} from 'react'
import {UserwithoutPassword,SessionPayload} from '../lib/types'
import { addLocalCartItemsToDb } from '../lib/db';

interface AuthContextType {
    currentUser: UserwithoutPassword | null;
    pageLoading: boolean;
    loginClient: (user: UserwithoutPassword) => void;
    logoutClient: () => void;
  }

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<UserwithoutPassword | null>(null);
    const [pageLoading, setpageLoading] = useState<boolean>(true);
    
    useEffect(() => {
      const user = localStorage.getItem('currentUser');
      if (user) {
        setCurrentUser(JSON.parse(user));
      }
      setpageLoading(false);
    }, []);
  
    const loginClient = async (user: UserwithoutPassword) => {
      try {
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        const localCartItems = JSON.parse(localStorage.getItem('localCart') || '[]');

        if (localCartItems.length > 0) {
          await addLocalCartItemsToDb(user, localCartItems);
          localStorage.removeItem('localCart');
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    };
    
    const logoutClient = () => {
      setCurrentUser(null);
      localStorage.removeItem('currentUser');
    };
    
    return (
      <AuthContext.Provider value={{ pageLoading,currentUser, loginClient, logoutClient }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('error');
    }
    return context;
  };

export default AuthContext