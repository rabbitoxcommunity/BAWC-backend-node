import React, { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actionCreator';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const onSubmit = (data) => {
        let obj = {
            username: data?.username,
            password: data?.password,
        }

        dispatch(login(obj, (res) => {
            console.log(res, 'login1232')
            if (res?.status === 200) {
                navigate('/')
            }
        }))
    }


    return (
        <div className='h-screen grid w-full grow grid-cols-2 bg-white items-center'>
            <div className='login__bg'>
                <img src="/assets/img/login-bg.jpg" alt="" />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='login_page text-center'>
                    <div className="text-center pb-20">
                        <img src="/assets/img/logo.avif" className='logo' height={100} width={200} alt="" />
                    </div>
                    <h2>Welcome to BAWC Admin Panel. Please login to continue</h2>

                    <div className="form-group mb-3 w-full text-center">
                        <input type="text" className="form-control w-100" {...register("username", { required: true })} placeholder='Username' />
                        {errors?.name && <span style={{ color: "red", fontSize: "12px" }}>This is required</span>}
                    </div>
                    <div className="form-group w-full">
                        <input type="password" className="form-control w-100" {...register("password", { required: true })} placeholder='Password' />
                        {errors?.name && <span style={{ color: "red", fontSize: "12px" }}>This is required</span>}
                    </div>
                </div>
                <div className="flex gap-4 mt-5 justify-center">
                    <button type='submit' className='btn-primary'>Submit</button>
                    <button type='submit' className='btn-secondary'>Cancel</button>
                </div>
            </form>
        </div>
    )
}
