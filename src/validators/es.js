export default {
    custom: {
        email: {
            required: 'El e-mail es requerido'
        },
        username: {
            required: 'El nombre de usuario es requerido'
        },
        password: {
            required: 'La contraseña es requerida',
            min: 'La contraseña demaciado corta'
        },
        password_confirmation: {
            required: 'La contraseña es requerida',
            min: 'La contraseña es too short',
            confirm: 'La contraseña does not match'
        }
    }
}