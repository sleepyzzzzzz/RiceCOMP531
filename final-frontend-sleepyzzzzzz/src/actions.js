import axios from 'axios';
export const url = path => `http://localhost:3000${path}`;
// export const url = path => `https://yz166-final-backend.herokuapp.com${path}`;
axios.defaults.withCredentials = true;

export const goMain = () => ({
    type: goMain
});

export const goProfile = () => ({
    type: goProfile
});

export const handleInfo = () => ({
    type: handleInfo
});

// Landing
export const handleLogin = (accountname, pwd) => {
    let user = {
        username: accountname,
        password: pwd
    };
    return (dispatch) => {
        return axios.post(url('/login'), user, { crossDomain: true }).then((res) => {
            const data = res.data;
            dispatch({
                type: handleLogin,
                accountname,
                pwd,
                data
            })
        }).catch(e => {
            const data = e.response;
            dispatch({
                type: handleLogin,
                data
            })
        })
    }
};

export const handleRegister = (accountname, email, phone, birthdate, zipcode, password, displayname) => {
    let user = {
        username: accountname,
        displayname: displayname,
        email: email,
        dob: birthdate,
        zipcode: zipcode,
        phone: phone,
        password: password
    };
    return (dispatch) => {
        return axios.post(url('/register'), user, { crossDomain: true }).then((res) => {
            const data = res.data;
            dispatch({
                type: handleRegister,
                accountname, email, phone, birthdate, zipcode, password, displayname,
                data
            })
        }).catch(e => {
            const data = e.response;
            dispatch({
                type: handleRegister,
                data
            })
        })
    }
};

// Main
export const handleLogout = () => {
    return (dispatch) => {
        return axios.put(url('/logout'), { crossDomain: true }).then((res) => {
            const data = res.data;
            window.location.href = '/';
            dispatch({
                type: handleLogout,
                data
            }).catch(e => {
                const data = e.response;
                dispatch({
                    type: handleLogout,
                    data
                })
            })
        }).catch(e => {
            const data = e.response;
            dispatch({
                type: handleLogout,
                data
            })
        })
    }
};

export const getStatus = () => {
    return (dispatch) => {
        return axios.get(url('/headline'), { crossDomain: true }).then((res) => {
            const data = res.data;
            dispatch({
                type: getStatus,
                data
            })
        }).catch(e => {
            const data = e.response;
            dispatch({
                type: getStatus,
                data
            })
        })
    };
}

export const updateStatus = (status) => {
    let headline = {
        headline: status
    };
    return (dispatch) => {
        return axios.put(url('/headline'), headline, { crossDomain: true }).then((res) => {
            const data = res.data;
            dispatch({
                type: updateStatus,
                status, data
            })
        }).catch(e => {
            const data = e.response;
            dispatch({
                type: updateStatus,
                data
            })
        })
    }
};

export const getAll = () => {
    return (dispatch) => {
        return axios.get(url('/users'), { crossDomain: true }).then((res) => {
            const data = res.data;
            dispatch({
                type: getAll,
                data
            })
        }).catch(e => {
            const data = e.response;
            dispatch({
                type: getAll,
                data
            })
        })
    };
}

export const getFollow = () => {
    return (dispatch) => {
        return axios.get(url('/following'), { crossDomain: true }).then((res) => {
            const data = res.data;
            return axios.get(url('/followinginfo'), { crossDomain: true }).then((res1) => {
                const data1 = res1.data;
                dispatch({
                    type: getFollow,
                    data,
                    data1
                })
            }).catch(e => {
                const data = e.response;
                dispatch({
                    type: getFollow,
                    data
                })
            })
        })
    };
}

