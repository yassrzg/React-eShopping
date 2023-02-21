import React, {useState} from 'react'
import './Signup.css'
import logo from './loulou.png'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {auth, user} from '../../Firebase/FirebaseConfig'
import { Link } from 'react-router-dom'
import { setDoc } from 'firebase/firestore'
import { useHistory } from'react-router-dom'


export default function Signup(props) {


  const history = useHistory();

  const data = {
    pseudo: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const [loginData, setLoginData] = useState(data);

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setLoginData({...loginData, [e.target.id]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const { email, password, pseudo } = loginData;
  
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        return setDoc(user(authUser.user.uid), {
          pseudo,
          email,
        });
      })
      .then(() => {
        history.push('/welcome');
      })
      .catch((error) => {
        setError(error);
        setLoginData({ ...loginData });
      });
  };
  
  const {pseudo, email, password, confirmPassword} = loginData;

  const btn = pseudo ==='' || email === '' || password === '' || password !== confirmPassword 
    ? 
  <button class="learn-more" disabled>
      <span class="circle" aria-hidden="true">
        <span class="icon arrow"></span>
      </span>
      <span class="button-text">SIGN UP</span>
    </button> 
    : 
    <button class="learn-more">
      <span class="circle" aria-hidden="true">
        <span class="icon arrow"></span>
      </span>
      <span class="button-text button-text2">SIGN UP</span>
    </button>


  // gestion erreurs

  const errorMsg = error !== '' && <span className='error-message'>{error.message}</span>;



  return (
    <div id="form">
      <div id="form-content">

        <div className='form-box-left'>
          <img src={logo} alt='logo' id="logo-login"/>
        </div>

        <div className='form-box-right'>

          <div className='form-content'>

            <h2>Inscription</h2>
            {errorMsg}
            <form onSubmit= {handleSubmit}>

              <div className='input-box'>
                <input onChange={handleChange} value={pseudo} type='text'  id='pseudo' required />
                <label htmlFor='pseudo' className='label-signup'>Prénom</label>
              </div>

              <div className='input-box'>
                <input onChange={handleChange} value={email} type='email'  id='email' required />
                <label htmlFor='email' className='label-signup'>Email</label>
              </div>

              <div className='input-box'>
                <input onChange={handleChange} value={password} type='password'  id='password' required />
                <label htmlFor='password' className='label-signup'>Mot de passe</label>
              </div>

              <div className='input-box'>
                <input onChange={handleChange} value={confirmPassword} type='password' id='confirmPassword' required />
                <label htmlFor='confirmPassword' className='label-signup'>Confirmer le mot de passe</label>
              </div>

              {btn}

            </form>
            <div className='linkContainer'>
              <Link className='link-login' to="/login">Déjà inscrit? Connectez-vous.</Link>
            </div>

          </div>

        </div>
      </div>
        
    </div>
  )
}
