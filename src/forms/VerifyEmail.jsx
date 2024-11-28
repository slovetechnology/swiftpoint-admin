import React, { useEffect, useState } from 'react'
import Forminput from '../components/Forminput'
import Formbutton from '../components/Formbutton'
import { useNavigate, useSearchParams } from 'react-router-dom'
import img from "../assets/swift_logo.png"
import { useForm } from 'react-hook-form'
import { Notifies, WebError } from '../utils/utilities'
import { Clientposturl, Webapis } from '../utils/webapis'

function VerifyEmail() {
    const { register, formState: { errors, isSubmitting }, handleSubmit } = useForm({
        defaultValues: {
            otp: ''
        }
    })
    const navigate = useNavigate()
    const [searchParams,] = useSearchParams()
    const search = searchParams.get('email')
    const [resend, setResend] = useState('Resend Verification code')

    useEffect(() => {
        if(!search) return navigate('/forgot-password')
    }, [])

    async function HandleSubmission(values) {
        try {
            const dataForm = {
                code: values.otp,
                email: search,
            }
            const response = await Clientposturl(Webapis.confirm_verification_code, dataForm)
            if (response.status !== 200) return Notifies('Request failed', response.message, 'error')
            navigate(`/reset-password?email=${search}`)
        } catch (error) {
            WebError(error)
        }
    }
    async function ResendCode() {
        try {
            setResend('resending code...')
            const dataForm = {
                email: search,
            }
            const response = await Clientposturl(Webapis.find_account, dataForm)
            if (response.status !== 200) return Notifies('Request failed', response.message, 'error')
                setTimeout(() => {
                    setResend('Verification code sent')
                    setTimeout(() => {
                        setResend('Resend Verification code')
                    }, 2000);
                }, 2000);
        } catch (error) {
            setResend('Resend Verification code')
            WebError(error)
        }
    }
    return (
        <div className='bg-blue-50 h-screen overflow-y-auto pt-10'>
            <div className="bg-white w-11/12 max-w-xl px-4 py-10 rounded-xl mx-auto">
                <div className="w-fit mx-auto"><img src={img} alt="SwiftPoint" className="size-20 object-contain" /></div>
                <div className="font-bold text-xl text-center">Verify Email Address</div>
                <form onSubmit={handleSubmit(HandleSubmission)}>
                    <Forminput
                        {...register('otp', { required: 'Verification code is required' })}
                        content="Verification Code"
                        error={errors.otp}
                        errorMessage={errors.otp?.message}
                    />
                    <div className="w-fit ml-auto mb-6">
                        <div className={`${resend !== 'Resend Verification code' ? 'text-zinc-600 cursor-not-allowed' : 'text-blue-600 cursor-pointer'}`} onClick={resend !== 'Resend Verification code' ? null : ResendCode}>{resend}</div>
                    </div>
                    <Formbutton title="Verify Email" loading={isSubmitting ? true : false} />
                </form>
            </div>
        </div>
    )
}

export default VerifyEmail