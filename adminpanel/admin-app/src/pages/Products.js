import React from 'react'
import { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getproducts } from '../features/product/productSlice'
import { Table } from 'antd';
const columns = [
    {
      title: 'SNo',
      dataIndex: 'key',
    },
    {
      title: 'Product',
      dataIndex: 'title',
      defaultSortOrder: "desend",
     
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
  ];
  
const Product = () => {

  const dispatch = useDispatch()
  const [products, setProducts]= useState([]);
  useEffect(()=>{
    dispatch(getproducts());
    
   },[])
   const state = useSelector((state)=>state.products.products)
   const data = []
  console.log(state);
  
  for(let i=0;i<state.length;i++){

      data.push({
        key:i+1,
        title: state[i].name,
        brand:state[i].brand,
        price: `$ ${state[i].price}`,
      })
    //  console.log("data is "+data);
    
   
  }
  return (
    <div><Table columns={columns} dataSource={data}/></div>
  )
}

export default Product