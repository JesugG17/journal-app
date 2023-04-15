import { GoogleAuthProvider, 
         createUserWithEmailAndPassword, 
         signInWithEmailAndPassword, 
         signInWithPopup, 
         updateProfile } from 'firebase/auth';
         
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {

    try {

        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;

        const { displayName, email, photoURL, uid } = user;

        return {
            ok: true,
            displayName, email, photoURL, uid
        }
    } catch (error) {
        
        console.log({error});
        const errorMessage = error.message;
        
        return {
            ok: false,
            errorMessage
        }
    }
}

export const signInWithEmailPassword = async({ email, password, displayName }) => {
    try {
        
        const { user } = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = user;

        await updateProfile(FirebaseAuth.currentUser, { displayName });

        return {
            ok: true,
            uid,
            photoURL,
            displayName,
            email
        }

    } catch (error) {
        console.log({error});
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export const logInWithEmailAndPassword = async({email, password}) => {
    try {
        const { user } = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        
        const { displayName, photoURL, uid } = user;

        return {
            ok: true,
            displayName,
            photoURL,
            uid
        }

    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}