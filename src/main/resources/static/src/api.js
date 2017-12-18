import axios from "axios";

export default {
    user: {
        login: (credentials) => axios.post("/auth/login", credentials).then(res => res.data.user),
        resetPasswordRequest: email => axios.post("/auth/reset_password_request",email),//.then(res => res.data.message)
        validateToken: token => axios.post("/auth/validate_token",{token}),//.then(res => res.data),
        changePassword: data => axios.post("/auth/change_password",data)
    },
    client: {
        create: (data) => axios.post("/client/create", data).then(res => res.data),
        search: (query) => axios.get(`/client/search?q=${query}`)
            .then(res => res.data)
    }
};
