import {
    loadUsers, loadPost,
    handleChange, handleLogin, handleRegister, handleReset, handleLogout, handleProfile, handleUpdate,
    updateStatus, updateFollowed, addPost
} from "./actions";

const src_images = ['https://i.pinimg.com/originals/b7/95/ae/b795aeb2de5163c7ca236f51913b86a9.jpg',
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQjWk93Q2yDE0fD6zusUUbTADPZQ1WSTkLwAA&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRyBAkCczjPeZo8MwJMb47HZcSNiZyzShAncQ&usqp=CAU"];
const post_src_images = ["https://res.cloudinary.com/teepublic/image/private/s--_Gv-wTbm--/t_Resized%20Artwork/c_fit,g_north_west,h_1054,w_1054/co_ffffff,e_outline:53/co_ffffff,e_outline:inner_fill:53/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/t_watermark_lock/c_limit,f_jpg,h_630,q_90,w_630/v1566445916/production/designs/5690129_1.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTEUvlFNIt7IAw1lR_KmWagmpSfl2PJ8_7w4Q&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTzQy-YESQDXmjeysJQKh3EI4Z0WEWmhO6FOA&usqp=CAU"];

const initialState = {
    users: [],
    login_user: {},
    posts: [],
    all_posts: [],
    accountname: '',
    displayname: '',
    email: '',
    phone: '',
    birthdate: '',
    zipcode: '',
    pwd: '',
    status: '',
    picture: '',
    followed: [],
    info: '',
    redirect: null
}

export function frontend(state = initialState, action) {
    let registered = false;
    let updated_users = state.users;
    let current_user_idx = load_current_info(updated_users, state.login_user.accountname);
    let current_user = current_user_idx[0];
    let user_idx = current_user_idx[1];
    switch (action.type) {
        case loadUsers:
            let load_users = load_user(action.users);
            let username = document.cookie.split("=")[1];
            if (username !== "") {
                let user_info_idx = load_current_info(load_users, username);
                let user_info = user_info_idx[0];
                return {
                    ...state,
                    users: load_users,
                    login_user: user_info,
                    accountname: user_info.accountname,
                    email: user_info.email,
                    phone: user_info.phone,
                    zipcode: user_info.zipcode,
                    pwd: user_info.pwd,
                    status: user_info.status,
                    followed: user_info.followed_users
                };
            }
            return {
                ...state,
                users: load_users
            };
        case loadPost:
            let load_posts = load_post(action.posts, state.users);
            let usernames = document.cookie.split("=")[1];
            if (usernames !== "") {
                let user_post = find_user_post(usernames, load_posts);
                return {
                    ...state,
                    posts: user_post
                };
            }
            return {
                ...state,
                all_posts: load_posts
            };
        case handleChange:
            let key = action.field;
            let value = action.value;
            switch (key) {
                case "accountname":
                    return {
                        ...state,
                        accountname: value,
                        info: ''
                    };
                case "displayname":
                    return {
                        ...state,
                        displayname: value,
                        info: ''
                    };
                case "email":
                    return {
                        ...state,
                        email: value,
                        info: ''
                    };
                case "phone":
                    return {
                        ...state,
                        phone: value,
                        info: ''
                    };
                case "birthdate":
                    return {
                        ...state,
                        birthdate: value,
                        info: ''
                    };
                case "zipcode":
                    return {
                        ...state,
                        zipcode: value,
                        info: ''
                    };
                case "pwd":
                    return {
                        ...state,
                        pwd: value,
                        info: ''
                    };
                case "status":
                    return {
                        ...state,
                        status: value,
                        info: ''
                    }
                default:
                    return {
                        ...state,
                        info: ''
                    };
            }
        case handleLogin:
            registered = login(state.users, state.accountname, state.pwd);
            if (!registered) {
                return {
                    ...state,
                    info: "Account Name or Password is not correct; Or you haven't registered yet, Please register first!"
                }
            }
            let new_login_user = state.accountname;
            let login_user_idx = load_current_info(state.users, new_login_user);
            let cur_login_user = login_user_idx[0];
            let user_posts = find_user_post(state.accountname, state.all_posts);
            document.cookie = "user=" + state.accountname;
            return {
                ...state,
                login_user: cur_login_user,
                posts: user_posts,
                accountname: state.accountname,
                email: cur_login_user.email,
                phone: cur_login_user.phone,
                zipcode: cur_login_user.zipcode,
                pwd: cur_login_user.pwd,
                status: cur_login_user.status,
                picture: cur_login_user.picture,
                followed: cur_login_user.followed_users,
                redirect: "/main"
            };
        case handleRegister:
            registered = check_register(state.accountname, state.users);
            if (registered) {
                return {
                    ...state,
                    info: "The account name has already been taken. Please choose another one"
                };
            }
            let image = src_images[parseInt(Math.floor(Math.random() * src_images.length))];
            let new_users = state.users;
            let new_user = {
                accountname: state.accountname,
                displayname: state.displayname,
                email: state.email,
                phone: state.phone,
                birthdate: state.birthdate,
                zipcode: state.zipcode,
                pwd: state.pwd,
                status: '',
                picture: image,
                followed_users: []
            };
            add_follow(state.users, new_user);
            new_users.push(new_user);
            let new_user_posts = find_user_post(state.accountname, state.all_posts);
            document.cookie = "user=" + state.accountname;
            return {
                ...state,
                users: new_users,
                login_user: new_user_posts[0],
                posts: new_user_posts,
                followed: new_user.followed_users,
                info: '',
                redirect: "/main"
            };
        case handleReset:
            return {
                ...state,
                accountname: '',
                displayname: '',
                email: '',
                phone: '',
                birthdate: '',
                zipcode: '',
                pwd: '',
                info: '',
                redirect: null
            };
        case handleLogout:
            document.cookie = "user=";
            return {
                ...state,
                login_user: {},
                posts: [],
                accountname: '',
                displayname: '',
                email: '',
                phone: '',
                birthdate: '',
                zipcode: '',
                pwd: '',
                status: '',
                followed: [],
                info: '',
                redirect: null
            }
        case handleProfile:
            return {
                ...state,
                redirect: null
            }
        case handleUpdate:
            let new_accountname = action.accountname === "" ? state.accountname : action.accountname;
            let new_email = action.email === "" ? state.email : action.email;
            let new_phone = action.phone === "" ? state.phone : action.phone;
            let new_zipcode = action.zipcode === "" ? state.zipcode : action.zipcode;
            let new_pwd = action.pwd === "" ? state.pwd : action.pwd;
            let updated_user = {
                ...updated_users[user_idx],
                accountname: new_accountname,
                displayname: updated_users[user_idx].displayname ? updated_users[user_idx].displayname : "",
                email: new_email,
                phone: new_phone,
                birthdate: updated_users[user_idx].birthdate,
                zipcode: new_zipcode,
                pwd: new_pwd,
                picture: updated_users[user_idx].picture,
                status: updated_users[user_idx].status
            };
            updated_users[user_idx] = updated_user;
            return {
                ...state,
                users: updated_users,
                login_user: updated_user,
                accountname: new_accountname,
                email: new_email,
                phone: new_phone,
                zipcode: new_zipcode,
                pwd: new_pwd
            };
        case updateStatus:
            let updated_user_status = {
                ...updated_users[user_idx],
                status: action.status
            };
            return {
                ...state,
                users: updated_user_status,
                status: action.status
            }
        case updateFollowed:
            let updated_followed_users = state.followed;
            switch (action.method) {
                case "add":
                    let new_followed_user = load_current_info(state.users, action.accountname);
                    updated_followed_users.push(new_followed_user[0]);
                    current_user.followed_users = updated_followed_users;
                    updated_users[current_user_idx] = current_user;
                    return {
                        ...state,
                        users: updated_users,
                        followed: updated_followed_users
                    }
                case "unfollow":
                    let idx = -1;
                    for (let i = 0; i < updated_followed_users.length; i++) {
                        if (action.accountname === updated_followed_users[i].accountname) {
                            idx = i;
                            break;
                        }
                    }
                    updated_followed_users.splice(idx, 1);
                    current_user.followed_users = updated_followed_users;
                    updated_users[current_user_idx] = current_user;
                    let new_followed = [];
                    updated_followed_users.forEach(fu => new_followed.push(fu));
                    return {
                        ...state,
                        users: updated_users,
                        followed: new_followed
                    }
                default:
                    return { ...state };
            }
        case addPost:
            let updated_posts = state.all_posts;
            let updated_user_posts = state.posts;
            let new_idx = updated_user_posts.length;
            let post_time = new Intl.DateTimeFormat().format(new Date());
            let new_user_post = {
                id: new_idx,
                author: action.accountname,
                body: action.new_post,
                timestamp: post_time,
                photo: "https://res.cloudinary.com/teepublic/image/private/s--_Gv-wTbm--/t_Resized%20Artwork/c_fit,g_north_west,h_1054,w_1054/co_ffffff,e_outline:53/co_ffffff,e_outline:inner_fill:53/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/t_watermark_lock/c_limit,f_jpg,h_630,q_90,w_630/v1566445916/production/designs/5690129_1.jpg"
            }
            updated_posts.unshift(new_user_post);
            updated_user_posts.unshift(new_user_post);
            return {
                ...state,
                posts: updated_user_posts,
                all_posts: updated_posts
            };
        default:
            return { ...state };
    }
}

function load_user(data) {
    let load_users = [];
    for (let i = 0; i < data.length; i++) {
        let user = data[i];
        let image = src_images[parseInt(Math.floor(Math.random() * src_images.length))];
        let one_user = {
            accountname: user.username,
            displayname: user.name,
            email: user.email,
            phone: user.phone,
            zipcode: user.address.zipcode,
            pwd: user.address.street,
            status: user.company.catchPhrase,
            picture: image,
            followed_users: [],
            id: user.id
        };
        load_users.push(one_user);
    }
    for (let i = 0; i < load_users.length; i++) {
        let follow = [];
        for (var j = 1; j < 4; j++) {
            let idx = i + j;
            if (idx >= 10) {
                idx -= 10;
            }
            follow.push(load_users[idx]);
        }
        load_users[i].followed = follow;
    }
    return load_users;
}

function load_post(data, users) {
    let load_posts = [];
    data.forEach(function (post) {
        let username = '';
        for (var i = 0; i < users.length; i++) {
            if (users[i].id === post.userId) {
                username = users[i].accountname;
                break;
            }
        }
        let seed = random_timestamp(new Date("12-24-2000 00:00"), new Date());
        let image = post_src_images[parseInt(Math.floor(Math.random() * post_src_images.length))];
        let one_post = {
            author: username,
            title: post.title,
            body: post.body,
            timestamp: seed,
            photo: image
        };
        load_posts.push(one_post);
    });
    return load_posts;
}

function add_follow(users, new_user) {
    for (let i = 0; i < 3; i++) {
        new_user.followed_users.push(users[i]);
    }
}

function login(users, accountname, pwd) {
    if (accountname === "" || pwd === "") {
        return false
    }
    let register = false;
    users.forEach(function (user) {
        if (user.accountname === accountname && user.pwd === pwd) {
            register = true;
            return register;
        }
    });
    return register;
}

function check_register(accountname, users) {
    let register = false;
    users.forEach(function (user) {
        if (user.accountname === accountname) {
            register = true;
            return register;
        }
    });
    return register;
}

function load_current_info(users, login_user) {
    let current_info = {};
    let idx = 0;
    for (var i = 0; i < users.length; i++) {
        if (users[i].accountname === login_user) {
            current_info.accountname = users[i].accountname;
            current_info.email = users[i].email;
            current_info.phone = users[i].phone;
            current_info.zipcode = users[i].zipcode;
            current_info.pwd = users[i].pwd;
            current_info.status = users[i].status;
            current_info.picture = users[i].picture;
            current_info.followed_users = users[i].followed;
            idx = i;
            break;
        }
    }
    return [current_info, idx];
}

function find_user_post(accountname, posts) {
    let user_posts = [];
    let idx = 0;
    posts.forEach(function (post) {
        if (post.author === accountname) {
            post["id"] = idx;
            user_posts.push(post);
            idx += 1;
        }
    });
    user_posts.sort(compare_feed);
    return user_posts;
}

function random_timestamp(s, t) {
    let diff = t.getTime() - s.getTime();
    let diff1 = diff * Math.random();
    let time = new Date(s.getTime() + diff1);
    let timestamp = new Intl.DateTimeFormat().format(time);
    return timestamp;
}

function compare_feed(m, n) {
    return new Date(n.timestamp).getTime() - new Date(m.timestamp).getTime();
}