import React, { useState } from 'react';
import { MdCategory, MdOutlineHome } from 'react-icons/md';
import { FaShoppingBasket, FaSignOutAlt, FaUserCog } from "react-icons/fa"
import { FaSwatchbook } from "react-icons/fa6";
import { SiMessenger } from "react-icons/si";
import { MdFeedback } from "react-icons/md"
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Row, Col, Avatar } from 'antd';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import QuanLySach from './conponents/sach/QuanLySach';
import FormThemSach from './conponents/sach/FormThemSach';
import CapNhatSach from './conponents/sach/CapNhatSach';
import XemSach from './conponents/sach/XemSach';



const { Header, Sider, Content } = Layout;


const DashboardPage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  return (
    <Layout style={{ height: '100vh', width: '100vw' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <div className='logo'>
          <h3>{collapsed ? 'BS' : 'BookStore'}</h3>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <MdOutlineHome />,
              label: 'Home',
            },
            {
              key: '2',
              icon: <FaSwatchbook />,
              label: 'Sách',
              onClick: () => navigate('/admin/quan-ly-sach')
            },
            {
              key: '3',
              icon: <MdCategory />,
              label: 'Thế loại',
            },
            {
              key: '4',
              icon: <FaShoppingBasket />,
              label: 'Đơn hàng',
            },
            {
              key: '5',
              icon: <FaUserCog />,
              label: 'Người dùng',
            },
            {
              key: '6',
              icon: <MdFeedback />,
              label: 'Đánh giá',
            },
            {
              key: '7',
              icon: <SiMessenger />,
              label: 'Phản hồi',
            },
            {
              key: '8',
              icon: <FaSignOutAlt />,
              label: 'Log out',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, }}>
          <Row>
            <Col md={20}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
              />
            </Col>
            <div>
              <Avatar size='default' icon={<UserOutlined />}></Avatar> Bùi
              Xuân Ngọc
            </div>
            <Col md={4}>

            </Col>
          </Row>
        </Header>
        <Content
          style={{
            margin: '5 px ',
            padding: 14,
            minHeight: 2,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <div className='content-panel' style={{ overflow: 'auto', maxHeight: '100%'}}>
            <Routes>
              <Route path='/admin/quan-ly-sach' element={<QuanLySach />}></Route>
              <Route path='/admin/them-sach' element={<FormThemSach setShowThemSach={undefined} />} />
              <Route path='/admin/xem-sach/:maSach' element={<XemSach/>} />
              <Route path='/admin/sua-sach/:maSach' element={<CapNhatSach/>} />
            </Routes>

            <Outlet></Outlet>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardPage;
