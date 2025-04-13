import jwt from "jsonwebtoken"
import { TOKEN_SECRET } from "../config.js"

export const autRequerida = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: "No hay token, ingreso denegado" })

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Token Invalido" })
        req.user = user

        next()
    })

}

export const autPrevia = (req, res, next) => {
    const { token } = req.params;
    if (!token) return res.status(401).json({ message: "No hay token, ingreso denegado" })

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Token Invalido" })
        req.user = user

        next()
    })

    const decoded = jwt.verify(token, TOKEN_SECRET);
    if (decoded.tipo !== "confirmacion") {
        return res.status(400).json({ mensaje: "Token inválido para este propósito" });
    }

}

export const autNecesaria = (req, res, next) => {
    const { token } = req.params;
    if (!token) return res.status(401).json({ message: "No hay token, ingreso denegado" })

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Token Invalido" })
        req.user = user

        next()
    })

    const decoded = jwt.verify(token, TOKEN_SECRET);
    if (decoded.tipo !== "recuperacion") {
        return res.status(400).json({ mensaje: "Token inválido para este propósito" });
    }

}
