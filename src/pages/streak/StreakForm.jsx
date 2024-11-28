import React from 'react'
import Forminput from '../../components/Forminput'
import { useForm } from 'react-hook-form'
import { MenuItem } from '@mui/material'
import Formbutton from '../../components/Formbutton'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { Notifies, WebError } from '../../utils/utilities'
import { Authposturl, Webapis } from '../../utils/webapis'

const DurationTypes = [
    "minutes", "hours", "days"
]

const StatusOptions = [
    "active", "inactive"
]

function StreakForm({streakData}) {
    const navigate = useNavigate()
    const { register, watch, formState: { isSubmitting, errors }, handleSubmit } = useForm({
        defaultValues: {
            name: streakData?.name ?? '',
            duration: streakData?.duration ?? '',
            durationType: streakData?.durationType ?? '',
            bonus: streakData?.bonus ?? '',
            status: streakData?.status ?? '',
        }
    })
    const watchForm = watch(["durationType", "status"])
    async function HandleSubmissionAction(values) {
        const sendData = {
            ...values,
            tag: streakData?.id ? 'update' : 'create',
            id: streakData?.id ?? null
        }
        try {
            const response = await Authposturl(Webapis.manage_streak, sendData)
            if (![201, 200].includes(response.status)) return Notifies('Request failed', response.message, 'error')
            Notifies('Request Success', response.message, 'success')
            return navigate('/streaks')
        } catch (error) {
            WebError(error)
        }
    }
    return (
        <form onSubmit={handleSubmit(HandleSubmissionAction)}>
            <div className="bg-white p-5 w-[97%] mt-5 mx-auto">
                <div className="flex items-center gap-3">
                    <Link to="/streaks"> <FaArrowLeftLong /> </Link>
                    <div className="font-bold text-2xl">Streak Management</div>
                </div>
                <Forminput error={errors.name} errorMessage={errors.name?.message} {...register('name', { required: 'Name is required' })} content="Streak Name" />
                <Forminput error={errors.bonus} errorMessage={errors.bonus?.message} {...register('bonus', { required: 'Bonus is required' })} content="Streak Bonus" type="number" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <Forminput error={errors.duration} errorMessage={errors.duration?.message} {...register('duration', { required: 'Duration is required' })} content="Duration" type="number" />
                    <Forminput
                        onChange={e => {
                            const val = e.target.value
                            setValue("durationType", val)
                        }}
                        value={watchForm[0] || ''}
                        {...register('durationType', { required: 'Streak duration type is required' })}
                        error={errors.durationType}
                        errorMessage={errors.durationType?.message}
                        content="Streak Duration Type"
                        formtype="select">
                        {DurationTypes.map((type, index) => (
                            <MenuItem key={index} value={type}>{type}</MenuItem>
                        ))}
                    </Forminput>
                </div>
                <Forminput
                    onChange={e => {
                        const val = e.target.value
                        setValue("status", val)
                    }}
                    value={watchForm[1] || ''}
                    {...register('status', { required: 'Status is required' })}
                    error={errors.status}
                    errorMessage={errors.status?.message}
                    content="Status"
                    formtype="select">
                    {StatusOptions.map((type, index) => (
                        <MenuItem key={index} value={type}>{type}</MenuItem>
                    ))}
                </Forminput>
            </div>
            <div className="grid grid-cols-2 p-5 mt-5">
                <div></div>
                <div className=''> <Formbutton title="Submit" loading={isSubmitting} /> </div>
            </div>
        </form>
    )
}

export default StreakForm

