import React, { useState, useEffect } from 'react';
import './Welcome.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, user } from '../Firebase/FirebaseConfig';
import { useHistory } from 'react-router-dom';
import { getDoc } from 'firebase/firestore';
import ClipLoader from "react-spinners/ClipLoader";


import { storage } from '../Firebase/FirebaseConfig';
import { ref, getDownloadURL, uploadBytesResumable } from '@firebase/storage';
import { updateDoc } from 'firebase/firestore';
import { deleteObject } from '@firebase/storage';




export default function Welcome() {
  const history = useHistory();

  const [userSession, setUserSession] = useState(null);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged retourne une fonction de nettoyage, qui doit être appelée lorsqu'on démonte le composant
    const unsubscribe = onAuthStateChanged(auth, user => {
      // Si l'utilisateur existe, met à jour le state `userSession` avec les données de l'utilisateur. Sinon, redirige l'utilisateur vers la page de connexion.
      user ? setUserSession(user) : history.push('/login');
    });

    // Si l'utilisateur existe, récupère les données de l'utilisateur depuis Firestore.
    if (!!userSession) {
      const colRef = user(userSession.uid);

      getDoc(colRef)
        .then(snapshot => {
          if (snapshot.exists()) {
            const docData = snapshot.data();
            // Met à jour le state `userData` avec les données de l'utilisateur.
            setUserData({
              ...docData,
              photoName: docData.photoURL ? docData.photoURL.split('/').pop() : null // Récupère le nom du fichier de la photo de profil à partir de l'URL
            });
  
          }
          setLoading(false); // Définir loading à false une fois que les données de l'utilisateur sont récupérées.
        })
        .catch(error => {
          console.log(error);
          setLoading(false); // Définir loading à false en cas d'erreur.
        });
    }

    // Retourne la fonction de nettoyage, qui annule l'écouteur Firebase.
    return unsubscribe;
  }, [userSession, history]);




  // PHOTO PROFIL

  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);


  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    console.log(file);
    uploadFile(file);
  }

  const uploadFile = async (file) => {
    if (!file) return;
    const storageRef = ref(storage, `profiles/${userSession.uid}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
  
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => console.log(err),
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setImageUrl(url);
        console.log(url);
        updateProfilePhotoUrl(url); // Enregistre l'URL de la photo de profil dans Firestore
      }
    );
  };
  
  // Fonction pour enregistrer l'URL de la photo de profil dans Firestore
  const updateProfilePhotoUrl = (url) => {
    const userRef = user(userSession.uid);
    updateDoc(userRef, { photoURL: url })
      .then(() => {
        console.log("Photo de profil mise à jour avec succès");
      })
      .catch((error) => {
        console.log("Erreur lors de la mise à jour de la photo de profil:", error);
      });
  };

  // Fonction pour supprimer l'URL de la photo de profil dans Firestore et Storage
const deleteProfilePhoto = () => {
  const userRef = user(userSession.uid);
  const storageRef = ref(storage, `profiles/${userSession.uid}/${userData.photoName}`);

  // Supprime l'URL de la photo de profil dans Firestore
  updateDoc(userRef, { photoURL: null })
    .then(() => {
      console.log("Photo de profil supprimée avec succès");
      // Supprime la photo de profil dans Storage
      deleteObject(storageRef).then(() => {
        console.log("Fichier de la photo de profil supprimé avec succès");
      }).catch((error) => {
        console.log("Erreur lors de la suppression du fichier de la photo de profil:", error);
      });
    })
    .catch((error) => {
      console.log("Erreur lors de la suppression de la photo de profil:", error);
    });

  
};

  return (
    <div>
    <div id='Profil'>

      <div>
        <ClipLoader className='loader-connexion' loading={loading} />
        {!loading && (

          <div id='profil-picture'>
             {userData.photoURL && (
              <img src={userData.photoURL} alt="Profile" className='profile-pic' />
            )}
            <button data-text="Awesome" class="button">
              <span class="actual-text">&nbsp;{userData.pseudo}&nbsp;</span>
              <span class="hover-text" aria-hidden="true">
                &nbsp;{userData.pseudo}&nbsp;
              </span>
            </button>

        </div>
        )}
      </div>

      <div id='Information-Profil'>
      <table>
        <tr>
          <th>Name</th>
          <td className='user-td'>{userData.pseudo}</td>
        </tr>
        <tr>
          <th>Email</th>
          <td>{userData.email}</td>
        </tr>
        <tr>
          <th>Password</th>
          <td>********</td>
        </tr>
        <tr>
          <th>Profil Picture</th>
          <td><div id='profil-picture-set'>
          
          <form onSubmit={formHandler} className="modif-profil-picture" >
            <label for="file" className="file-upload">Choisir une image</label>
            <input type="file" className='input-profilPicture' id='file' />
            <button type='submit' class="buttonSavePicture">
              <span class="button_lg">
                <span class="button_sl"></span>
                <span class="button_text">Save Picture</span>
              </span>
            </button>
  
          </form>

          <button class="noselect" onClick={deleteProfilePhoto}>
            <span class="text-delete">Delete</span><span class="icon-delete">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z">
                </path>
              </svg>
            </span>
          </button>
          
          
        </div></td>
        </tr>
        <tr>
          <th>Number Phone</th>
          <td>0123456789</td>
        </tr>
        <tr>
          <th>Adresse de livraison</th>
          <td>123 rue de la Livraison 75001 Paris</td>
        </tr>
      </table>
      <div className='enregistrer-modif'>
        <button className='enregistrer-modif'> Enregistrer les modifications </button>
      </div>

      </div>
       
      


    </div>
    </div>
  );
}
