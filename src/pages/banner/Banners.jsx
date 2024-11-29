
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { WebError } from '../../utils/utilities'
import { Authgeturl, Webapis } from '../../utils/webapis'
import moment from 'moment'

const TableHeaders = [
  "Title",
  "Status",
  "Date Created",
  "",
]

function Banners() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({})

  useEffect(() => {
    (async () => {
      try {
        const response = await Authgeturl(Webapis.all_banners)
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
        <Link to="/banners/new" className='bg-slate-800 py-3 px-4 rounded-lg text-white'>Create Banner</Link>
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
    <div className="w-fit ml-auto mb-5">
      <Link to="/banners/new" className='bg-slate-800 py-3 px-4 rounded-lg text-white'>Create Banner</Link>
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
                <td className="p-3 truncate">{item.title}</td>
                <td className="p-3 truncate">{item.status}</td>
                <td className="p-3 truncate">{moment(item.createdAt).format('DD-MM-YYYY')}</td>
                <td className="p-3 truncate cursor-pointer" onClick={() => navigate(`/banners/edit/${item.id}`)}>Edit</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)
}

export default Banners

