import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { WebError } from '../utils/utilities'
import { Authgeturl, Webapis } from '../utils/webapis'
import moment from 'moment'

const TableHeaders = [
  "Username",
  "Full Name",
  "Suspend",
  "Verified",
  "Status",
  "Role",
  "Balance",
  "Date Created",
]

function Users() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({})

  useEffect(() => {
    (async () => {
      try {
        const response = await Authgeturl(Webapis.all_users)
        if (response.status !== 200) return false
        setData(response.data)
      } catch (error) {
        WebError(error)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) return (
    <div className='w-[97%] mx-auto mt-5'>
      <div className="w-fit ml-auto mb-5">
        <Link to="/streaks/new" className='bg-slate-800 py-3 px-4 rounded-lg text-white'>Create Streak</Link>
      </div>
      <div className="overflow-x-auto">
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
  <div className='w-[97%] mx-auto mt-5'>
    <div className="mb-5">
      <div className="font-bold text-xl">All Users (100)</div>
    </div>
    <div className="overflow-x-auto">
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
              <tr key={index} className='border-b text-sm'>
                <td className="p-3 truncate">{item.username ?? '---'}</td>
                <td className="p-3 truncate">{item.firstname} {item.lastname}</td>
                <td className="p-3 truncate">{item.suspend}</td>
                <td className="p-3 truncate">{item.emailVerified}</td>
                <td className="p-3 truncate">{item.status}</td>
                <td className="p-3 truncate">{item.role}</td>
                <td className="p-3 truncate">{item.balance}</td>
                <td className="p-3 truncate">{moment(item.createdAt).format('DD-MM-YYYY')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)
}

export default Users
