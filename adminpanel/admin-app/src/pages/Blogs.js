import React from 'react'
import { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'antd';
import { getBlogs } from '../features/Blogs/blogSlice';
const columns = [
    {
      title: 'SNo',
      dataIndex: 'key',
    },
    {
      title: 'Blogs',
      dataIndex: 'title',
      defaultSortOrder: "desend",
      sorter: (a,b)=> a.title.length - b.title.length
     
     
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      sorter: (a,b)=> a.category.length - b.category.length
      
    },
  ];
  
const Blogs = () => {

  const dispatch = useDispatch()
  const [blogs, setBlogs]= useState([]);
  useEffect(()=>{
    dispatch(getBlogs());
    
   },[])
   const state = useSelector((state)=>state.blogs.blogs)
   const data = []
  console.log(state);
  
  for(let i=0;i<state.length;i++){

      data.push({
        key:i+1,
        title: state[i].title,
        description :state[i].description,
        category: state[i].category,
      })
    //  console.log("data is "+data);
    
   
  }
  return (
    <div><Table columns={columns} dataSource={data}/></div>
  )
}

export default Blogs