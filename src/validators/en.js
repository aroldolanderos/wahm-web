export default {
    custom: {
        email: {
            required: 'E-mail is required'
        },
        username: {
            required: 'Username is required'
        },
        password: {
            required: 'Password is required',
            min: 'Password is too short'
        },
        password_confirmation: {
            required: 'Password is required',
            min: 'Password is too short',
            confirm: 'Password does not match'
        }
    }
}