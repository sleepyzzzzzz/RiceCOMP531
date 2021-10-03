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

export const handleLogin = () => ({
    type: handleLogin
});

export const handleRegister = (data) => ({
    type: handleRegister,
    data
});

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