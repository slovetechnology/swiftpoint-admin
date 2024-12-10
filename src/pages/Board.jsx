import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {FaAward} from 'react-icons/fa6'
import {SlClock} from 'react-icons/sl'
import img from "../assets/swift_logo.png"
import { WebError } from '../utils/utilities'
import moment from 'moment'
import { Authgeturl, Webapis } from '../utils/webapis'


function Board() {
    const {profile} = useSelector(state => state.data)
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [BoardDetails, setBoardDetails] = useState([])

    useEffect(() => {
      (async () => {
        setLoading(true)
        try {
          const response = await Authgeturl(Webapis.board)
          const result = response.data
          setBoardDetails([
            {
              title: 'Total Users',
              Icon: FaAward,
              content: result.users?.toLocaleString(),
            },
            {
              title: 'Total Active Users',
              Icon: FaAward,
              content: result.usersActive?.toLocaleString(),
            },
            {
              title: 'Total Inactive Users',
              Icon: FaAward,
              content: result.usersInactive?.toLocaleString(),
            },
            {
              title: 'Total SP Balance',
              Icon: FaAward,
              content: result.bal.total?.toLocaleString(),
            },
            {
              title: 'Total Feedbacks',
              Icon: FaAward,
              content: result.feedback?.count?.toLocaleString(),
            },
            {
              title: 'Total Banners',
              Icon: FaAward,
              content: result.banners?.count?.toLocaleString(),
            },
            {
              title: 'Total Streaks',
              Icon: FaAward,
              content: result.streaks?.count?.toLocaleString(),
            },
            {
              title: 'Total Out-flow SP',
              Icon: FaAward,
              content: result.deposits.inflows.total?.toLocaleString(),
            },
            {
              title: 'Total In-flow SP',
              Icon: FaAward,
              content: result.withdrawals.outflows.total?.toLocaleString(),
            },
          ])
          return setData(response.data)
        } catch (error) {
          WebError(error)
        }finally {
          setLoading(false)
        }
      })()
    }, [])

    if(loading) return (
      <div className="flex justify-center items-center h-screen">
        <img src={img} alt="Swift Logo" className="w-20 h-20"/>
      </div>
    )
  return (
    <div className='p-5'>
        <h1 className="font-bold text-2xl capitalize"> <span className="text-slate-500">Welcome,</span> {profile.firstname} {profile.lastname}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-5">
          {BoardDetails.map((item, index) => (
            <div className="bg-white px-3 py-5 rounded-lg text-sm" key={index}>
              <div className="grid grid-cols-5">
                <div className="col-span-2">
                  <div className="text-3xl bg-slate-100 p-3 rounded-lg border w-fit text-zinc-400"> <item.Icon /> </div>
                </div>
                <div className="col-span-3 text-right">
                  <div className="">{item.title}</div>
                  <div className="font-bold text-xl">{item.content?.toLocaleString()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
          <div className="">
            <div className="flex items-center justify-center">
              {data?.allUsers?.map((item, index) => (
                <div key={index} className={`${index > 0 ? '-ml-5' : ''}`} style={{ zIndex: 4-index }}>
                  <img src={item.image ?? img} alt="" className="size-12 rounded-full object-cover border-2 border-white shadow-xl bg-white" />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {data?.allUsers?.map((item, index) => (
                <div className="flex flex-col items-center text-center bg-white mb-1 rounded-lg p-3 text-sm" key={index}>
                  <div className=""> <img src={item?.image ?? img} alt="" className="size-16 rounded-full object-contain border-2" /> </div>
                  <div className="">
                    <div className="font-bold">{item.firstname} {item.lastname}</div>
                    <div className="text-xs flex items-center justify-center gap-1"> <SlClock /> {moment(item.createdAt).calendar()}</div>
                    <div className="">{item.emailVerified ? 'Verified' : 'Pending'}</div>
                    <div className="text-primary font-bold">{item.balance?.toLocaleString()}SP</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="">
            <div className="font-bold text-2xl mb-3">Latest FeedBacks</div>
            <div className="bg-white rounded-lg">
              {data?.feedbacks?.rows?.map((item, index) => (
                <div key={index} className='flex gap-2 p-2.5 text-sm border-b'>
                  <div> <img src={item?.feeduser?.image ?? img} alt="" className="size-10 rounded-full object-contain" /> </div>
                  <div className="">
                    <div className="font-bold">{item.feeduser.firstname} {item.feeduser.lastname} </div>
                    <div className="text-xs flex items-center gap-1"> <SlClock /> {moment(item.createdAt).format("DD-MM-YYYY hh:ss a")}</div>
                    <div className="font-bold">{item.title}</div>
                    <div className="text-slate-500">{item.content} </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
  )
}

export default Board