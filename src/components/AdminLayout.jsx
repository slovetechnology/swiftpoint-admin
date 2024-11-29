
import React, { useEffect, useState } from 'react'
import { SlArrowRight, SlBell, SlPower } from 'react-icons/sl'
import { FaAlignLeft } from 'react-icons/fa6'
import { AdminSidenavs, Notifies, tokenName, WebError } from '../utils/utilities'
import { Authgeturl, Webapis } from '../utils/webapis'
import { useDispatch } from 'react-redux'
import { dispatchWebProfile } from '../store/webreducer'
import { Link, useNavigate } from 'react-router-dom'
import { Dialog, DialogTitle, Drawer, DialogActions, DialogContent, DialogContentText, Button } from '@mui/material'
import img from '../assets/swift_logo.png'
import Cookies from 'js-cookie'

function AdminLayout({ children }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [login, setLogin] = useState(false)
    const [open, setOpen] = useState(false);
    const [logout, setLogout] = React.useState(false);

    const handleClickOpen = () => {
        setLogout(true);
    };

    const handleClose = () => {
        setLogout(false);
    };

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    useEffect(() => {
        (async () => {
            try {
                const response = await Authgeturl(Webapis.profile)
                if (response.status !== 200) return navigate('/')
                dispatch(dispatchWebProfile(response.data))
                return setLogin(true)
            } catch (error) {
                WebError(error)
            }
        })()
    }, [])

    function HandleLogoutAction() {
        setLogout(false)
        Cookies.remove(tokenName)
        navigate('/')
        dispatch(dispatchWebProfile({}))
    }

    function SideBarNavs() {
        return (
            <div className="flex flex-col bg-slate-800 h-screen">
                <img src={img} alt="SwiftPoint" className="size-20 object-contain mx-auto" />
                {AdminSidenavs.map((item, index) => (
                    <Link key={index} to={item.link} className='border-b last:border-none group border-slate-500 p-2.5 hover:text-white text-slate-400'>
                        <div className="flex items-center justify-between">
                            <div className="group-hover:translate-x-10 transition-all">{item.title}</div>
                            <div className="text-xs group-hover:-translate-x-10 transition-all"> <SlArrowRight /> </div>
                        </div>
                    </Link>
                ))}
            </div>
        )
    }

    if (login) return (
        <>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                <div className='w-[15rem]'>
                    <SideBarNavs />
                </div>
            </Drawer>

            <Dialog
                open={logout}
                onClose={handleClose}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Logout Account"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Kindly confirm your request to logout from your account
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={HandleLogoutAction} autoFocus>
                        Yes, Log me out
                    </Button>
                </DialogActions>
            </Dialog>
            <div className='bg-blue-50 h-screen overflow-hidden'>
                <div className="flex items-center">
                    <div className="w-0 md:w-[20%] mr-auto h-screen">
                        <SideBarNavs />
                    </div>
                    <div className="w-full md:w-[80%] ml-auto h-screen overflow-hidden bg-blue-50">
                        <div className="bg-white border-b px-5 py-3">
                            <div className="flex items-center justify-between">
                                <div className="">
                                    <button className='md:hidden' onClick={toggleDrawer(true)}> <FaAlignLeft /> </button>
                                </div>
                                <div className="flex items-center gap-5">
                                    <Link to="/notifications" className='bg-primary/10 text-primary border-primary/40 rounded-full p-2 border'> <SlBell className='text-lg' /> </Link>
                                    <button onClick={handleClickOpen} className='bg-primary/10 text-primary border-primary/40 rounded-full p-2 border'> <SlPower className='text-lg' /> </button>
                                </div>
                            </div>
                        </div>
                        <div className="h-[92.2dvh] overflow-y-auto scrolls scrollsdown pb-32">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminLayout