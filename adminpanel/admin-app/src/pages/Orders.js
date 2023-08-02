import React from 'react'
import { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../features/auth/authSlice'
import { Table } from 'antd';
import moment from 'moment/moment';
const columns = [
    {
      title: 'SNo',
      dataIndex: 'key',
    },
    {
      title: 'OrderId',
      dataIndex: 'title',
      defaultSortOrder: "desend",
     
    },
    {
      title: 'Payment',
      dataIndex: 'paymentIntent',
    
     
    },
   
    {
      title: 'orderby',
      dataIndex: 'orderby',
    },
    {
      title: 'Product',
      dataIndex:'product'
    },
    {
      title: 'Status',
      dataIndex: 'orderStatus',
    },
    {

      title: 'Amount',
      dataIndex: 'amount',
     
     
    },
    {
      title: 'PlacedAt',
      dataIndex: 'placedAt',
    },
  ];
  
const Orders = () => {

  const dispatch = useDispatch()
  const [orders, setOrders]= useState([]);
  
  useEffect(()=>{
   dispatch(getOrders());
   setOrders(state);
   },[]) 
   const state = useSelector((state)=>state.auth.orders)
 
   const data = []
 console.log(orders);
  
  for(let i=0;i<orders.length;i++){

      data.push({
        key:i+1,
        title: state[i]._id,
        orderby:state[i].orderby.firstname,
        product:state[i].products.map((i)=>{
          return(<>
          <ul>
            <li>
            {i.product.name}
            </li>
          </ul>
          
          </>)
            
            
        }),
        orderStatus: state[i].orderStatus,
        amount:`$ ${state[i].paymentIntent.amount}`,
        // `$ ${state[i].price}`
        placedAt: new Date(state[i].createdAt).toDateString()
      })
    //  console.log("data is "+data);
    
   
  }
  return (
    <div><Table columns={columns} dataSource={data}/></div>
  )
}

export default Orders