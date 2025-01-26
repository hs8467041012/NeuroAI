import React, { useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { doCreateUserWithEmailAndPassword } from '../fire/auth'
import './register.css'

const Register = () => {
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const { userLoggedIn } = useAuth()

    const onSubmit = async (e) => {
        e.preventDefault()
        if(!isRegistering) {
            setIsRegistering(true)
            if (password !== confirmPassword) {
                setErrorMessage("Passwords don't match")
                setIsRegistering(false)
                return
            }
            try {
                await doCreateUserWithEmailAndPassword(email, password)
                // Here you would typically save the additional user info to your database
                // For example: await saveUserInfo(name, mobileNumber, age, gender)
                navigate('/dashboard')
            } catch (error) {
                setErrorMessage(error.message)
                setIsRegistering(false)
            }
        }
    }

    return (
        <>
            {userLoggedIn && (<Navigate to={'/dashboard'} replace={true} />)}

            <main className="register-container">
                <div className="register-card">
                    <div className="register-header">
                        <h3 className="register-title">Create a New Account</h3>
                    </div>
                    <form onSubmit={onSubmit} className="register-form">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                autoComplete='email'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                autoComplete='new-password'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                autoComplete='off'
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mobileNumber">Mobile Number</label>
                            <input
                                id="mobileNumber"
                                type="tel"
                                required
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="age">Age</label>
                            <input
                                id="age"
                                type="number"
                                required
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender">Gender</label>
                            <select
                                id="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {errorMessage && (
                            <span className='error-message'>{errorMessage}</span>
                        )}

                        <button
                            type="submit"
                            disabled={isRegistering}
                            className={`submit-button ${isRegistering ? 'disabled' : ''}`}
                        >
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </button>
                        <div className="login-link">
                            Already have an account? {' '}
                            <Link to={'/login'}>Continue</Link>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Register

