import React, {useState} from 'react'
import Link from 'next/link';


const SideMenu = ({ visible, menuToggle }) => {

    return (
        <>
        <div className={`screen-filter ${visible ? 'visible' : ''}`} onClick={menuToggle}></div>
        <div className={`menu__panel ${visible ? 'visible' : ''}`}>
            <Link href="/">
                <h4 className='nav-link'>Country Search</h4>
            </Link>
            <Link href="/recommendations">
                <h4 className='nav-link'>Recommendations</h4>
            </Link>
            <Link href="/profile">
                <h4 className='nav-link'>My Profile</h4>
            </Link>
            <Link href="/profile">
                <h4 className='nav-link'>My Account</h4>
            </Link>
            <Link href="/profile">
                <h4 className='nav-link'>Add Friends</h4>
            </Link>
            <Link href="/profile">
                <h4 className='nav-link'>How To Play</h4>
            </Link>
        </div>
        </>
    )
}

export default SideMenu