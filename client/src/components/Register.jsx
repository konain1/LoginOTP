import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { Toaster } from 'react-hot-toast';// Import
import { PasswordValidate } from '../helper/validate'; 
import convertToBase64 from '../helper/convert'; 
import { RegisterValidate } from '../helper/validate';

function Register() {

    const [file,setFile]= useState()
    const formik = useFormik({
        initialValues: {
            email:'',
            username:'',
           password: ''
        },
        validate: RegisterValidate,  
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            values : await Object.assign(values, {profile :file || ''})
            console.log(values);
        }
    });

     const onUpload = async (e)=>{
        const base64 = await convertToBase64(e.target.files[0])
        setFile(base64)

     }

    return (
        <div className='container mx-auto flex h-screen justify-center items-center bg-gray-100'>

            <Toaster position='top-center' reverseOrder={false} />

            <div className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg'>
                <div className='title flex flex-col items-center'>
                    <h4 className='text-4xl font-bold text-gray-800'>Register</h4>
                    <span className='py-4 text-xl text-center text-gray-500'>
                        Happy to join you
                    </span>
                </div>

                <form className='space-y-6' onSubmit={formik.handleSubmit}>
                    <div className='profile flex justify-center py-4'>
                    <label htmlFor='profile'>
                    <img
                            src={ file || 'https://via.placeholder.com/150'}
                            alt='profile'
                            className='w-24 h-24 rounded-full shadow-lg'
                        />
                    </label>
                    <input onChange={onUpload} type='file' id='profile'  className='hidden'/>
                       
                    </div>

                    <div className='textbook flex flex-col gap-4 items-center'>

                    <input 
                            {...formik.getFieldProps('username')}
                            type='text'
                            placeholder='username*'
                            className='w-full px-4 py-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                        <input 
                            {...formik.getFieldProps('email')}
                            type='email'
                            placeholder='email*'
                            className='w-full px-4 py-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                        
                         <input 
                            {...formik.getFieldProps('password')}
                            type='password'
                            placeholder='password*'
                            className='w-full px-4 py-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                        <button
                            type='submit'
                            className='w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg'
                        >
                         Register
                        </button>
                    </div>

                    <div className='py-4 text-center'>
                        <span className='text-gray-500'>
                            Already registered?{' '}
                            <Link className='text-green-500 hover:underline' to='/recovery'>
                                Login
                            </Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
