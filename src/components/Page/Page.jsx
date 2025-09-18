import React, { useEffect, useRef } from 'react'
import './Page.scss'


export default function Page({ className, children }) {

    return (
        <div id='Page' className={className}>
            {children}
            {/* <footer>
                <p>{`Copyright © ${new Date().getFullYear()}`}</p>
                <p>Developed by SmartHatch</p>
            </footer> */}
        </div>
    )
}

const Header = ({ className, children }) => {

    const headerRef = useRef()

    useEffect(() => {
        headerRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' })
    }, [])

    return (
        <div id='Page_Header' className={className} ref={headerRef}>
            <div className='title'>
                {children && (!Array.isArray(children) ? [children] : children).filter(obj => (['Title', 'Breadcrumb'].includes(obj?.type?.displayName)))}
            </div>
            <div className='buttons'>
                {children && (!Array.isArray(children) ? [children] : children).filter(obj => (!['Title', 'Breadcrumb'].includes(obj?.type?.displayName)))}
            </div>
        </div >
    )
}

const Body = ({ className, children, mt }) => {
    return (
        <div id='Page_Body' className={className} style={{ marginTop: mt }}>
            {children}
        </div>
    )
}

Page.Header = Header
Page.Body = Body