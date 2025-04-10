import React, { createContext, useState, useEffect } from "react";

// Crear el contexto
export const CarritoContext = createContext();

// Proveedor del contexto
export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);

    // Cargar carrito desde localStorage al montar
    useEffect(() => {
        const carritoLocal = JSON.parse(localStorage.getItem("carrito")) || [];
        setCarrito(carritoLocal);
    }, []);

    // Sincronizar carrito con localStorage
    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }, [carrito]);

    // Función para agregar un producto
    const agregarProducto = (producto) => {
        const productoExistente = carrito.find(
            (item) => item.Producto === producto.Producto && item.Tamaño === producto.Tamaño
        );

        let nuevoCarrito;
        if (productoExistente) {
            nuevoCarrito = carrito.map((item) =>
                item.Producto === producto.Producto && item.Tamaño === producto.Tamaño
                    ? {
                        ...item,
                        Cantidad: item.Cantidad + producto.Cantidad,
                        Subtotal: (item.Cantidad + producto.Cantidad) * item.Precio,
                    }
                    : item
            );
        } else {
            nuevoCarrito = [...carrito, { ...producto, Subtotal: producto.Cantidad * producto.Precio }];
        }

        setCarrito(nuevoCarrito);
    };

    // Función para vaciar el carrito
    const vaciarCarrito = () => {
        setCarrito([]);
    };

    return (
        <CarritoContext.Provider value={{ carrito, setCarrito, agregarProducto, vaciarCarrito }}>
            {children}
        </CarritoContext.Provider>
    );
};
