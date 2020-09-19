import React, {useState} from 'react'
import Link from 'next/link';

const LoginMenu = ({loginMenuToggle, visible, setSignupVisibility}) => {
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const handleFieldChange = (e) => {
        if (e.target.name === 'username') setUsername(e.target.value)
        else setPassword(e.target.value)
    }    
    const loginHandler = (e) => {
        e.preventDefault()
        console.log('Username:', username, 'password:', password)
    }

    const handleSignupLinkClick = () => {
        setSignupVisibility(true)
        loginMenuToggle()
    }
    


    return (
    <div className={`login__menu ${visible ? 'visible' : ''}`}>
        <form className='login-form' onSubmit={loginHandler}>
            <input type="text" name='username' placeholder='Username' onChange={handleFieldChange} />
            <input type="password" name='password' placeholder='Password' onChange={handleFieldChange}/>
            <button onClick={loginHandler}>Login</button>
        </form>
        <p>No account?</p>
        <p className='signup-link' onClick={handleSignupLinkClick}>Signup</p>
    </div>
    )
}

export default LoginMenu