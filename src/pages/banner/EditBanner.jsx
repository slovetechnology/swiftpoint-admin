
import React, { useEffect, useState } from 'react'
import { Authgeturl, Webapis } from '../../utils/webapis'
import { WebError } from '../../utils/utilities'
import { useParams } from 'react-router-dom'
import BannerForm from './BannerForm'

function EditBanner() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})
    const {id} = useParams()
  
    useEffect(() => {
      (async () => {
        try {
          const response = await Authgeturl(`${Webapis.single_banner}/${id}`)
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
    <BannerForm bannerData={data} />
  )
}

export default EditBanner