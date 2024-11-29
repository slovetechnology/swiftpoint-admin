
import React, { useEffect } from 'react'
import Forminput from '../components/Forminput'
import Formbutton from '../components/Formbutton'
import { useNavigate, useSearchParams } from 'react-router-dom'
import img from "../assets/swift_logo.png"
import { useForm } from 'react-hook-form'
import { Notifies, WebError } from '../utils/utilities'
import { Clientposturl, Webapis } from '../utils/webapis'

function ResetPassword() {
    const { register, formState: { errors, isSubmitting }, handleSubmit } = useForm({
        defaultValues: {
            password: '',
            confirmPassword: ''
        }
    })
    const navigate = useNavigate()
    const [searchParams,] = useSearchParams()
    const search = searchParams.get('email')

    useEffect(() => {
        if(!search) return navigate('/forgot-password')
    }, [])

    async function HandleSubmission(values) {
        try {
            const dataForm = {
                password: values.password,
                confirmPassword: values.confirmPassword,
                email: search,
            }
            const response = await Clientposturl(Webapis.reset_password, dataForm)
            if (response.status !== 200) return Notifies('Request failed', response.message, 'error')
            navigate(`/`)
        } catch (error) {
            WebError(error)
        }
    }
    return (
        <div className='bg-blue-50 h-screen overflow-y-auto pt-10'>
            <div className="bg-white w-11/12 max-w-xl px-4 py-10 rounded-xl mx-auto">
                <div className="w-fit mx-auto"><img src={img} alt="SwiftPoint" className="size-20 object-contain" /></div>
                <div className="font-bold text-xl text-center">Recover Account</div>
                <form onSubmit={handleSubmit(HandleSubmission)}>
                    <Forminput
                        {...register('password', { required: 'Password is required' })}
                        content="Password"
                        error={errors.password}
                        errorMessage={errors.password?.message}
                    />
                    <Forminput
                        {...register('confirmPassword', { required: 'Confirm Password is required' })}
                        content="Confirm Password"
                        error={errors.confirmPassword}
                        errorMessage={errors.confirmPassword?.message}
                    />
                    <Formbutton title="Change Password" loading={isSubmitting ? true : false} />
                </form>
            </div>
        </div>
    )
}

export default ResetPassword