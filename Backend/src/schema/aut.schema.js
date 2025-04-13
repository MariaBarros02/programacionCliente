import {z} from 'zod'

export const registrarSchema = z.object({
    primerNombre: z.string({
        required_error: "El primer nombre del usuario es obligatorio"
    }),
    primerApellido: z.string({
        required_error: "El primer apellido del usuario es obligatorio"
    }),
    correo: z.string({
        required_error: "El correo es obligatorio"
    }).email({
        message: "El correo ingresado no es válido" 
     }),
    celular: z.string({
        required_error: "El celular es obligatorio"
    }).regex(/^\d+$/, {
        message: "El celular ingresado no es válido" 
     }).min(10, {
        message: "El celular debe tener minimo 10 digitos"
    }),
    contrasena: z.string({
        required_error: "La contraseña es obligatoria"
    }).min(8, {
        message: "La contraseña debe tener minimo 8 caracteres"
    })
})

export const ingresarSchema = z.object({
    correo: z.string({
        required_error: "El correo es obligatorio"
    }).email({
       message: "El correo ingresado no es válido" 
    }),
    contrasena: z.string({
        required_error: "La contraseña es obligatoria"
    }).min(8, {
        message: "La contraseña debe tener minimo 8 caracteres"
    })

})

export const recuperarContraseñaSchema = z.object({
    correo: z.string({
        required_error: "El correo es obligatorio"
    }).email({
        message: "El correo ingresado no es válido" 
     }),
})

export const cambiarContrasenaSchema = z.object({
    contrasena: z.string({
        required_error: "La contraseña es obligatoria"
    }).min(8, {
        message: "La contraseña debe tener minimo 8 caracteres"
    })
})
