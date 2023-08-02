import React from 'react'
import { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../features/customer/customerSlice'
import { Divider, Radio, Table } from 'antd';

const Customer = () => {

  const dispatch = useDispatch()
  const [customers, setCustomers]= useState([]);
  useEffect(()=>{
    dispatch(getUsers());
    
   },[])
   const state = useSelector((state)=>state.customer.customers)
  console.log(state);
  const columns = [
    {
      title: 'SNo',
      dataIndex: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      defaultSortOrder: "desend",
      sorter: (a,b)=> a.name - b.name
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
    },
  ];
  const data = []
  for(let i=0;i<state.length;i++){
    if(state[i].isAdmin!=true){
      data.push({
        key:i+1,
        name: state[i].firstname + " " + state[i].lastname,
        email:state[i].email,
        mobile: state[i].mobile,
      })
    }
   
  }
  return (
    <div><Table columns={columns} dataSource={data}/></div>
  )
}

export default Customer