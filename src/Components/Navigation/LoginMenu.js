import React, {useState} from 'react'
import Link from 'next/link';
import API from '../../Helpers/API'

const LoginMenu = ({loginMenuToggle, setUser, user, visible, setSignupVisibility}) => {
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const handleFieldChange = (e) => {
        if (e.target.name === 'username') setUsername(e.target.value)
        else setPassword(e.target.value)
    }    
    const loginHandler = async (e) => {
        e.preventDefault()
        const loginResult = await API.login({username, password})
        if (loginResult.isAuth) {
            const {userId, username, age, token, isAuth} = loginResult
            setUser({userId, username, age, token, isAuth})
            loginMenuToggle()
        }
        console.log('loginResult',loginResult)
        // console.log('username:', username, 'password:', password)
    }

    const handleSignupLinkClick = () => {
        setSignupVisibility(true)
        loginMenuToggle()
    }

    const logOutHandler = (e) => {
        e.preventDefault()
        setUser({userId: '', userName: 'Guest', age: '', token: '', isAuth: false})
        loginMenuToggle()
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('userAge');
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
                <form className='login-form' onSubmit={loginHandler}>
                <input type="text" name='username' placeholder='Username or email' onChange={handleFieldChange} />
                <input type="password" name='password' placeholder='Password' onChange={handleFieldChange}/>
                <button onClick={loginHandler}>Login</button>
            </form>
            <p>No account?</p>
            <p className='signup-link' onClick={handleSignupLinkClick}>Signup</p>
            </>)}
        </div>
        </>
    )
}

export default LoginMenu