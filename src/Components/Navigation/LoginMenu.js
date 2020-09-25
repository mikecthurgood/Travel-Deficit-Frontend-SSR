import React, {useState} from 'react'
import Link from 'next/link';
import API from '../../Helpers/API'

const LoginMenu = ({loginMenuToggle, setUser, loginHandler, logOutHandler, user, visible, setSignupVisibility}) => {
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const handleFieldChange = (e) => {
        if (e.target.name === 'username') setUsername(e.target.value)
        else setPassword(e.target.value)
    }    

    const handleSignupLinkClick = () => {
        setSignupVisibility(true)
        loginMenuToggle()
    }

    return (
        <>
        <div className={`login__menu ${visible ? 'visible' : ''}`}>
        { user.userId ? 
            (
                <>   
                    <div className='login__menu-loggedin-menu'>
                        <p><Link href='/profile'>My Profile</Link></p>
                        <p><Link href='/profile'>My Account</Link></p>
                    </div>
                    <form className='login-form'>
                    <button onClick={logOutHandler}>Logout</button>
                    </form>
                </>
            )
        :
            (<>
                <form className='login-form' onSubmit={e => loginHandler(e, username, password)}>
                <input type="text" name='username' placeholder='Username or email' onChange={handleFieldChange} />
                <input type="password" name='password' placeholder='Password' onChange={handleFieldChange}/>
                <button onClick={e => loginHandler(e, username, password)}>Login</button>
            </form>
            <p>No account?</p>
            <p className='signup-link' onClick={handleSignupLinkClick}>Signup</p>
            </>)}
        </div>
        </>
    )
}

export default LoginMenu