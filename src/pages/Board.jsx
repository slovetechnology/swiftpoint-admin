import React from 'react'
import { useSelector } from 'react-redux'
import {FaAward} from 'react-icons/fa6'
import {SlClock} from 'react-icons/sl'
import img from "../assets/swift_logo.png"

const BoardDetails = [
  {
    title: 'Total Users',
    Icon: FaAward,
    content: 5000,
  },
  {
    title: 'Total Active Users',
    Icon: FaAward,
    content: 5000,
  },
  {
    title: 'Total Inactive Users',
    Icon: FaAward,
    content: 5000,
  },
  {
    title: 'Total SP Balance',
    Icon: FaAward,
    content: 5000,
  },
  {
    title: 'Total Feedbacks',
    Icon: FaAward,
    content: 5000,
  },
  {
    title: 'Total Banners',
    Icon: FaAward,
    content: 5000,
  },
  {
    title: 'Total Streaks',
    Icon: FaAward,
    content: 5000,
  },
  {
    title: 'Total Out-flow SP',
    Icon: FaAward,
    content: 5000,
  },
  {
    title: 'Total In-flow SP',
    Icon: FaAward,
    content: 5000,
  },
]

function Board() {
    const {profile} = useSelector(state => state.data)
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
              {new Array(4).fill(0).map((item, index) => (
                <div key={index} className={`${index > 0 ? '-ml-5' : ''}`} style={{ zIndex: 4-index }}>
                  <img src={img} alt="" className="size-12 rounded-full object-cover border-2 border-white shadow-xl bg-white" />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {new Array(10).fill(0).map((item, index) => (
                <div className="flex flex-col items-center text-center bg-white mb-1 rounded-lg p-3 text-sm" key={index}>
                  <div className=""> <img src={img} alt="" className="size-16 rounded-full object-contain border-2" /> </div>
                  <div className="">
                    <div className="font-bold">User fullname lastname</div>
                    <div className="text-xs flex items-center justify-center gap-1"> <SlClock /> Today at 2:30pm</div>
                    <div className="">verified</div>
                    <div className="text-primary font-bold">300,000SP</div>
                  </div>
                </div>
              ))}
              {/* {new Array(10).fill(0).map((item, index) => (
                <div className="flex gap-2 bg-white mb-1 rounded-lg p-3 text-sm" key={index}>
                  <div className=""> <img src={img} alt="" className="size-12 rounded-full object-contain border-2" /> </div>
                  <div className="">
                    <div className="font-bold">User fullname lastname</div>
                    <div className="text-xs flex items-center gap-1"> <SlClock /> Today at 2:30pm</div>
                    <div className="">verified</div>
                  </div>
                </div>
              ))} */}
            </div>
          </div>
          <div className="">
            <div className="font-bold text-2xl mb-3">Latest FeedBacks</div>
            <div className="bg-white rounded-lg">
              {new Array(7).fill(0).map((item, index) => (
                <div key={index} className='flex gap-2 p-2.5 text-sm border-b'>
                  <div> <img src={img} alt="" className="size-10 rounded-full object-contain" /> </div>
                  <div className="">
                    <div className="font-bold">Keneth okonkwo </div>
                    <div className="text-xs flex items-center gap-1"> <SlClock /> Today at 2:30pm</div>
                    <div className="font-bold">feedback Lorem ipsum dolor sit amet. </div>
                    <div className="text-slate-500">feedback  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, in? </div>
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