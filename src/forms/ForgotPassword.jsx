import React from 'react'
import Forminput from '../components/Forminput'
import Formbutton from '../components/Formbutton'
import { useNavigate } from 'react-router-dom'
import img from "../assets/swift_logo.png"
import { useForm } from 'react-hook-form'
import { Notifies, WebError } from '../utils/utilities'
import { Clientposturl, Webapis } from '../utils/webapis'

function ForgotPassword() {
    const { register, formState: { errors, isSubmitting }, handleSubmit } = useForm({
        defaultValues: {
            email: ''
        }
    })
    const navigate = useNavigate()

    async function HandleSubmission(values) {
        try {
            const response = await Clientposturl(Webapis.find_account, values)
            if (response.status !== 200) return Notifies('Request failed', response.message, 'error')
            navigate(`/verify-email?email=${values.email}`)
        } catch (error) {
            WebError(error)
        }
    }
    return (
        <div className='bg-blue-50 h-screen overflow-y-auto pt-10'>
            <div className="bg-white w-11/12 max-w-xl px-4 py-10 rounded-xl mx-auto">
                <div className="w-fit mx-auto"><img src={img} alt="SwiftPoint" className="size-20 object-contain" /></div>
                <div className="font-bold text-xl text-center">Find my Account</div>
                <form onSubmit={handleSubmit(HandleSubmission)}>
                    <Forminput
                        {...register('email', { required: 'Email address is required' })}
                        content="Email Address"
                        error={errors.email}
                        errorMessage={errors.email?.message}
                    />
                    <Formbutton title="Find Account" loading={isSubmitting ? true : false} />
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword