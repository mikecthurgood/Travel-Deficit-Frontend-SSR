import React, {useState} from 'react'
import Link from 'next/link';


const SideMenu = ({ visible, menuToggle }) => {
    const [expandedMenus, setExpandedMenus] = useState([])
    const [friendCode, setFriendCode] = useState('')
    const [requestSent, setRequestSent] = useState(false)

    const openSubMenu = (index) => {
        if (expandedMenus.includes(index)) {
            const updatedMenus = expandedMenus.filter(item => item !== index)
            setExpandedMenus(updatedMenus)
        } else {
            setExpandedMenus([...expandedMenus, index])
        }
    }

    const handleFriendRequest = (e) => {
        e.preventDefault()
        console.log(friendCode)
        setFriendCode('')
        setRequestSent(true)
        setTimeout(() => {
            setRequestSent(false)
        }, 5000)
        
    }

    return (
        <>
            <div className={`screen-filter ${visible ? 'visible' : ''}`} onClick={menuToggle}></div>
            <div className={`menu__panel ${visible ? 'visible' : ''}`}>
                <div className='menu__panel-item'>
                        <span onClick={() => openSubMenu(1)}><h4 className='nav-link'>Country Search</h4><h2 className={expandedMenus.includes(1) ? 'active' : ''}>{'>'}</h2></span>
                        <div className={`menu__panel-item-sub__menu ${expandedMenus.includes(1) ? 'visible' : ''}`}>
                            <span><p><Link href="/">Map Search</Link></p></span>
                            <span><p><Link href="/list-view">List Search</Link></p></span>
                            {/* <p>{'>'}</p> */}
                        </div>
                    
                </div>
                <div className='menu__panel-item'>
                    <Link href="/recommendations">
                        <span onClick={() => openSubMenu(2)}><h4 className='nav-link'>Recommendations</h4><h2 className={expandedMenus.includes(0) ? 'active' : ''}>{'>'}</h2></span>
                    </Link>
                </div>
                <div className='menu__panel-item'>
                    <Link href="/profile">
                        <span onClick={() => openSubMenu(3)}><h4 className='nav-link'>My Profile</h4><h2 className={expandedMenus.includes(0) ? 'active' : ''}>{'>'}</h2></span>
                    </Link>
                </div>
                <div className='menu__panel-item'>
                    <Link href="/profile">
                        <span onClick={() => openSubMenu(4)}><h4 className='nav-link'>My Account</h4><h2 className={expandedMenus.includes(0) ? 'active' : ''}>{'>'}</h2></span>
                    </Link>
                </div>
                <div className='menu__panel-item'>
                    {/* <Link href="/profile"> */}
                        <span onClick={() => openSubMenu(5)}><h4 className='nav-link'>Add Friends</h4><h2 className={expandedMenus.includes(5) ? 'active' : ''}>{'>'}</h2></span>
                        <div className={`menu__panel-item-sub__menu ${expandedMenus.includes(5) ? 'visible' : ''}`}>
                            <form className='add-friend-form' onSubmit={handleFriendRequest} >
                                <input 
                                    type="text" 
                                    placeholder='Enter Friend Code'
                                    value={friendCode}
                                    onChange={(e) => setFriendCode(e.target.value)}
                                />
                            </form>
                            <p className={`friend-request-confirmation ${requestSent ? 'visible' : ''}`}>Request Sent</p>
                            {/* <p>{'>'}</p> */}
                        </div>
                    {/* </Link> */}
                </div>
                <div className='menu__panel-item'>
                    {/* <Link href="/profile"> */}
                        <span onClick={() => openSubMenu(6)}><h4 className='nav-link'>How To Play</h4><h2>{'>'}</h2></span>
                        <div className={`menu__panel-item-sub__menu ${expandedMenus.includes(0) ? 'visible' : ''}`}>

                        </div>
                    {/* </Link> */}
                </div>
            </div>
        </>
    )
}

export default SideMenu