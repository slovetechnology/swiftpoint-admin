import React, { useEffect, useState } from 'react'
import StreakForm from './StreakForm'
import { Authgeturl, Webapis } from '../../utils/webapis'
import { WebError } from '../../utils/utilities'
import { useParams } from 'react-router-dom'

function EditStreak() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})
    const {id} = useParams()
  
    useEffect(() => {
      (async () => {
        try {
          const response = await Authgeturl(`${Webapis.single_streak}/${id}`)
          if (response.status !== 200) return false
          setData(response.data)
        } catch (error) {
          WebError(error)
        } finally {
          setLoading(false)
        }
      })()
    }, [])
    if(loading) return (
        <div className="text-center mt-10">Loading Data, do hold on....</div>
    )
  return (
    <StreakForm streakData={data} />
  )
}

export default EditStreak