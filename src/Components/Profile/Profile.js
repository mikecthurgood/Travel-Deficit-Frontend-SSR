import React from 'react'
// import { Card, Button } from 'semantic-ui-react'
import ProfileMap from './ProfileMap'
import UserInfo from './UserInfo'
import LeaderBoard from './LeaderBoard'
import ProfileVisited from './ProfileVisited'
import ProfileWishList from './ProfileWishList'
import ScrollContainer from 'react-indiana-drag-scroll'




const Profile = ({ countries, visitedCountries, userName, userAge, badges, userImage, bannerNumber, updateAge, updateGuestAge, wishlist }) => {

    const filteredCountries = countries.length > 0 && countries.filter(country => visitedCountries.includes(country.code)).sort((a, b) => a.name.localeCompare(b.name))
    // const continents = filteredCountries.length > 0 && [...new Set(filteredCountries.map(country => country.continent))].sort()

    return (

        <div className='profile-container'>
            <div className='profile-row'>
                <div className='profile-row-item'>
                    <UserInfo
                        countries={countries}
                        visitedCountries={visitedCountries}
                        userName={userName}
                        userAge={userAge}
                        badges={badges}
                        userImage={userImage}
                        updateAge={updateAge}
                        updateGuestAge={updateGuestAge}
                    />
                </div>
                <div className='profile-row-item'>

                    <ProfileMap
                        countries={countries}
                        visitedCountries={visitedCountries}
                    />
                </div>

                <div className='profile-row-item'>

                    <LeaderBoard
                        countries={countries}
                        visitedCountries={visitedCountries}
                        userName={userName}
                        userAge={userAge}
                        // badges={badges}
                        userImage={userImage}
                    />
                </div>
            </div>

            <div className='profile-row-visited-container'>
                <ScrollContainer className="scroll-container" horizontal={true} vertical={false}>
                    <ProfileVisited
                        countries={countries}
                        visitedCountries={visitedCountries}
                    />
                </ScrollContainer>

            </div>

            <div className='profile-row-visited-container'>
                <ProfileWishList
                    countries={countries}
                    wishlist={wishlist}
                />
            </div>



        </div >

    )
}

export default Profile