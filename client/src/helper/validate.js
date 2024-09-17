


// helper/validate.js

import toast from "react-hot-toast";

export function usernameValidate(values) {
    const errors = varifyUsername({}, values);
    return errors;
}

function varifyUsername(error = {}, values) {
    if (!values.username) {
        error.username = 'Username Required'; // Assign error message
        toast.error('Username Required!');     // Display toast notification
    } else if (values.username.includes(" ")) {
        error.username = 'Invalid username';
        toast.error('Invalid username!');      // Display toast notification
    }
    return error;
}


// password
function varifyPassword(error = {}, values) {
    if (!values.password) {
        error.password = 'password Required'; // Assign error message
        toast.error('password Required!');     // Display toast notification
    } else if (values.password.includes(" ")) {
        error.password = 'Invalid password choice ';
        toast.error('Invalid password choice!');      // Display toast notification
    }else if(values.password.length < 4){
        error.password = 'Password must be more than 3 charectores ';
        toast.error('Password must be more than 3 charectores ');  
    }
    return error;
}

export function PasswordValidate(values) {
    const errors = varifyPassword({}, values);
    return errors;
}

// reset password

export function ResetValidate(values){
    const errors = varifyPassword({}, values);
    if(values.password != values.confirmPassword){
        errors.exist = toast.error('Password donot match...')
    }
    return errors;
}

export function RegisterValidate(values){

    const error  = varifyUsername({},values)
    varifyPassword(error,values)
    emailVarify(error,values)
    return error
}

function emailVarify(error = {},values){

    if(!values.email){
        error.email = 'Email Required'; 
        toast.error('Email Required!');
    }else if(values.email.includes(" ")){
        error.email = 'invalid email !'; 
        toast.error('invalid email !');
    }
    return error
}

// profile validate

export async function profileValidate(values) {
    const error = emailVarify({},values)
    return error
}