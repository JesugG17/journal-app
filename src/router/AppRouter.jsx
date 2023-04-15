import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { FirebaseAuth } from '../firebase/config'
import { Route, Routes } from 'react-router'

import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { JournalRoutes } from '../journal/routes/JournalRoutes'
import { CheckingAuth } from '../ui'
import { login, logout } from '../store/auth'


export const AppRouter = () => {

  const {status} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, (user) => {
      if (!user) return dispatch( logout() );
      const { email, displayName, photoURL, uid } = user;
      dispatch(login({ email, displayName, photoURL, uid }));
    });
  }, []);

  if ( status === 'checking' ) {
    return <CheckingAuth />
  }

  return (
    <Routes>

        {
          (status === 'not-authenticated')
          ? <Route path='/auth/*' element={ <AuthRoutes /> }/>
          : <Route path='/*' element={ <JournalRoutes /> } />
        }
        
    </Routes>
  )
}
