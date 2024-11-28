import React, { useEffect, useState } from 'react'
import SettingsForm from './SettingsForm'
import { WebError } from '../utils/utilities'
import { Authgeturl, Webapis } from '../utils/webapis'

function Settings() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({})
  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const response = await Authgeturl(Webapis.all_settings)
        if (response.status!== 200) return false
        setData(response.data)
      } catch (error) {
        WebError(error)
      }finally {
        setLoading(false)
      }
    })()
  }, [])

  if(loading) return (
    <div className="text-center mt-10">Loading Data, do hold on...</div>
  )
  return (
    <div>
      <SettingsForm settingsData={data} />
    </div>
  )
}

export default Settings