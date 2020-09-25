import React, { useState } from 'react'
import { required, length, email } from '../../Util/Validators';
import API from '../../Helpers/API'
// import { Redirect } from 'react-router-dom';
// import { Link } from 'react-router-dom';



const Signup = ({visible, setSignupVisibility}) => {

    const [signupForm, setSignupForm] = useState({
        username: {
            value: '',
            confirmation: '',
            valid: false,
            // touched: false,
            validators: [required]
        },
        email: {
            value: '',
            valid: false,
            // touched: false,
            validators: [required, email]
        },
        password: {
            value: '',
            valid: false,
            // touched: false,
            validators: [required, length({ min: 5 })]
        },
        passwordConfirmation: {
            value: '',
            valid: false,
            // touched: false,
            validators: [required]
        },
        dob: {
            value: '',
            valid: false,
            // touched: false,
            validators: [required]
        },
        formIsValid: false
    })
    
    
    const [signupErrors, setSignupErrors] = useState([])

    const inputChangeHandler = (input) => {
        const {name, value} = input.target
        const updatedSignupForm = {...signupForm}
        let isValid = true;
        let formIsValid = false;
        
        // if (name === 'dob') console.log(new Date(value).getFullYear())
        for (const validator of signupForm[name].validators) {
            isValid = isValid && validator(value);
        }

        updatedSignupForm[name] = {
            value,
            valid: false,
            validators: [...signupForm[name].validators]
        }
        
        const {username, dob, email, password, passwordConfirmation} = updatedSignupForm
        if (isValid) updatedSignupForm[name].valid = true
        if (password.value !== passwordConfirmation.value) updatedSignupForm.passwordConfirmation.valid = false
        if (username.valid && dob.valid && email.valid && password.valid && passwordConfirmation.valid) formIsValid = true
        
        updatedSignupForm.formIsValid = formIsValid
        
        return setSignupForm(updatedSignupForm)
      };
    
    //   inputBlurHandler = input => {
    //     this.setState(prevState => {
    //       return {
    //         signupForm: {
    //           ...prevState.signupForm,
    //           [input]: {
    //             ...prevState.signupForm[input],
    //             touched: true
    //           }
    //         }
    //       };
    //     });
    //   };

      const submitHandler = async e => {
        e.preventDefault()
        const submitData = {
            username: signupForm.username.value,
            dob: signupForm.dob.value,
            email: signupForm.email.value,
            password: signupForm.password.value,
            passwordConfirmation: signupForm.passwordConfirmation.value,
        }
        const response = await API.signup({
            submitData
        })

        if (response && response.error) {
            const mappedErrors = response.error.map(error => {
                return {code: error.code, message: error.message}
            })
          return setSignupErrors(mappedErrors)
        }
      }

    //   closeMobileMenu = () => {
    //     this.props.loginToggle()
    //   }
      
    //   render() {
    //       const { loginError, signup, user, hideRegisterButton } = this.props
    //       if (user && user.userId) {
    //         return <Redirect to={"/"} />
    //       }

        const errorCodes = signupErrors.length > 0 ? signupErrors.map(error => error.code) : []
        return (
            <>
              <div className={`signup__form-container ${visible ? 'visible' : ''}`}>
                <div className='signup__form'>
                    <h3>Create Account</h3>
                    <img 
                        src="/close-cross-black.png" 
                        onMouseOver={e => (e.currentTarget.src = '/close-cross-orange.png')} 
                        onMouseOut={e => (e.currentTarget.src = '/close-cross-black.png')}
                        alt="" 
                        onClick={() => setSignupVisibility(false)}
                    />
                  <div className='signup__form-components'>
                    <form className='' //{`${loginError ? 'error' : ''}`}
                        onSubmit={e => submitHandler(e)}
                    >
                        <div className='signup__form-field'>
                            <label>USERNAME</label>
                            <input
                                id="username"
                                name="username"
                                label="username"
                                type="text"
                                placeholder="Choose a username"
                                onChange={inputChangeHandler}
                                value={signupForm.username.value}
                                required
                                // onBlur={inputBlurHandler.bind(this, 'username')}
                                // touched={signupForm['username'].touched}
                            />
                        <p className='signup__form-error'>{errorCodes.includes(423) && 'Username taken'}</p>
                        </div>
                        <div className='signup__form-field'>
                            <label>DATE OF BIRTH (to calculate your travel deficit) </label>
                            <input
                                id="dob"
                                name="dob"
                                label="date of birth"
                                type="date"
                                onChange={inputChangeHandler}
                                value={signupForm.dob.value}
                                required
                                // onBlur={inputBlurHandler.bind(this, 'username')}
                                // touched={signupForm['username'].touched}
                            />
                        <p className='signup__form-error'></p>
                        </div>
                        <div className='signup__form-field'>
                            <label>EMAIL</label>
                            <input
                                id="email"
                                name="email"
                                label='Your Email'
                                type="email"
                                placeholder='Enter your email'
                                onChange={inputChangeHandler}
                                value={signupForm.email.value}
                                required
                                // onBlur={inputBlurHandler.bind(this, 'email')}
                                // touched={signup ? signupForm['email'].touched : null}
                            />
                            <p className='signup__form-error'>{errorCodes.includes(422) && 'Email address already in use'}</p>
                        </div>
                        <div className='signup__form-field'>
                            <label>PASSWORD</label>
                            <input
                                id="password"
                                name="password"
                                label='Password'
                                type="password"
                                placeholder='Choose your password'
                                onChange={inputChangeHandler}
                                value={signupForm.password.value}
                                required
                                // onBlur={inputBlurHandler.bind(this, 'password')}
                                // touched={signup ? signupForm['password'].touched : null}
                            />
                        </div>

                        <div className='signup__form-field'>
                            <label>CONFIRM PASSWORD</label>
                            <input
                                id="passwordConfirmation"
                                name="passwordConfirmation"
                                label="Confirm Password"
                                type="password"
                                placeholder="Confirm your password"
                                onChange={inputChangeHandler}
                                value={signupForm.passwordConfirmation.value}
                                required
                                // onBlur={inputBlurHandler.bind(this, 'passwordConfirmation')}
                                // touched={signupForm['passwordConfirmation'].touched}
                            />
                            <p className='signup__form-error'>{errorCodes.includes(425) && 'Password too short (8 characters minimum)'}</p>
                            <p className='signup__form-error'>{errorCodes.includes(425) && 'Passwords do not match'}</p>
                        </div>
                        <div className='submit-button'>
                          {/* <button disabled={!signupForm.formIsValid} className={`login_logout ${(signupForm['password'].value.length < 1 || signupForm.email.value.length < 1) ? 'disabled' : 'active'}`}>Signup</button> */}
                          <button className='login_logout' >Signup</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
            </>
        )
      }

export default Signup