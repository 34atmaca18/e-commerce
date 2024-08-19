'use client'
import React,{createContext,useContext,useState,useEffect} from 'react'
import {User} from '../lib/types'
import { useRouter } from 'next/navigation'

interface AuthContextType {
    currentUser: User | null;
    isLoggedIn: boolean;
    isAdmin: boolean;
    login: (user: User) => void;
    logout: () => void;
  }

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter()
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
      const user = localStorage.getItem('currentUser');
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const adminStatus = localStorage.getItem('isAdmin') === 'true';
  
      if (user) {
        setCurrentUser(JSON.parse(user));
      }
      setIsLoggedIn(loggedIn);
      setIsAdmin(adminStatus);
    }, []);
  
  
    const login = (user: User) => {
      const adminStatus = user.email === 'aslan321@gmail.com';
      setIsAdmin(adminStatus);
      setCurrentUser(user);
      setIsLoggedIn(true);
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('isAdmin', JSON.stringify(adminStatus));
      localStorage.setItem('isLoggedIn', 'true');
      router.push('/'); 
    };
  
    const logout = () => {
      setCurrentUser(null);
      setIsLoggedIn(false);
      setIsAdmin(false);
      localStorage.removeItem('currentUser');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('isAdmin');
      router.push('/login');
    };
    
    return (
      <AuthContext.Provider value={{ currentUser, isLoggedIn, login, logout,isAdmin }}>
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