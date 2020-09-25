import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import HomePage from './Components/MapPage/HomePage'
import NavBar from './Components/Navigation/NavBar'
import API from './Helpers/API';
import AddCountry from './Components/MapPage/AddCountry'
import SecondaryNav from './Components/Navigation/SecondaryNav'
import Profile from './Components/Profile/Profile'
import Signup from './Components/Auth/Signup'
import SideMenu from './Components/Navigation/SideMenu'
// import Footer from './Components/Navigation/Footer'
import Recommendations from './Components/Recommendations/Recommendations'
import PrivacyPolicy from './Components/Profile/PrivacyPolicy'
// import { useEffect, useState } from 'react/cjs/react.production.min';

const App = ({page}) => {

  const [user, setUser] = useState({ id: '', username: 'Guest', age: '', token: '', isAuth: false})
  const [visitedCountries, setVisitedCountries] = useState({codes: [], names: []})
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('')
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({x: 0, y: 0})
  const [countryNamePopUpValue, setCountryNamePopUpValue] = useState("")
  const [countryNamePopUp, setCountryNamePopUp] = useState(false)
  const [wishlist, setWishlist] = useState([])
  const [loginMenuVisible, setLoginMenuVisibility] = useState(false)
  const [countryFilter, setCountryFilter] = useState('All')
  const [activeIndex, setActiveIndex] = useState(0)
  const [signupVisible, setSignupVisibility] = useState(false)
  const [menuVisible, setMenuVisibility] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    getInitialData(token)

    const wishlistIds = localStorage.getItem('wishList')
    if (wishlistIds) {
      setWishlist(wishlistIds.split(','))
    }
    
  }, [])

  const getInitialData = async (token) => {
    const userId = localStorage.getItem('userId')
    const username = localStorage.getItem('userName')
    const age = localStorage.getItem('userAge')

    const data = await API.newCountryInfo(token)
    
    const countries = data.data.countries.countries
    const authorised = data.data.countries.loggedIn
    const visitedCountriesData = data.data.countries.visitedCountries
    const visitedCountryCodes = []
    const visitedCountryNames = []
    
    setCountries(countries)

    if (authorised) {
      setUser({username, userId, token, age: Number(age), isAuth: true})
      visitedCountriesData.forEach(countryId => {
        const country = countries.find(cntry => Number(cntry.id) === countryId)
        visitedCountryCodes.push(country.code)
        visitedCountryNames.push(country.name)
        return
      })

      setVisitedCountries({codes: visitedCountryCodes, names: visitedCountryNames})
          
    } else {
      setUser({ id: '', username: 'Guest', age: '', token: '', isAuth: false})
      const countryCodes = localStorage.getItem('countries')
      const countryNames = localStorage.getItem('countryNames')
      if (countryCodes) {
        setVisitedCountries({codes: countryCodes.split(','), names: countryNames.split(',')})
      }
    }
  }

  const loginHandler = async (e, username, password) => {
    e.preventDefault()
    const loginResult = await API.login({username, password})
      if (loginResult.isAuth) {
          const {userId, username, age, token, isAuth} = loginResult
          setUser({userId, username, age, token, isAuth})
          loginMenuToggle()
          getInitialData(token)
          clearGuestVisitedCountries()
      }
  }

  const logOutHandler = (e) => {
    e.preventDefault()
    setUser({userId: '', userName: 'Guest', age: '', token: '', isAuth: false})
    setVisitedCountries({codes: [], names: []})
    loginMenuToggle()
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userAge');
}
  
  const handleHover = (e) => {
    if (e.target && e.target.attributes && e.target.attributes.name && e.target.attributes.name.value) {
      setCountryNamePopUpValue(e.target.attributes.name.value)
      setCountryNamePopUp(true)
    } else {
      setCountryNamePopUp(false)
    }
  }

  const handleMousePositionChange = (e) => {
    setMousePosition({x: e.clientX, y: e.clientY})
  }

  const handleMapClick = (e) => {
    const country = countries.find(cntry => cntry.code === e.target.id)
    if (e.target && e.target.attributes && e.target.attributes.name && e.target.attributes.name.value) {
      setSelectedCountry(country)
      setSidebarVisible(true)
    } 
  }

  const menuToggle = () => {
    setMenuVisibility(!menuVisible)
    setSidebarVisible(false)
    setLoginMenuVisibility(false)

  }

  const loginMenuToggle = () => {
    setLoginMenuVisibility(!loginMenuVisible)
  }

  const handleCountryListClick = (countryName) => {
    const country = countries.find(country => country.name === countryName)
    setSelectedCountry(country)
    setSidebarVisible(true)
  }

  const clearGuestVisitedCountries = () => {
    localStorage.removeItem('countries')
    localStorage.removeItem('countryNames')
    setVisitedCountries({codes: [], names: []})
  }

  const addOrRemoveCountryButtonClick = (countryName) => {
    const country = countries.find(country => country.name === countryName)
    if (user.isAuth) {
      API.addUserCountry(country.id)
      if (!visitedCountries.codes.includes(country.code)) {
        setVisitedCountries({codes: [...visitedCountries.codes, country.code], names: [...visitedCountries.names, country.name]})
      } else {
        const filteredCountryCodes = visitedCountries.codes.filter(cntry => cntry !== country.code)
        const filteredCountryNames = visitedCountries.names.filter(cntry => cntry !== country.name)
        setVisitedCountries({codes: filteredCountryCodes, names: filteredCountryNames})
      }
    } else {
      if (!visitedCountries.codes.includes(country.code)) {
        if (visitedCountries.codes.length > 0) {
          setVisitedCountries({codes: [...visitedCountries.codes, country.code], names: [...visitedCountries.names, country.name]})
          localStorage.setItem('countries', [...visitedCountries.codes, country.code])
          localStorage.setItem('countryNames', [...visitedCountries.names, country.name])
        } else {
          setVisitedCountries({codes: [country.code], names: [country.name]})
          localStorage.setItem('countries', country.code)
          localStorage.setItem('countryNames', country.name)
        }
      } else {
        const filteredCountryCodes = visitedCountries.codes.filter(cntry => cntry !== country.code)
        const filteredCountryNames = visitedCountries.names.filter(cntry => cntry !== country.name)
        setVisitedCountries({codes: filteredCountryCodes, names: filteredCountryNames})
        localStorage.setItem('countries', filteredCountryCodes)
        localStorage.setItem('countryNames', filteredCountryNames)
      }
    }
  }

  const addToWishList = (countryId) => {
    if (!wishlist.includes(countryId)) {
      if (wishlist.length > 0) {
        setWishlist([...wishlist, countryId])
        localStorage.setItem('wishList', [...wishlist, countryId])
      } else {
        setWishlist([countryId])
        localStorage.setItem('wishList', countryId)
      }
      // API.addCountryToWishList(this.state.userID, countryId)
    } else {
      const filteredCountries = wishlist.filter(cntry => cntry !== countryId)
      setWishlist(filteredCountries)
      localStorage.setItem('wishList', filteredCountries)
      // API.addCountryToWishList(this.state.userID, countryId)
    }
  }

  const closeSideBar = () => {
    // setSelectedCountry("")
    setSidebarVisible(false)
    setActiveIndex(0)
  }

  const handleSideBarAccordionClick = (e, titleProps) => {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index
    setActiveIndex(newIndex)
  }

  // setUser = (user) => {
  //   const countriesArray = user.user_countries && user.user_countries.map(country => country.country)
  //   const visited = user.user_countries && countriesArray.map(country => country.code)
  //   const visitedByName = user.user_countries && countriesArray.map(country => country.name)
  //   const wishList = user.wishlists && user.wishlists.map(country => country.country.id)
  //   console.log(user)
  //   this.setState({
  //     userID: user.id,
  //     username: user.name,
  //     userAge: user.age,
  //     user_image_url: user.image_url,
  //     userBadges: user.badges,
  //     visitedCountries: visited,
  //     visitedCountriesByName: visitedByName,
  //     wishlist: wishList
  //   })
  //   this.props.history.goBack()
  // }

  const updateAge = (age) => {
    if (user.username === 'Guest') {
      const updatedUser = {...user}
      updatedUser.age = age
      return setUser(updatedUser)
    }
    return
  }

  const handleCountryFilter = (value) => {
    setCountryFilter(value)
  }

  return (
    <>
      <div className='site'>
        <div className="App" >
          <NavBar
            clearGuestVisitedCountries={clearGuestVisitedCountries}
            loginHandler={loginHandler}
            loginMenuToggle={loginMenuToggle}
            loginMenuVisible={loginMenuVisible}
            logOutHandler={logOutHandler}
            menuToggle={menuToggle}
            setSignupVisibility={setSignupVisibility}
            setUser={setUser}
            user={user}
          />
          <SecondaryNav />
          <div className='site-body'>
              {page === 'home' && <HomePage
                user={user.id}
                countries={countries}
                handleMapClick={handleMapClick}
                visitedCountries={visitedCountries.codes}
                selectedCountry={selectedCountry}
                sidebarVisible={sidebarVisible}
                closeSideBar={closeSideBar}
                addOrRemoveCountry={addOrRemoveCountryButtonClick}
                activeIndex={activeIndex}
                handleSideBarAccordionClick={handleSideBarAccordionClick}
                countryNamePopUp={countryNamePopUp}
                countryNamePopUpValue={countryNamePopUpValue}
                mouseXPosition={mousePosition.x}
                mouseYPosition={mousePosition.y}
                mousePosition={handleMousePositionChange}
                handleHover={handleHover}
                addToWishList={addToWishList}
                wishlist={wishlist}
                page={page}
              />}
            {page === 'listView' &&
              <AddCountry
                user={user.id}
                setUser={setUser}
                countries={countries}
                handleCountryListClick={handleCountryListClick}
                visitedCountries={visitedCountries.codes}
                selectedCountry={selectedCountry}
                sidebarVisible={sidebarVisible}
                closeSideBar={closeSideBar}
                addOrRemoveCountry={addOrRemoveCountryButtonClick}
                activeIndex={activeIndex}
                handleSideBarAccordionClick={handleSideBarAccordionClick}
                filter={countryFilter}
                setFilter={handleCountryFilter}
                addToWishList={addToWishList}
                wishlist={wishlist}
                page={page}
              />}
            
            {page === 'profile' &&
              <Profile
                countries={countries}
                handleMapClick={handleMapClick}
                visitedCountries={visitedCountries.codes}
                visitedCountriesByName={visitedCountries.names}
                user={user}
                updateAge={updateAge}
                wishlist={wishlist}
                page={page}
              />}

            {page === 'recommendations' &&
              <Recommendations
                countries={countries}
                wishlist={wishlist}
                page={page}
              />}
            {page === 'privacyPolicy' &&
              <PrivacyPolicy
              page={page}
              />}
              <SideMenu 
                visible={menuVisible}
                menuToggle={menuToggle}
              />
              <Signup
                page={page}
                visible={signupVisible}
                setSignupVisibility={setSignupVisibility}
              />

          </div>
        </div>

      </div>

      {/* <Footer /> */}
    </>
  );
}

export default App;
