import axios from 'axios';
export const url = path => `http://localhost:3000${path}`;
// export const url = path => `https://yz166-hw6-backend.herokuapp.com${path}`;
axios.defaults.withCredentials = true;

export const loadUsers = (users) => ({
    type: loadUsers,
    users
});

export const loadPost = (posts) => ({
    type: loadPost,
    posts
});

export const handleInfo = () => ({
    type: handleInfo
});

export const handleChange = (field, value) => ({
    type: handleChange,
    field,
    value
});

export const handleLogin = (accountname, pwd) => {
    let user = {
        username: accountname,
        password: pwd
    };
    return (dispatch) => {
        axios.post(url('/login'), user, { crossDomain: true }).then((res) => {
            const data = res.data;
            return dispatch({
                type: handleLogin,
                accountname,
                pwd,
                data
            })
        })
    }
    // type: handleLogin,
    // accountname,
    // pwd,
};

export const handleRegister = (accountname, email, phone, birthdate, zipcode, password, displayname) => {
    let user = {
        username: accountname,
        email: email,
        dob: birthdate,
        zipcode: zipcode,
        password: password
    };
    return (dispatch) => {
        axios.post(url('/register'), user, { crossDomain: true }).then((res) => {
            const data = res.data;
            return dispatch({
                type: handleRegister,
                accountname, email, phone, birthdate, zipcode, password, displayname, data
            })
        })
    }
    // type: handleRegister,
    // accountname, email, phone, birthdate, zipcode, password, displayname
};

export const handleReset = () => ({
    type: handleReset
});

export const handleLogout = () => ({
    type: handleLogout
});

export const handleUpdate = (email, phone, zipcode, pwd) => ({
    type: handleUpdate,
    email,
    phone,
    zipcode,
    pwd
});

export const updateStatus = (status) => ({
    type: updateStatus,
    status
});

export const updateFollowed = (accountname, method) => ({
    type: updateFollowed,
    accountname,
    method
});

export const addPost = (accountname, new_post, img) => ({
    type: addPost,
    accountname,
    new_post,
    img
});

export const filterPost = (value, method) => ({
    type: filterPost,
    value,
    method
});