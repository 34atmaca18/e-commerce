'use client'
import React,{createContext,useContext,useState,useEffect} from 'react'
import {UserwithoutPassword} from '../lib/types'
import { addLocalCartItemsToDb } from '../lib/db';

interface AuthContextType {
    currentUser: UserwithoutPassword | null;
    loginClient: () => void;
    logoutClient: () => void;
  }

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<UserwithoutPassword | null>(null);
    
    const fetchCookie = async() => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/api/getcookie`);
      
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        return null;
      }
    }
    
    const setUserviaCookie = async() => {
      const cookieData = await fetchCookie();
      if (!cookieData){
        localStorage.removeItem('currentUser');
      }
      else {
        localStorage.setItem('currentUser', JSON.stringify(cookieData));
      }
    }

    useEffect(() => {
      const runItOrder = async() => {
        await setUserviaCookie()
        const user = localStorage.getItem('currentUser');
        if (user) {
          setCurrentUser(JSON.parse(user));
        }
      }
      runItOrder();
    }, []);
  
    const loginClient = async () => {
      try {
        const user = await fetchCookie()
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
      <AuthContext.Provider value={{ currentUser, loginClient, logoutClient }}>
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