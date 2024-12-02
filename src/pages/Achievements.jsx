
import React, { useCallback, useEffect, useState } from 'react'
import { Notifies, WebError } from '../utils/utilities'
import { Authgeturl, Authputurl, Webapis } from '../utils/webapis'
import moment from 'moment'
import img from "../assets/default.png"
import { Dialog, DialogContent, DialogTitle, MenuItem } from '@mui/material'
import Forminput from '../components/Forminput'
import Formbutton from '../components/Formbutton'
import { useForm } from 'react-hook-form'

const TableHeaders = [
    "Full Name",
    "Username bonus",
    "Profile account bonus",
    "Profile picture bonus",
    "Referral bonus",
    "Referral count",
    "Facebook Status",
    "Twitter Status",
    "Youtube Status",
    "Telegram Status",
]

const AchievementStages = [
    "new",
    "clicked",
    "pending",
    "approved"
]
const SocialTags = [
    "facebook", "twitter", "youtube", "telegram"
]

function Achievements() {
    const [screen, setScreen] = useState(1)
    const [loading, setLoading] = useState(true)
    const [loads, setLoads] = useState(false)
    const [data, setData] = useState({})
    const [view, setView] = useState({ status: false, data: {} })
    const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            tagid: '', tag: '', status: ''
        }
    })
    const watchForm = watch(["tag"])

    const FetchUsers = useCallback(async () => {
        try {
            const response = await Authgeturl(Webapis.all_users_settings)
            if (response.status !== 200) return false
            setData(response.data)
        } catch (error) {
            WebError(error)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        FetchUsers()
    }, [FetchUsers])

    function HandleView() {
        setView({ status: false, data: {} })
        setScreen(1)
    }

    function OpenView(item) {
        setView({ status: true, data: item })
    }

    function NextPhase() {
        setScreen(3)
    }

    async function SubmitAction() {
        const sendData = {
            tag: watchForm[0],
            status: AchievementStages[3],
            tagid: view.data?.id
        }
        try {
            setLoads(true)
            const response = await Authputurl(Webapis.update_user_socials, sendData)
            if (response.status !== 200) return Notifies('Request failed', response.message, 'error')
            Notifies('Request Successful', response.message, 'success')
            FetchUsers()
        } catch (error) {
            WebError(error)
        } finally {
            setLoads(false)
            HandleView()
            setValue("tag", "")
        }
    }

    if (loading) return (
        <div className='w-[97%] mx-auto mt-5'>
            <div className="overflow-x-auto scrollsdown">
                <div className="w-full">
                    <table className="w-full table">
                        <thead>
                            <tr className='bg-slate-800 text-white'>
                                {TableHeaders.map((item, index) => (
                                    <td key={index} className='text-sm truncate p-3'>{item}</td>
                                ))}
                            </tr>
                        </thead>
                    </table>
                    <div className="text-center">Loading Data...</div>
                </div>
            </div>
        </div>
    )
    return (
        <>
            {view.status && <Dialog
                open={view.status}
                onClose={HandleView}
            >
                <DialogTitle id="alert-dialog-title">
                    {view.data?.firstname} Details
                </DialogTitle>
                {screen === 1 && <DialogContent className='w-[30rem]' id="alert-dialog-description">
                    <div className="w-fit mx-auto">
                        <img src={view.data?.image ?? img} alt="" className="size-20 rounded-full object-cover" />
                    </div>
                    <div className="grid grid-cols-2 p-3 border-b text-xs">
                        <div className="">Full Name</div>
                        <div className="text-right">{view.data?.firstname} {view.data?.lastname}</div>
                    </div>
                    <div className="grid grid-cols-2 p-3 border-b text-xs">
                        <div className="">UserName bonus</div>
                        <div className="text-right">{view.data?.account[0]?.usernameBonus}</div>
                    </div>
                    <div className="grid grid-cols-2 p-3 border-b text-xs">
                        <div className="">Profile account bonus</div>
                        <div className="text-right">{view.data?.account[0]?.profileAccountBonus}</div>
                    </div>
                    <div className="grid grid-cols-2 p-3 border-b text-xs">
                        <div className="">Profile picture bonus</div>
                        <div className="text-right">{view.data?.account[0]?.profilePictureBonus}</div>
                    </div>
                    <div className="grid grid-cols-2 p-3 border-b text-xs">
                        <div className="">Referral bonus</div>
                        <div className="text-right">{view.data?.account[0]?.referralBonus}</div>
                    </div>
                    <div className="grid grid-cols-2 p-3 border-b text-xs">
                        <div className="">Members Referred</div>
                        <div className="text-right">{view.data?.account[0]?.referralCount} in total</div>
                    </div>
                    <div className="p-3 border-b text-xs">
                        <div className="">Facebook</div>
                        <div className="grid grid-cols-2 py-1 px-3">
                            <div className="">Bonus</div>
                            <div className="text-right">{view.data?.account[0]?.facebookBonus ?? '---'}</div>
                        </div>
                        <div className="grid grid-cols-2 py-1 px-3">
                            <div className="">Status</div>
                            <div className="text-right">{view.data?.account[0]?.facebookStatus ?? '---'}</div>
                        </div>
                        <div className="grid grid-cols-2 py-1 px-3">
                            <div className="">Handle</div>
                            <div className="text-right">{view.data?.account[0]?.facebookName ?? '---'}</div>
                        </div>
                    </div>
                    <div className="p-3 border-b text-xs">
                        <div className="">Twitter</div>
                        <div className="grid grid-cols-2 py-1 px-3">
                            <div className="">Bonus</div>
                            <div className="text-right">{view.data?.account[0]?.twitterBonus ?? '---'}</div>
                        </div>
                        <div className="grid grid-cols-2 py-1 px-3">
                            <div className="">Status</div>
                            <div className="text-right">{view.data?.account[0]?.twitterStatus ?? '---'}</div>
                        </div>
                        <div className="grid grid-cols-2 py-1 px-3">
                            <div className="">Handle</div>
                            <div className="text-right">{view.data?.account[0]?.twitterName ?? '---'}</div>
                        </div>
                    </div>
                    <div className="p-3 border-b text-xs">
                        <div className="">Youtube</div>
                        <div className="grid grid-cols-2 py-1 px-3">
                            <div className="">Bonus</div>
                            <div className="text-right">{view.data?.account[0]?.youtubeBonus ?? '---'}</div>
                        </div>
                        <div className="grid grid-cols-2 py-1 px-3">
                            <div className="">Status</div>
                            <div className="text-right">{view.data?.account[0]?.youtubeStatus ?? '---'}</div>
                        </div>
                        <div className="grid grid-cols-2 py-1 px-3">
                            <div className="">Handle</div>
                            <div className="text-right">{view.data?.account[0]?.youtubeName ?? '---'}</div>
                        </div>
                    </div>
                    <div className="p-3 border-b text-xs">
                        <div className="">Telegram</div>
                        <div className="grid grid-cols-2 py-1 px-3">
                            <div className="">Bonus</div>
                            <div className="text-right">{view.data?.account[0]?.telegramBonus ?? '---'}</div>
                        </div>
                        <div className="grid grid-cols-2 py-1 px-3">
                            <div className="">Status</div>
                            <div className="text-right">{view.data?.account[0]?.telegramStatus ?? '---'}</div>
                        </div>
                        <div className="grid grid-cols-2 py-1 px-3">
                            <div className="">Handle</div>
                            <div className="text-right">{view.data?.account[0]?.telegramName ?? '---'}</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 p-3 text-sm">
                        <div className=""></div>
                        <div className="text-right"> <button onClick={() => setScreen(2)} className="bg-primary py-2 px-4 rounded-md text-white">Edit Data</button> </div>
                    </div>
                </DialogContent>}
                {screen === 2 && <DialogContent className='w-[30rem]'>
                    <div className="">
                        <form onSubmit={handleSubmit(NextPhase)}>
                            <Forminput {...register("tag", { required: 'Social referrence cannot be empty' })} error={errors.tag} errorMessage={errors.tag?.message} value={watchForm[0] ?? ''} content="Social Referrence" formtype="select">
                                {SocialTags.map((item, index) => (
                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                ))}
                            </Forminput>
                            <div className="grid grid-cols-2 gap-16">
                                <div className="">
                                    <Formbutton className="bg-slate-400 text-xs" title="Back" onClick={() => setScreen(1)} loading={loads} />
                                </div>
                                <div className=""> <Formbutton className={'text-xs'} title="Continue" loading={isSubmitting} /> </div>
                            </div>
                        </form>
                    </div>
                </DialogContent>}
                {screen === 3 && <DialogContent className='w-[30rem]'>
                    <div className="">
                        <div>
                            <div className="text-center my-5">Are you sure you want to approve {view.data?.firstname} {view.data?.lastname}'s {watchForm[0]} achievement</div>
                            <div className="grid grid-cols-2 gap-16">
                                <div className="">
                                    <Formbutton className="bg-slate-400 text-xs" title="Back" onClick={() => setScreen(2)} loading={loads} />
                                </div>
                                <div className=""> <Formbutton className="text-xs" title="Approve Submission" onClick={SubmitAction} loading={loads} /> </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>}
            </Dialog>}

            <div className='w-[97%] mx-auto mt-5'>
                <div className="mb-5">
                    <div className="font-bold text-xl">All Users ({data.length})</div>
                </div>
                <div className="overflow-x-auto scrollsdown">
                    <div className="w-full">
                        <table className="w-full table">
                            <thead>
                                <tr className='bg-slate-800 text-white'>
                                    {TableHeaders.map((item, index) => (
                                        <td key={index} className='text-sm truncate p-3'>{item}</td>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {data.map((item, index) => (
                                    <tr key={index} className='border-b text-xs cursor-pointer' onClick={() => OpenView(item)}>
                                        <td className="p-3 truncate">{item.firstname} {item.lastname}</td>
                                        <td className="p-3 truncate">{item.account[0]?.usernameBonus ?? 0}</td>
                                        <td className="p-3 truncate">{item.account[0]?.profileAccountBonus ?? 0}</td>
                                        <td className="p-3 truncate">{item.account[0]?.profilePictureBonus ?? 0}</td>
                                        <td className="p-3 truncate">{item.account[0]?.referralBonus ?? 0}</td>
                                        <td className="p-3 truncate">{item.account[0]?.referralCount ?? 0}</td>
                                        <td className="p-3 truncate">{item.account[0]?.facebookStatus}</td>
                                        <td className="p-3 truncate">{item.account[0]?.twitterStatus}</td>
                                        <td className="p-3 truncate">{item.account[0]?.youtubeStatus}</td>
                                        <td className="p-3 truncate">{item.account[0]?.telegramStatus}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Achievements

