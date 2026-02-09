import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    // Check for persisted user session on startup
    const checkAuth = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Failed to load user session', error);
      } finally {
        setIsAppReady(true);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Mock login logic
      await new Promise(resolve => setTimeout(resolve, 1000));

      const savedUserJson = await AsyncStorage.getItem('user');
      const savedUser = savedUserJson ? JSON.parse(savedUserJson) : null;

      // If user exists, check password (mocking 'password123' as the default password)
      if (savedUser && savedUser.email.toLowerCase() === email.toLowerCase()) {
        if (password === 'password123' || password === savedUser.password) {
          setUser(savedUser);
          return {success: true};
        } else {
          return {success: false, error: 'INCORRECT_PASSWORD'};
        }
      }

      // Default behavior: simulate a new user session for any new email
      const mockUser = {email, name: 'Demo User', id: 1, password: 'password123'};
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      return {success: true};
    } catch (error) {
      return {success: false, error: error.message};
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    setLoading(true);
    try {
      // Mock signup logic - replace with real auth
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUser = {email, name, id: Math.floor(Math.random() * 1000)};

      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      return {success: true};
    } catch (error) {
      return {success: false, error: error.message};
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const updateProfile = async (newName) => {
    try {
      const updatedUser = {...user, name: newName};
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return {success: true};
    } catch (error) {
      return {success: false, error: error.message};
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateProfile,
    loading,
    isAppReady,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
