import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.css';



const { Content } = Layout;

const MainLayout: React.FC = () => {
  return (
    <Layout className={styles.mainLayout}>
      <Content className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};

export default MainLayout;