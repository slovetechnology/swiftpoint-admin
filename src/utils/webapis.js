import Cookies from 'js-cookie'
import axios from 'axios'
import { tokenName } from './utilities'

let BaseURL;
if (window.location.origin.includes('localhost')) {
    BaseURL = 'http://localhost:8002'
}
if (window.location.origin.includes('swiftpoint-admin')) {
    BaseURL = 'https://sandbox.swiftpoint.com.ng'
}

export const Webapis = {
    login: 'user/login',
    register: 'user/register',
    confirm_verification_code: 'user/confirm-verification-code',
    profile: 'user/profile',
    find_account: 'user/find-account',
    reset_password: 'user/reset-password',
    update_profile: 'user/update-profile',
    send_feedback: 'user/send-feedback',
    add_fav: 'user/add-fav',
    my_favs: 'user/all-favs',
    remove_fav: 'user/remove-fav',
    update_transfer_pin: 'user/update-transfer-pin',
    mining: 'user/ads-mining',
    new_mining: 'user/new-mining',
    update_mining: 'user/update-mining',
    my_mining: 'user/my-mining',
    peer_transfer: 'user/peer-transfer',
    notifications: 'user/notifications',


    board: 'admin/board',
    manage_settings: 'admin/manage-setting',
    all_settings: 'admin/settings',
    manage_streak: 'admin/manage-streak',
    all_streaks: 'admin/streaks',
    single_streak: 'admin/streak',
    all_users: 'admin/users',
    all_minings: 'admin/minings',
    manage_banner: 'admin/manage-banner',
    all_banners: 'admin/all-banners', 
    single_banner: 'admin/single-banner',
    delete_banner: 'admin/delete-banner',
    user_management: 'admin/user-management',
    all_users_settings: 'admin/all-users-settings',
    update_user_socials: 'admin/update-user-socials',
}


export async function Clientgeturl(endpoint) {
    const hd = (`${BaseURL}/${endpoint}`).trim()
    const response = await axios.get(hd)

    return response.data
}

export async function Clientposturl(endpoint, data) {
    const hd = (`${BaseURL}/${endpoint}`).trim()
    const response = await axios.post(hd, data)

    return response.data
}


export async function Authgeturl(endpoint) {
    const hd = (`${BaseURL}/${endpoint}`).trim()
    const token = Cookies.get(tokenName)
    const response = await axios.get(hd, {
        headers: {
            'Authorization': `_BearerSP ${token}`
        }
    })

    return response.data
}

export async function Authposturl(endpoint, data) {
    const hd = (`${BaseURL}/${endpoint}`).trim()
    const token = Cookies.get(tokenName)
    const response = await axios.post(hd, data, {
        headers: {
            'Authorization': `_BearerSP ${token}`
        }
    })

    return response.data
}

export async function Authputurl(endpoint, data) {
    const hd = (`${BaseURL}/${endpoint}`).trim()
    const token = Cookies.get(tokenName)
    const response = await axios.put(hd, data, {
        headers: {
            'Authorization': `_BearerSP ${token}`
        }
    })

    return response.data
}

export async function Authdeleteurl(endpoint) {
    const hd = (`${BaseURL}/${endpoint}`).trim()
    const token = Cookies.get(tokenName)
    const response = await axios.delete(hd, {
        headers: {
            'Authorization': `_BearerSP ${token}`
        }
    })

    return response.data
}