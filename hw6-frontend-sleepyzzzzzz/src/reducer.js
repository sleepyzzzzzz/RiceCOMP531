import {
    loadUsers, loadPost,
    handleInfo, handleChange, handleLogin, handleRegister, handleReset, handleLogout, handleUpdate,
    updateStatus, updateFollowed, addPost, filterPost
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
    user_posts: [],
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
    filtered_posts: [],
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

            // localStorage.clear();
            // document.cookie = "user=";
            // let local_users;
            // if (typeof (Storage) !== "undefined") {
            //     // localStorage.clear();
            //     // document.cookie = "user=";
            //     local_users = JSON.parse(localStorage.getItem("users") || '[]');
            //     if (local_users.length === 0) {
            //         localStorage.setItem("users", JSON.stringify(load_users));
            //     }
            //     else {
            //         load_users = local_users;
            //     }
            // }

            let username = document.cookie.split("=")[1];
            if (username !== "") {
                let user_info_idx = load_current_info(load_users, username);
                let user_info = user_info_idx[0];
                let last_status = [];
                if (typeof (Storage) !== "undefined") {
                    last_status = JSON.parse(localStorage.getItem("status"));
                }
                let idx = find_status(last_status, username);
                let prev_status = idx !== -1 ? last_status[idx][username] : user_info.status;
                return {
                    ...state,
                    users: load_users,
                    login_user: user_info,
                    user_posts: user_info.user_posts,
                    accountname: user_info.accountname,
                    email: user_info.email,
                    phone: user_info.phone,
                    zipcode: user_info.zipcode,
                    pwd: user_info.pwd,
                    status: prev_status,
                    followed: user_info.followed
                };
            }
            if (typeof (Storage) !== "undefined") {
                if (localStorage.getItem("status") === null) {
                    localStorage.setItem("status", JSON.stringify([{ "status": "start" }]));
                }
            }
            return {
                ...state,
                users: load_users
            };
        case loadPost:
            let load_posts = load_post(action.posts, state.users);
            for (let i = 0; i < updated_users.length; i++) {
                add_post(updated_users[i], load_posts);
            }
            // if (typeof (Storage) !== "undefined") {
            //     localStorage.setItem("users", JSON.stringify(updated_users));
            // }
            let last_login_user = state.login_user;
            if (last_login_user !== {}) {
                let last_login_users = load_current_info(state.users, last_login_user.accountname);
                let user_post = find_user_post(last_login_users[0], load_posts);
                return {
                    ...state,
                    users: updated_users,
                    user_posts: last_login_users[0].user_posts,
                    posts: user_post,
                    all_posts: load_posts,
                    filtered_posts: user_post
                };
            }
            return {
                ...state,
                users: updated_users,
                all_posts: load_posts
            };
        case handleInfo:
            return {
                ...state,
                info: ""
            }
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
            // registered = login(state.users, state.accountname, state.pwd);
            // if (!registered) {
            //     return {
            //         ...state,
            //         info: "Account Name or Password is not correct; Or you haven't registered yet, Please register first!"
            //     }
            // }
            if (!action.data.status === 401) {
                return {
                    ...state,
                    info: "Account Name or Password is not correct; Or you haven't registered yet, Please register first!"
                }
            }
            let new_login_user = state.accountname;
            let login_user_idx = load_current_info(state.users, new_login_user);
            let cur_login_user = login_user_idx[0];
            let follow_posts = find_user_post(cur_login_user, state.all_posts);
            document.cookie = "user=" + state.accountname;
            let stat = [];
            if (typeof (Storage) !== "undefined") {
                stat = JSON.parse(localStorage.getItem("status"));
            }
            let idx = find_status(stat, new_login_user);
            let prev_stat = idx !== -1 ? stat[idx][new_login_user] : cur_login_user.status;
            return {
                ...state,
                login_user: cur_login_user,
                user_posts: cur_login_user.user_posts,
                posts: follow_posts,
                accountname: state.accountname,
                email: cur_login_user.email,
                phone: cur_login_user.phone,
                zipcode: cur_login_user.zipcode,
                pwd: cur_login_user.pwd,
                status: prev_stat,
                picture: cur_login_user.picture,
                followed: cur_login_user.followed,
                filtered_posts: follow_posts,
                info: '',
                redirect: "/main"
            };
        case handleRegister:
            // registered = check_register(action.accountname, action.users);
            // if (registered) {
            //     return {
            //         ...state,
            //         info: "The account name has already been taken. Please choose another one"
            //     };
            // }
            if (!action.data.status === 401) {
                return {
                    ...state,
                    info: "The account name has already been taken. Please choose another one"
                }
            }
            let image = src_images[parseInt(Math.floor(Math.random() * src_images.length))];
            let new_users = state.users;
            let new_user = {
                accountname: action.accountname,
                displayname: action.displayname,
                email: action.email,
                phone: action.phone,
                birthdate: action.birthdate,
                zipcode: action.zipcode,
                pwd: action.pwd,
                status: '',
                picture: image,
                followed: []
            };
            add_follow(state.users, new_user);
            new_users.push(new_user);
            // document.cookie = "user=" + state.accountname;
            return {
                ...state,
                users: new_users,
                info: 'Successfully Registered',
                redirect: null
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
                user_posts: [],
                posts: [],
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
                filtered_posts: [],
                redirect: null
            }
        case handleUpdate:
            let new_email = action.email === "" ? state.email : action.email;
            let new_phone = action.phone === "" ? state.phone : action.phone;
            let new_zipcode = action.zipcode === "" ? state.zipcode : action.zipcode;
            let new_pwd = action.pwd === "" ? state.pwd : action.pwd;
            let updated_user = {
                ...updated_users[user_idx],
                accountname: updated_users[user_idx].accountname,
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
            updated_users[user_idx] = updated_user_status;

            if (typeof (Storage) !== "undefined") {
                let local_status = JSON.parse(localStorage.getItem("status"));
                let name = updated_users[user_idx].accountname;
                let cur = {};
                cur[name] = action.status;
                let idx = find_status(local_status, name);
                if (idx !== -1) {
                    local_status[idx] = cur;
                }
                else {
                    local_status.push(cur);
                }
                localStorage.setItem("status", JSON.stringify(local_status));
            }

            return {
                ...state,
                users: updated_users,
                status: action.status
            }
        case updateFollowed:
            let updated_followed_users = state.followed;
            let posts = state.posts;
            let update_followed_user = load_current_info(state.users, action.accountname);
            switch (action.method) {
                case "add":
                    let exist = find_follow_exist(state.followed, action.accountname);
                    if (state.accountname === action.accountname) {
                        return {
                            ...state,
                            info: "You are this user"
                        }
                    }
                    else if (update_followed_user[1] === -1) {
                        return {
                            ...state,
                            info: "No such user"
                        }
                    }
                    else if (exist) {
                        return {
                            ...state,
                            info: "You have already followed this person"
                        }
                    }
                    updated_followed_users.push(JSON.stringify(update_followed_user[0]));
                    current_user.followed = updated_followed_users;
                    updateposts(posts, update_followed_user[0], "add");
                    current_user.posts = posts;
                    updated_users[current_user_idx] = current_user;
                    return {
                        ...state,
                        users: updated_users,
                        followed: updated_followed_users,
                        posts: current_user.posts,
                        info: '',
                        filtered_posts: current_user.posts
                    }
                case "unfollow":
                    let idx = -1;
                    for (let i = 0; i < updated_followed_users.length; i++) {
                        if (action.accountname === JSON.parse(updated_followed_users[i]).accountname) {
                            idx = i;
                            break;
                        }
                    }
                    updated_followed_users.splice(idx, 1);
                    current_user.followed = updated_followed_users;
                    updated_users[current_user_idx] = current_user;
                    updateposts(posts, update_followed_user[0], "unfollow");
                    current_user.posts = posts;
                    let new_followed = [];
                    updated_followed_users.forEach(fu => new_followed.push(fu));
                    return {
                        ...state,
                        users: updated_users,
                        followed: new_followed,
                        posts: current_user.posts,
                        info: '',
                        filtered_posts: current_user.posts
                    }
                default:
                    return { ...state };
            }
        case addPost:
            let updated_posts = state.all_posts;
            let updated_user_posts = state.posts;
            let post_author = load_current_info(state.users, action.accountname);
            let post_author_avatar = post_author[0].picture;
            let new_idx = updated_user_posts.length;
            let post_time = new Intl.DateTimeFormat().format(new Date());
            let new_user_post = {
                id: new_idx,
                author: action.accountname,
                author_avatar: post_author_avatar,
                body: action.new_post,
                timestamp: post_time,
                photo: action.img,
                comments: []
            }
            updated_posts.unshift(new_user_post);
            updated_user_posts.unshift(new_user_post);
            return {
                ...state,
                posts: updated_user_posts,
                all_posts: updated_posts,
                filtered_posts: updated_user_posts
            };
        case filterPost:
            let user_follower_posts = state.posts;
            let filtered = [];
            switch (action.method) {
                case "author":
                    for (let i = 0; i < user_follower_posts.length; i++) {
                        if (action.value === user_follower_posts[i].author) {
                            filtered.push(user_follower_posts[i]);
                        }
                    }
                    return {
                        ...state,
                        filtered_posts: filtered
                    }
                case "text":
                    for (let i = 0; i < user_follower_posts.length; i++) {
                        let tmp = user_follower_posts[i].body.split(" ");
                        for (let j = 0; j < tmp.length; j++) {
                            if (action.value === tmp[j]) {
                                filtered.push(user_follower_posts[i]);
                                break;
                            }
                        }
                    }
                    return {
                        ...state,
                        filtered_posts: filtered
                    }
                default:
                    return {
                        ...state,
                        filtered_posts: user_follower_posts
                    };
            }
        default:
            return { ...state };
    }
}