export const updateFollow = (username, method) => {
    if (method === 'add') {
        return (dispatch) => {
            return axios.put(url('/following/' + username), { crossDomain: true }).then((res) => {
                const data = res.data;
                return axios.get(url('/followinginfo'), { crossDomain: true }).then((res1) => {
                    const data1 = res1.data;
                    dispatch({
                        type: getFollow,
                        data,
                        data1
                    })
                }).catch(e => {
                    const data = e.response;
                    dispatch({
                        type: getFollow,
                        data
                    })
                })
            }).catch(e => {
                const data = e.response;
                dispatch({
                    type: updateFollow,
                    data
                })
            })
        };
    }
    else {
        return (dispatch) => {
            return axios.delete(url('/following/' + username), { crossDomain: true }).then((res) => {
                const data = res.data;
                return axios.get(url('/followinginfo'), { crossDomain: true }).then((res1) => {
                    const data1 = res1.data;
                    dispatch({
                        type: getFollow,
                        data,
                        data1
                    })
                }).catch(e => {
                    const data = e.response;
                    dispatch({
                        type: getFollow,
                        data
                    })
                })
            }).catch(e => {
                const data = e.response;
                dispatch({
                    type: updateFollow,
                    data
                })
            })
        };
    }
};

export const addPost = (accountname, new_post, img) => {
    const fd = new FormData();
    fd.append('text', new_post)
    fd.append('image', img);
    return (dispatch) => {
        return axios.post(url('/article'), fd, { crossDomain: true }).then((res) => {
            const data = res.data;
            dispatch({
                type: addPost,
                accountname,
                new_post,
                img,
                data
            })
        }).catch(e => {
            const data = e.response;
            dispatch({
                type: addPost,
                data
            })
        })
    }
};

export const filterPost = (value, method) => {
    if (method !== '') {
        return (dispatch) => {
            return axios.get(url('/article/' + value), { crossDomain: true }).then((res) => {
                const data = res.data;
                dispatch({
                    type: filterPost,
                    value,
                    method,
                    data
                })
            }).catch(e => {
                const data = e.response;
                dispatch({
                    type: filterPost,
                    data
                })
            })
        };
    }
    else {
        return (dispatch) => {
            return axios.get(url('/articles'), { crossDomain: true }).then((res) => {
                const data = res.data;
                dispatch({
                    type: filterPost,
                    value,
                    method,
                    data
                })
            }).catch(e => {
                const data = e.response;
                dispatch({
                    type: filterPost,
                    data
                })
            })
        };
    }
};

export const updatePost = (text, pid, id) => {
    let post;
    if (id === -2) {
        post = {
            text: text
        }
    }
    else {
        post = {
            text: text,
            commentId: id
        }
    }
    return (dispatch) => {
        return axios.put(url('/articles/' + pid), post, { crossDomain: true }).then((res) => {
            const data = res.data;
            dispatch({
                type: updatePost,
                text,
                pid,
                id,
                data
            })
        }).catch(e => {
            const data = e.response;
            dispatch({
                type: updatePost,
                data
            })
        })
    }
}

export const handleEmail = (email) => {
    let new_email = {
        email: email
    }
    return (dispatch) => {
        return axios.put(url('/email'), new_email, { crossDomain: true }).then((res) => {
            const data = res.data;
            dispatch({
                type: handleEmail,
                email,
                data
            })
        }).catch(e => {
            const data = e.response;
            dispatch({
                type: handleEmail,
                data
            })
        })
    }
}

export const handlePhone = (phone) => {
    let new_phone = {
        phone: phone
    }
    return (dispatch) => {
        return axios.put(url('/phone'), new_phone, { crossDomain: true }).then((res) => {
            const data = res.data;
            dispatch({
                type: handlePhone,
                phone,
                data
            })
        }).catch(e => {
            const data = e.response;
            dispatch({
                type: handlePhone,
                data
            })
        })
    }
}

export const handleZipcode = (zipcode) => {
    let new_zipcode = {
        zipcode: zipcode
    }
    return (dispatch) => {
        return axios.put(url('/zipcode'), new_zipcode, { crossDomain: true }).then((res) => {
            const data = res.data;
            dispatch({
                type: handleZipcode,
                zipcode,
                data
            })
        }).catch(e => {
            const data = e.response;
            dispatch({
                type: handleZipcode,
                data
            })
        })
    }
}

