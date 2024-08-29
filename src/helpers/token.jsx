function getToken() {
    let token = localStorage.getItem('token')
    return token
}


export const config = {
    headers: {
        Authorization: `Bearer ${getToken()}`,
    },
};

export const imgConfig = {
    headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'multipart/form-data',
    },
};