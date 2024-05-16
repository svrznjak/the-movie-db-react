import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import styles from './MainWithSidebarLayout.module.css';


export default function MainWithSidebarLayout({ title, sidebar, children }: { title: string, sidebar: React.ReactNode, children: React.ReactNode}) {
  return (
    <>
      <Header />
      <div className={styles.layout}>
        <h1>{title}</h1>
        <div className={styles.content}>
          <div className={styles.sidebar}>{sidebar}</div>
          <main>{children}</main>
          </div>
        </div>
      <Footer />
    </>
  );
}