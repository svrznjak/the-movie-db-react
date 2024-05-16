import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import styles from './MainWithSidebarLayout.module.css';
import Button from "../common/Button";
import { useState } from "react";


export default function MainWithSidebarLayout({ title, sidebar, children }: { title: string, sidebar: React.ReactNode, children: React.ReactNode}) {
  const [isSidebarOpenOnMobile, setIsSidebarOpenOnMobile] = useState(false);

  return (
    <>
      <Header />
      <div className={styles.layout}>
        <div className={styles.header}>
          <h1>{title}</h1>
          <Button text={isSidebarOpenOnMobile ? 'Less' : 'More'} onClick={()=>{setIsSidebarOpenOnMobile(!isSidebarOpenOnMobile)}} />
        </div>
        <div className={styles.content}>
          <div className={`${styles.sidebar} ${isSidebarOpenOnMobile ? styles.mobileSidebarActive : ''}`}>{sidebar}</div>
          <main>{children}</main>
          </div>
        </div>
      <Footer />
    </>
  );
}