function find_status(status, accountname) {
    let idx = -1;
    if (status !== null && status.length > 0) {
        for (let i = 0; i < status.length; i++) {
            if (status[i].hasOwnProperty(accountname)) {
                idx = i
                return idx;
            }
        }
        return idx;
    }
    return idx;
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
            followed: [],
            user_posts: [],
            id: user.id
        };
        load_users.push(one_user);
    }
    for (let i = 0; i < load_users.length; i++) {
        let followed = [];
        for (var j = 1; j < 4; j++) {
            let idx = i + j;
            if (idx >= load_users.length) {
                idx -= load_users.length;
            }
            followed.push(JSON.stringify(load_users[idx]));
        }
        load_users[i].followed = followed;
    }
    return load_users;
}

function load_post(data, users) {
    let load_posts = [];
    data.forEach(function (post) {
        let username = '';
        let avatar = '';
        for (var i = 0; i < users.length; i++) {
            if (users[i].id === post.userId) {
                username = users[i].accountname;
                avatar = users[i].picture
                break;
            }
        }
        let seed = random_timestamp(new Date("12-24-2000 00:00"), new Date());
        let image = post_src_images[parseInt(Math.floor(Math.random() * post_src_images.length))];
        let one_post = {
            author: username,
            author_avatar: avatar,
            title: post.title,
            body: post.body,
            timestamp: seed,
            photo: image,
            comments: []
        };

        // generate random comments
        generate_comments(users, username, one_post);

        load_posts.push(one_post);
    });
    return load_posts;
}