export const handleAvatar = (avatar) => {
    const fd = new FormData();
    fd.append('image', avatar);
    return (dispatch) => {
        return axios.put(url('/avatar'), fd, { crossDomain: true, }).then((res) => {
            const data = res.data;
            dispatch({
                type: handleAvatar,
                avatar,
                data
            })
        }).catch(e => {
            const data = e.response;
            dispatch({
                type: handleAvatar,
                data
            })
        })
    }
}

export const handlePwd = (pwd) => {
    let new_password = {
        password: pwd
    }
    return (dispatch) => {
        return axios.put(url('/password'), new_password, { crossDomain: true }).then((res) => {
            const data = res.data;
            dispatch({
                type: handlePwd,
                pwd,
                data
            })
        }).catch(e => {
            const data = e.response;
            dispatch({
                type: handlePwd,
                data
            })
        })
    }
}

export const getInfo = () => {
    return (dispatch) => {
        return axios.get(url('/email'), { crossDomain: true }).then((res) => {
            const data = res.data;
            return axios.get(url('/zipcode'), { crossDomain: true }).then((res1) => {
                const data1 = res1.data;
                return axios.get(url('/phone'), { crossDomain: true }).then((res2) => {
                    const data2 = res2.data;
                    dispatch({
                        type: getInfo,
                        data,
                        data1,
                        data2
                    })
                }).catch(e => {
                    const data = e.response;
                    dispatch({
                        type: getInfo,
                        data
                    })
                })
            })
        })
    };
};

export const getAvatar = () => {
    return (dispatch) => {
        return axios.get(url('/avatar'), { crossDomain: true }).then((res) => {
            const data = res.data;
            dispatch({
                type: getAvatar,
                data
            })
        }).catch(e => {
            const data = e.response;
            dispatch({
                type: getAvatar,
                data
            })
        })
    };
};

export const linkAccount = (username, pwd) => {
    let link_account = {
        username: username,
        password: pwd
    }
    return (dispatch) => {
        return axios.post(url('/link'), link_account, { crossDomain: true, }).then((res) => {
            const data = res.data;
            dispatch({
                type: linkAccount,
                data
            })
        }).catch(e => {
            const data = e.response;
            dispatch({
                type: linkAccount,
                data
            })
        })
    }
}

export const unlinkAccount = (username) => {
    return (dispatch) => {
        return axios.get(url('/unlink/' + username), { crossDomain: true, }).then((res) => {
            const data = res.data;
            dispatch({
                type: unlinkAccount,
                data
            })
        }).catch(e => {
            const data = e.response;
            dispatch({
                type: unlinkAccount,
                data
            })
        })
    }
}

export const updateLinkAccount = () => {
    return (dispatch) => {
        return axios.put(url('/link'), { crossDomain: true, }).then((res) => {
            const data = res.data;
            dispatch({
                type: updateLinkAccount,
                data
            })
        }).catch(e => {
            const data = e.response;
            dispatch({
                type: updateLinkAccount,
                data
            })
        })
    }
}

export const getLink = () => {
    return (dispatch) => {
        return axios.get(url('/link'), { crossDomain: true, }).then((res) => {
            const data = res.data;
            dispatch({
                type: getLink,
                data
            })
        }).catch(e => {
            const data = e.response;
            dispatch({
                type: getLink,
                data
            })
        })
    }
}

export const getUsername = () => {
    return (dispatch) => {
        return axios.get(url('/username'), { crossDomain: true, }).then((res) => {
            const data = res.data;
            dispatch({
                type: getUsername,
                data
            })
        }).catch(e => {
            const data = e.response;
            dispatch({
                type: getUsername,
                data
            })
        })
    }
}