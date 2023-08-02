import {
    MenuFoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
  import {AiOutlineDashboard} from "react-icons/ai"
  import {SiBloglovin} from "react-icons/si"
  
  import {FiUsers} from "react-icons/fi"
  import {BiCategory} from "react-icons/bi"
  import {TbSquareRoundedLetterM} from "react-icons/tb"
  
  import {MdOutlineAddShoppingCart,MdOutlineAdd} from "react-icons/md"
  import {GiChecklist} from "react-icons/gi"
  import {FaClipboardList,FaMailBulk} from "react-icons/fa"
  import {TbBrandBootstrap} from "react-icons/tb"
  import {BsReverseListColumnsReverse} from "react-icons/bs"
  
  
  import { Button, Layout, Menu, theme } from 'antd';
  import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
  const { Header, Sider, Content } = Layout;
  const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate();
    return (
      <Layout>
        
        <Sider trigger={null} collapsible collapsed={collapsed}>
        {/* <div className='logo'>
          <h1> <TbSquareRoundedLetterM margin-left={10} color='skyblue' /> shop</h1>
        </div> */}
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['']}
            onClick={({key})=>{
              if(key === 'signout'){

              }else{
                navigate(key);
              }
            }}
            items={[
               {
                key: 'Home',
                 icon: <TbSquareRoundedLetterM color='skyblue' size={40} className='logo'/>,
                 label: 'Shop2Day',
               },
              {
                key: '',
                icon: <AiOutlineDashboard />,
                label: 'Dashboard',
              },
              {
                key: 'Customers',
                icon: <FiUsers />,
                label: 'Customers',
              },
              {
                key: 'Catalog',
                icon: <BiCategory />,
                label: 'Catalog',
                children:[
                  {
                    
                      key: 'Product',
                      icon: <MdOutlineAddShoppingCart />,
                      label: 'Add Product',
                    
                  }, 
                  {
                    key: 'Product-List',
                    icon: <GiChecklist />,
                    label: 'Product List',
                  },
                  {
                    key: 'Brand',
                    icon: < TbBrandBootstrap/>,
                    label: 'Brand',
                  },
                  {
                    key: 'Brand-List',
                    icon: <GiChecklist />,
                    label: 'Brand List',
                  },
                  {
                    key: 'Catagory',
                    icon: < BsReverseListColumnsReverse/>,
                    label: 'Catagory',
                  },
                  {
                    key: 'Catagory-List',
                    icon: <GiChecklist />,
                    label: 'Catagory List',
                  },
                ]
              },
              {
                key: 'Orders',
                icon: <FaClipboardList />,
                label: 'Orders',
              },
              {
                key: 'Blogs',
                icon: <SiBloglovin />,
                label: 'Blogs',
                children: [
                  {
                    
                    
                      key: 'Blog',
                      icon: <MdOutlineAdd />,
                      label: 'Add Blog',
                    
                  
                  },{
                    key: 'Blog-List',
                    icon: <GiChecklist />,
                    label: 'Blog List',

                  },{
                    key: 'Blog-Catagory',
                    icon: <MdOutlineAdd />,
                    label: 'Add Blog Catagory',

                  },
                  {
                    key: 'Blog-Catagory-List',
                    icon: < GiChecklist/>,
                    label: 'Blog Catagory List',

                  }
                ]
              },
              {
                key: 'Enquiries',
                icon: <FaMailBulk />,
                label: 'Enquiries',
              },
              
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuFoldOutlined/> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
              
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    );
  };
  export default MainLayout;