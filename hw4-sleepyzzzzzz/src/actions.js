export const loadUsers = (users) => ({
    type: loadUsers,
    users
});

export const loadPost = (posts) => ({
    type: loadPost,
    posts
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

export const handleProfile = () => ({
    type: handleProfile
});

export const handleUpdate = (accountname, email, phone, zipcode, pwd) => ({
    type: handleUpdate,
    accountname,
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

export const addPost = (accountname, new_post) => ({
    type: addPost,
    accountname,
    new_post
});