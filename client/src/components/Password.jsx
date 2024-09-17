import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { Toaster } from 'react-hot-toast';// Import
import { PasswordValidate } from '../helper/validate';  

function Password() {
    const formik = useFormik({
        initialValues: {
           password: ''
        },
        validate: PasswordValidate,  
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            console.log(values);
        }
    });

    return (
        <div className='container mx-auto flex h-screen justify-center items-center bg-gray-100'>

            <Toaster position='top-center' reverseOrder={false} />

            <div className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg'>
                <div className='title flex flex-col items-center'>
                    <h4 className='text-4xl font-bold text-gray-800'>Your Password</h4>
                    <span className='py-4 text-xl text-center text-gray-500'>
                        Explore more by connecting with us.
                    </span>
                </div>

                <form className='space-y-6' onSubmit={formik.handleSubmit}>
                    <div className='profile flex justify-center py-4'>
                        <img
                            src='https://via.placeholder.com/150'
                            alt='profile'
                            className='w-24 h-24 rounded-full shadow-lg'
                        />
                    </div>

                    <div className='textbook flex flex-col gap-4 items-center'>
                        <input 
                            {...formik.getFieldProps('password')}
                            type='password'
                            placeholder='password'
                            className='w-full px-4 py-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                        <button
                            type='submit'
                            className='w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg'
                        >
                            Let's Go
                        </button>
                    </div>

                    <div className='py-4 text-center'>
                        <span className='text-gray-500'>
                            Not a member?{' '}
                            <Link className='text-blue-500 hover:underline' to='/recovery'>
                                Recovery
                            </Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Password;