function add_follow(users, new_user) {
    for (let i = 0; i < 3; i++) {
        new_user.followed.push(JSON.stringify(users[i]));
    }
}

function add_post(user, posts) {
    let user_posts = [];
    let idx = 0;
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].author === user.accountname) {
            posts[i]["id"] = idx;
            user_posts.push(posts[i]);
            idx += 1;
        }
    }
    user.user_posts = user_posts;
}

function add_comment(commentor, content, time, post, users) {
    let commentor_info_idx = load_current_info(users, commentor);
    let commentor_info = commentor_info_idx[0];
    let comments = post.comments;
    let idx = comments.length;
    let new_comment = {
        id: idx,
        author: commentor,
        author_avatar: commentor_info.picture,
        body: content,
        timestamp: time
    }
    comments.unshift(new_comment);
    comments.sort(compare_feed);
    post.comments = comments;
}

function generate_comments(users, username, post) {
    let commentors = [];
    let last_idx = -1;
    users.forEach(user => user.accountname !== username ? commentors.push(user.accountname) : commentors);
    for (let i = 0; i < 3; i++) {
        let idx = parseInt(Math.floor(Math.random() * commentors.length));
        while (idx === last_idx) {
            idx = parseInt(Math.floor(Math.random() * commentors.length));
        }
        last_idx = idx;
        let commentor = commentors[idx];
        let seed = random_timestamp(new Date("12-24-2000 00:00"), new Date());
        let content = "This is a comment";
        add_comment(commentor, content, seed, post, users);
    }
}

function login(users, accountname, pwd) {
    if (accountname === "" || pwd === "") {
        return false;
    }
    let register = false;
    for (var i = 0; i < 10; i++) {
        if (users[i].accountname === accountname && users[i].pwd === pwd) {
            register = true;
            return register;
        }
    }
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

function load_current_info(users, username) {
    let current_info = {};
    let idx = -1;
    for (var i = 0; i < users.length; i++) {
        if (users[i].accountname === username) {
            current_info.accountname = users[i].accountname;
            current_info.email = users[i].email;
            current_info.phone = users[i].phone;
            current_info.zipcode = users[i].zipcode;
            current_info.pwd = users[i].pwd;
            current_info.status = users[i].status;
            current_info.picture = users[i].picture;
            current_info.followed = users[i].followed;
            current_info.user_posts = users[i].user_posts;
            idx = i;
            break;
        }
    }
    return [current_info, idx];
}

function find_follow_exist(followers, accountname) {
    let exist = false;
    followers.forEach(function (follower) {
        let follow = JSON.parse(follower);
        if (follow.accountname === accountname) {
            exist = true;
            return exist;
        }
    })
    return exist;
}

function find_user_post(user, posts) {
    let followed_users = user.followed;
    let followed_names = [];
    if (typeof (followed_users) !== "undefined") {
        followed_users.forEach(followed => {
            followed_names.push(JSON.parse(followed).accountname);
        });
    }
    let accountname = user.accountname;
    let user_posts = [];
    let idx = 0;
    posts.forEach(function (post) {
        if (followed_names.includes(post.author) || post.author === accountname) {
            post["id"] = idx;
            user_posts.push(post);
            idx += 1;
        }
    });
    user_posts.sort(compare_feed);
    return user_posts;
}

function updateposts(posts, update_follow, method) {
    let update_follow_user_posts = update_follow.user_posts;
    if (method === "add") {
        let idx = posts.length;
        for (let i = 0; i < update_follow_user_posts.length; i++) {
            update_follow_user_posts[i].id = idx;
            posts.push(update_follow_user_posts[i]);
            idx += 1;
        }
    }
    else {
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].author === update_follow.accountname) {
                posts.splice(i, 1);
                i -= 1;
            }
        }
        for (let i = 0; i < posts.length; i++) {
            posts[i].id = i;
        }
    }
    posts.sort(compare_feed);
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