import {
    goProfile, goMain, handleInfo,
    handleLogin, handleRegister, handleLogout,
    updateStatus, getAll, getFollow, updateFollow, addPost, filterPost, updatePost,
    handleEmail, handleZipcode, handlePhone, handleAvatar, handlePwd,
    getUsername, getInfo, getAvatar, getStatus,
    linkAccount, unlinkAccount, updateLinkAccount, getLink
} from "./actions";

const initialState = {
    accountname: '',
    displayname: '',
    email: '',
    phone: '',
    birthdate: '',
    zipcode: '',
    pwd: '',
    status: '',
    avatar: '',
    follow: [],
    follow_info: [],
    posts: [],
    all: [],
    link: [],
    info: '',
    path: '/'
}

export function frontend(state = initialState, action) {
    switch (action.type) {
        case goMain:
            return {
                ...state,
                path: '/main',
                info: ""
            }
        case goProfile:
            let pwds = new Array(state.accountname.length + 1).join('*');
            let pwd_display = state.pwd !== pwds && state.pwd !== '' ? state.pwd : pwds;
            return {
                ...state,
                path: '/profile',
                pwd: pwd_display,
                info: ""
            }
        case handleInfo:
            return {
                ...state,
                info: ""
            }
        case handleLogin:
            if (action.data.status === 401) {
                return {
                    ...state,
                    info: action.data.data
                }
            }
            document.cookie = "user=" + action.data.username;
            return {
                ...state,
                accountname: action.data.username,
                path: '/main',
                info: ''
            };
        case handleRegister:
            if (action.data.status === 401) {
                return {
                    ...state,
                    info: action.data.data
                }
            }
            return {
                ...state,
                info: 'Successfully Registered',
                path: '/register'
            }
        case handleLogout:
            document.cookie = "user=";
            return {
                ...state,
                login_user: '',
                accountname: '',
                displayname: '',
                email: '',
                phone: '',
                birthdate: '',
                zipcode: '',
                pwd: '',
                status: '',
                avatar: '',
                follow: [],
                follow_info: [],
                posts: [],
                filtered_posts: [],
                info: '',
                path: '/'
            }
        case getUsername:
            let username = document.cookie.split("=")[1];
            if ((username === "" || typeof (username) === "undefined") && action.data.username) {
                document.cookie = "user=" + action.data.username;
            }
            return {
                ...state,
                accountname: action.data.username
            }
        case getStatus:
            return {
                ...state,
                status: action.data.headline
            }
        case updateStatus:
            return {
                ...state,
                status: action.status
            }
        case getAll:
            let all_users = [];
            if (action.data.users) {
                for (let i = 0; i < action.data.users.length; i++) {
                    let username = action.data.users[i].username;
                    let avatar = action.data.users[i].avatar;
                    all_users.push({ username: username, avatar: avatar });
                }
            }
            return {
                ...state,
                all: all_users
            }
        case getFollow:
            return {
                ...state,
                follow: action.data.following,
                follow_info: action.data1.info,
                info: ''
            }
        case updateFollow:
            if (action.data.status === 401) {
                return {
                    ...state,
                    info: action.data.data
                }
            }
            return {
                ...state,
                follow: action.data.following,
                follow_info: action.data1.info,
                info: ''
            }
        case addPost:
            return {
                ...state,
                posts: action.data.articles
            }
        case filterPost:
            return {
                ...state,
                posts: action.data.articles
            }
        case updatePost:
            if (action.data.status === 401) {
                return {
                    ...state,
                    info: action.data.data
                }
            }
            return {
                ...state,
                posts: action.data.articles,
                info: ''
            }
        case handleEmail:
            return {
                ...state,
                email: action.data.email
            };
        case handleZipcode:
            return {
                ...state,
                zipcode: action.data.zipcode
            };
        case handlePhone:
            return {
                ...state,
                phone: action.data.phone
            };
        case handleAvatar:
            return {
                ...state,
                avatar: action.data.avatar
            };
        case handlePwd:
            let new_pwd = new Array(action.pwd.length + 1).join('*');
            return {
                ...state,
                pwd: new_pwd
            }
        case getInfo:
            return {
                ...state,
                email: action.data.email,
                zipcode: action.data1.zipcode,
                phone: action.data2.phone
            }
        case getAvatar:
            return {
                ...state,
                avatar: action.data.avatar
            }
        case linkAccount:
            if (action.data.status === 400 || action.data.status === 401) {
                return {
                    ...state,
                    info: action.data.data
                }
            }
            let link_account = [action.data.username, 'google', action.data.auth[0]['google']];
            return {
                ...state,
                link: link_account,
                info: ''
            }
        case unlinkAccount:
            if (action.data.status === 400 || action.data.status === 401) {
                return {
                    ...state,
                    info: action.data.data
                }
            }
            if (action.data && action.data.auth && action.data.auth.length > 0) {
                let link_account1 = [action.data.username, 'google', action.data.auth[0]['google']];
                return {
                    ...state,
                    link: link_account1,
                    info: ''
                }
            }
            return {
                ...state,
                link: [],
                info: ''
            }
        case updateLinkAccount:
            return {
                ...state
            }
        case getLink:
            if (action.data && action.data.auth && action.data.auth.length > 0) {
                let link_account3 = [action.data.username, 'google', action.data.auth[0]['google']];
                return {
                    ...state,
                    link: link_account3
                }
            }
            return {
                ...state,
                link: []
            }
        default:
            return { ...state };
    }
}