import React , {useState, useEffect} from 'react'
import './Logout.css'
import { signOut } from 'firebase/auth';
import { auth } from '../../Firebase/FirebaseConfig';
import { useHistory } from 'react-router-dom';

export default function Logout() {

    const history = useHistory();

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (checked) {
            signOut(auth).then(() => {

                setTimeout(() => {
                    history.push('/')
            }, 1000);

            }).catch((error) => {

            })
        }
    }, [checked]);

    const handleChange = event => {
        setChecked(event.target.checked);
    }

  return (

    <div>
    <label className='switch'>
      <input type='checkbox' checked={checked} onChange={handleChange} />
      <span className='slider round'></span>
    </label>
    <button
      className='logout-button'
      onClick={() => setChecked(true)}
      disabled={!checked}
    >
      Se déconnecter
    </button>
  </div>
  )
}
