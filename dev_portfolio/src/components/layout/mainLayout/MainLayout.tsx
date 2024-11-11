import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.css';
import NavBar from '../navBar/NavBar';
import Footer from '../footer/Footer';

const { Content } = Layout;

const MainLayout: React.FC = () => {
  return (
    <Layout className={styles.mainLayoutContainer}>
      <NavBar/>
      <Content className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          <Outlet />
        </div>
      </Content>
      <Footer/>
    </Layout>
  );
};

export default MainLayout;