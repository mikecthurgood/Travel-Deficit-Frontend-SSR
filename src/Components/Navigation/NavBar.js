import React from 'react'
import Link from 'next/link';
import LoginMenu from './LoginMenu'

const NavBar = ({loginMenuToggle, loginMenuVisible, setSignupVisibility}) => (
    <>
        <div className='navbar'>
            <span>
                <Link href="/" exact>
                    <img id='main-logo' 
                    src={(require('../../Assets/TD-logo.png').default)} 
                    alt=""
                    />
                </Link>
            </span>
            <span className='login-icon'>
                <img src='/login-icon.jpg' 
                onMouseOver={e => (e.currentTarget.src = '/login-icon-hover.jpg')} 
                onMouseOut={e => (e.currentTarget.src = '/login-icon.jpg')}
                alt="profile" 
                className='profile-picture' 
                onClick={loginMenuToggle}/>
            </span>
        </div>
        <LoginMenu visible={loginMenuVisible} loginMenuToggle={loginMenuToggle} setSignupVisibility={setSignupVisibility} />
    </>
)



export default NavBar