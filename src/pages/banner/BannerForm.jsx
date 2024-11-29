
import React, { useState } from 'react'
import Forminput from '../../components/Forminput'
import { useForm } from 'react-hook-form'
import { MenuItem } from '@mui/material'
import Formbutton from '../../components/Formbutton'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { Notifies, WebError } from '../../utils/utilities'
import { Authposturl, Webapis } from '../../utils/webapis'
import {SlCloudUpload} from 'react-icons/sl'

const StatusOptions = [
    "active", "inactive"
]

function BannerForm({ bannerData }) {
    const navigate = useNavigate()
    const { register, watch, formState: { isSubmitting, errors }, handleSubmit } = useForm({
        defaultValues: {
            title: bannerData?.title ?? '',
            link: bannerData?.link ?? '',
            status: bannerData?.status ?? '',
            content: bannerData?.content ?? '',
        }
    })
    const watchForm = watch(["status"])
    const [image, setImage] = useState({
        img: bannerData?.image ?? null,
        file: null
    })

    function HandleFileUpload(e) {
        const file = e.target.files[0]
        if(!file) return false
        setImage({
            img: URL.createObjectURL(file),
            file: file
        })
    }
    async function HandleSubmissionAction(values) {
        if(!bannerData?.id && !image.file) return Notifies('Request failed', 'Please select an image', 'error')
        const sendData = new FormData()
        sendData.append('image', image.file)
        sendData.append('title', values.title)
        sendData.append('link', values.link)
        sendData.append('status', values.status)
        sendData.append('content', values.content)
        sendData.append('tag', bannerData?.id ? 'update' : 'create')
        if(bannerData?.id) {sendData.append('id', bannerData?.id)}
        try {
            const response = await Authposturl(Webapis.manage_banner, sendData)
            if (![201, 200].includes(response.status)) return Notifies('Request failed', response.message, 'error')
            Notifies('Request Success', response.message, 'success')
            return navigate('/banners')
        } catch (error) {
            WebError(error)
        }
    }
    return (
        <form onSubmit={handleSubmit(HandleSubmissionAction)}>
            <div className="bg-white p-5 w-[97%] mt-5 mx-auto">
                <div className="flex items-center gap-3">
                    <Link to="/banners"> <FaArrowLeftLong /> </Link>
                    <div className="font-bold text-2xl">Banner Management</div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <Forminput error={errors.title} errorMessage={errors.title?.message} {...register('title', { required: 'Title is required' })} content="Banner title" />
                    <Forminput error={errors.link} errorMessage={errors.link?.message} {...register('link')} content="Banner Link (Optional)" />
                </div>
                <Forminput formtype="textarea" error={errors.content} errorMessage={errors.content?.message} {...register('content', { required: 'Banner content is required' })} content="Banner Content" />
                <Forminput
                    onChange={e => {
                        const val = e.target.value
                        setValue("status", val)
                    }}
                    value={watchForm[0] || ''}
                    {...register('status', { required: 'Status is required' })}
                    error={errors.status}
                    errorMessage={errors.status?.message}
                    content="Status"
                    formtype="select">
                    {StatusOptions.map((type, index) => (
                        <MenuItem key={index} value={type}>{type}</MenuItem>
                    ))}
                </Forminput>
                <div className="">
                    <label className='cursor-pointer'>
                        {image.img ? <img src={image.img} alt="" className="w-full h-[10rem] border-2 border-dashed border-zinc-400 rounded-lg object-cover" /> :
                            <div className="bg-slate-200 border-2 border-zinc-300 border-dashed h-[10rem] rounded-lg flex flex-col items-center justify-center">
                            <SlCloudUpload className='text-3xl' />
                            <div className="text-xs">Upload banner photo</div>
                        </div>}
                        <input type="file" hidden onChange={HandleFileUpload} />
                    </label>
                </div>
            </div>
            <div className="grid grid-cols-2 p-5 mt-5">
                <div></div>
                <div className=''> <Formbutton title="Submit" loading={isSubmitting} /> </div>
            </div>
        </form>
    )
}

export default BannerForm

