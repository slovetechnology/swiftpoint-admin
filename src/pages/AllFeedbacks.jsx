
import React, { useCallback, useEffect, useState } from 'react'
import { WebError } from '../utils/utilities'
import { Authgeturl, Webapis } from '../utils/webapis'
import moment from 'moment'
import img from "../assets/default.png"
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import { SlCamera } from 'react-icons/sl'

const TableHeaders = [
    "User",
    "Image",
    "Title",
    "Content",
    "Submission Date",
]

function AllFeedbacks() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})
    const [view, setView] = useState({ status: false, data: {} })

    const FetchUsers = useCallback(async () => {
        try {
            const response = await Authgeturl(Webapis.all_feedbacks)
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
    }

    function OpenView(item) {
        setView({ status: true, data: item })
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
                    {view.data?.feeduser?.firstname} Feedback
                </DialogTitle>
                <DialogContent className='w-[30rem]' id="alert-dialog-description">
                    <div className="w-fit mx-auto">
                        <img src={view.data?.feeduser?.image ?? img} alt="" className="size-20 rounded-full object-cover" />
                    </div>
                    <div className="grid grid-cols-2 p-3 border-b text-xs">
                        <div className="">Title</div>
                        <div className="text-right">{view.data?.title}</div>
                    </div>
                    <div className="grid grid-cols-2 p-3 border-b text-xs">
                        <div className="">Content</div>
                        <div className="text-right">{view.data?.content}</div>
                    </div>
                   {view.data?.image && <div className="grid grid-cols-2 p-3 border-b text-xs">
                        <div className="">Image</div>
                        <div className="text-right"> <img src={view.data?.image} alt="" className="w-full h-full" /> </div>
                    </div>}
                </DialogContent>
            </Dialog>}

            <div className='w-[97%] mx-auto mt-5'>
                <div className="mb-5">
                    <div className="font-bold text-xl">All Feedbacks ({data.length})</div>
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
                                {data?.map((item, index) => (
                                    <tr key={index} className='border-b text-xs cursor-pointer' onClick={() => OpenView(item)}>
                                        <td className="p-3 truncate">{item.feeduser?.firstname} {item.feeduser?.lastname}</td>
                                        <td className="p-3 truncate">{item?.image ? <div className='flex items-center text-xs gap-2'> <SlCamera /> has an image </div> : ''}</td>
                                        <td className="p-3 truncate">{item.title}</td>
                                        <td className="p-3 truncate">{item.content?.slice(0, 20)}...</td>
                                        <td className="p-3 truncate">{moment(item.createdAt).format('DD/MM/YYYY hh:ssA')}</td>
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

export default AllFeedbacks


