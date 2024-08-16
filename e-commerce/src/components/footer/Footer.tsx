import React from 'react'
import { FooterProps } from '@/lib/types'
import styles from './index.module.scss'
import Image from 'next/image'


const Footer: React.FC<FooterProps> = ({footerLinks}) => {
  return (
    <div className={styles.footerContainer}>
        <div className={styles.footerContainerLeft}>
            <h1>{footerLinks[0].title}</h1>
            <ul>
                {footerLinks[0].links.map((link,index) => (
                <li
                key={index}
                >{link.name}</li>
            ))}
            </ul>
            
        </div>
        <div className={styles.footerContainerRight}>
            <h1>{footerLinks[1].title}</h1>
            <ul>
                {footerLinks[1].links.map((link,index) => (
                <li
                key={index}
                >
                    <Image 
                    src={link.logo} 
                    alt={'icon'}
                    width={15}
                    height={15} />
                    <p>{link.name}</p>
                </li>
            ))}
            </ul>
        </div>
        <div className={styles.footerCopyRight}>
            <div className={styles.copyRightLeft}>
                <span>Copyright</span>
                <Image 
                src="/icons/copy-right.svg" 
                alt="copyright" 
                width={15}
                height={15}/>
                <span>2024. All rights are reserved.</span>
            </div>
            <div className={styles.copyRightRight}>
                <ul>
                    {footerLinks[2].links.map((link,index) => (
                        <li key={index}>
                        <Image 
                        src={link.logo} 
                        alt="icons" 
                        width={15}
                        height={15}/></li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Footer