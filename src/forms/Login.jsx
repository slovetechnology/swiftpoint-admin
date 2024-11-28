import React from 'react'
import Forminput from '../components/Forminput'
import Formbutton from '../components/Formbutton'
import { Link, useNavigate } from 'react-router-dom'
import img from "../assets/swift_logo.png"
import { useForm } from 'react-hook-form'
import { Notifies, tokenName, WebError } from '../utils/utilities'
import { Clientposturl, Webapis } from '../utils/webapis'
import Cookies from 'js-cookie'

function Login() {
    const { register, formState: { errors, isSubmitting }, handleSubmit } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    })
    const navigate = useNavigate()

    async function HandleSubmission(values) {
        try {
            const response = await Clientposturl(Webapis.login, values)
            if (response.status !== 200) return Notifies('Request failed', response.message, 'error')
            Cookies.set(tokenName, response.token)
            navigate('/home')
        } catch (error) {
            WebError(error)
        }
    }
    return (
        <div className='bg-blue-50 h-screen overflow-y-auto pt-10'>
            <div className="bg-white w-11/12 max-w-xl px-4 py-10 rounded-xl mx-auto">
                <div className="w-fit mx-auto"><img src={img} alt="SwiftPoint" className="size-20 object-contain" /></div>
                <div className="font-bold text-xl text-center">Admin Login</div>
                <form onSubmit={handleSubmit(HandleSubmission)}>
                    <Forminput
                        {...register('email', { required: 'Email address is required' })}
                        content="Email Address"
                        error={errors.email}
                        errorMessage={errors.email?.message}
                    />
                    <Forminput
                        {...register('password', { required: 'Password is required' })}
                        content="Password"
                        type="password"
                        error={errors.password}
                        errorMessage={errors.password?.message}
                    />
                    <div className="w-fit ml-auto mb-6">
                        <Link to="/forgot-password" className='text-blue-600'>Forgot password?</Link>
                    </div>
                    <Formbutton title="Login Account" loading={isSubmitting ? true : false} />
                </form>
            </div>
        </div>
    )
}

export default Login