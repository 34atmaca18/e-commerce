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
      const verifyCookie = async () => {
        try {
          const res = await fetch('/api/getcookie',
            {method: 'GET'});
          if (res.ok) {
            const data = await res.json();
            if(data){
              localStorage.setItem('currentUser', JSON.stringify(data));
              setCurrentUser(data);
            }
          }
          else {
            setCurrentUser(null)
            localStorage.removeItem('currentUser');
          }
        } catch (error) {
          console.error('Error verifying session:', error);
        }
      };
      verifyCookie();
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