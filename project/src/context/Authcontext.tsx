import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    name: string;
    email: string;
    role: 'renter' | 'admin';
}

interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    cars: any[];
    setCars: React.Dispatch<React.SetStateAction<any[]>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [cars, setCars] = useState<any[]>([]);
    const [rentedCars, setRentedCars] = useState([]);

    useEffect(() => {
        // Runs once on mount to check localStorage
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (token && storedUser) {
            setIsAuthenticated(true);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, setIsAuthenticated, user, setUser, cars, setCars }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
