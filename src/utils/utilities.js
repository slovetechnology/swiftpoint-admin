import Swal from "sweetalert2";


export const tokenName = 'cred'


export function Notifies(title, text, icon) {
    return Swal.fire({
        title,
        text,
        icon,
        showConfirmButton: false
    })
}

export function WebError(error) {
    return Notifies('Request Failed', `${error.message}`, 'error')
}

export const AdminSidenavs = [
    {
        title: 'Dashboard',
        link: '/home',
    },
    {
        title: 'Streaks',
        link: '/streaks',
    },
    {
        title: 'Banners',
        link: '/banners',
    },
    {
        title: 'Settings',
        link: '/settings',
    },
    {
        title: 'Users',
        link: '/users',
    },
    {
        title: 'Achievements',
        link: '/achievements',
    },
]