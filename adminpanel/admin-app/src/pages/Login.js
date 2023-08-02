import React, { useEffect } from 'react'
// import { LockOutlined, UserOutlined } from '@ant-design/icons';
// import { Button, Checkbox, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getOrders, login} from "../features/auth/authSlice"
import * as Yup from 'yup';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';

 
   
const Login = () => {
  const dispatch = useDispatch();
  let Schema = Yup.object().shape({
    email:Yup.string().email().required(),
    password: Yup.string().required(),
   })
  const formik = useFormik({
    initialValues: {
      email: '',
      password:'', 
    },
   
    validationSchema: Schema,
    onSubmit: values => {
      alert(values)
      dispatch(login(values))
      dispatch(getOrders());
      // alert(JSON.stringify(values, null, 2));
    },
  });
  const navigate = useNavigate() 
  const authState =useSelector((state)=>state);

  const {user, isLoading, isError, isSuccess, message} = authState.auth
 
  useEffect(()=>{
    if(isSuccess){
    
      navigate("admin")
    }else{
      navigate("")
    }
  },[user, isLoading, isError, isSuccess, message])
    
    return (
    <div className="py-5" style={{background:"#ffd333", minHeight: "100vh"}}>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <div className='my-5 w-25 bg-white rounded-3 mx-auto p-4'>
        <h3 className='text-center title'>Login</h3>
        <p className='text-center'>Login to your account to continue.</p>
        {message.message==="Rejected"?"you are not an admin":""}
       
        <form action='' onSubmit={formik.handleSubmit}>
        <CustomInput
         type="text"
         name="email"
         lable="Email Address"
         id="email"
         val={formik.values.email}
         onCh={formik.handleChange("email")}
         />
         {formik.touched.email && formik.errors.email ? (<div>{formik.errors.email}</div>):null}
          <CustomInput
         type="password"
         name="password"
         lable="password"
         id="pass"
         val={formik.values.password}
         onCh={formik.handleChange("password")}
         
         />
          {formik.touched.password && formik.errors.password ? (<div>{formik.errors.password}</div>):null}
         <div className='mb-3 text-end'>
          <Link to="forgot-password" className=''>Frogot password?
          </Link>
          </div>
          <button 
          className='border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5'
          style={{background:"#ffd333"}}
          type='submit'
          >
            Login
          </button>
        </form>
        </div> 
    </div>
     
    );
  
}

export default Login