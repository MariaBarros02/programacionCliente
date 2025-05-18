import { Children, createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import Cookie from 'js-cookie'
const AuthContext = createContext();
const API_URL = "http://localhost:4000/api"
import Alerta from "../componentes/Alerta";
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe estar dentro de un AuthProvider");
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);




    const iniciarSesion = async (infoUser) => {
        setIsAuthenticated(true);
        setUser(infoUser)
    }

    const salir = async () => {
        setIsAuthenticated(false);
        setUser(null);
    }

    const checkAuth = async () => {

        try {
            const res = await axios.get("http://localhost:4000/api/perfil", {
                withCredentials: true,
            });
            setUser(res.data)
            setIsAuthenticated(true);
        } catch (error) {
            setIsAuthenticated(false);
            setUser(null)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, [])

    return (
        <AuthContext.Provider
            value={{
                iniciarSesion,
                salir,
                user,
                isAuthenticated,
                loading,
                errors,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}