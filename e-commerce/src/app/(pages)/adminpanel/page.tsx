'use client'
import styles from './index.module.scss'
import {Navbar,AdminCrud} from '../../const/const'

const AdminPanel = () => {
  return (
    <div className={styles.panelContainer}>
        <Navbar />
        <AdminCrud />
    </div>
  )
}

export default AdminPanel