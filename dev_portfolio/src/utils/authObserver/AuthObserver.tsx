// AuthObserver.tsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { fetchUserDetails, signOut } from '../../redux/slices/authSlice';
import { AppDispatch } from '../../redux/store';
import { auth } from '../../services/firebase';

const AuthObserver = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(fetchUserDetails(user.uid));
      } else {
        dispatch(signOut());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null;
};

export default AuthObserver;