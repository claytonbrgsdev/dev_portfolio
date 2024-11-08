// // src/redux/slices/authSlice.ts

// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import {
//   signInWithEmailAndPassword,
//   signOut as firebaseSignOut,
// } from 'firebase/auth';
// import { User } from 'docTypes/user';
// import { RootState } from '@redux/store';
// import { doc, getDoc, setDoc } from 'firebase/firestore';
// import { db, auth } from '@services/firebase'; // Import auth from firebase.ts
// import { setCurrency } from './currencySlice'; // Import setCurrency action

// // Define the structure of the authentication state
// type AuthState = {
//   authenticated: boolean;
//   currentUser: User | null;
//   loading: boolean;
//   error: string | null;
// };

// // Initialize the authentication state
// const initialState: AuthState = {
//   authenticated: false,
//   currentUser: null,
//   loading: false,
//   error: null,
// };

// // -------------------- Thunks --------------------

// // Sign In Thunk
// export const signIn = createAsyncThunk<
//   User,
//   { email: string; password: string },
//   { state: RootState; rejectValue: string }
// >(
//   'auth/signIn',
//   async ({ email, password }, { rejectWithValue, dispatch }) => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );

//       // Ensure the user's email is verified
//       if (!userCredential.user.emailVerified) {
//         throw new Error('Please verify your email before signing in.');
//       }

//       const uid = userCredential.user.uid;
//       const userDocRef = doc(db, 'users', uid);
//       const userSnapshot = await getDoc(userDocRef);

//       if (userSnapshot.exists()) {
//         const userData = userSnapshot.data() as User;
//         const user: User = { ...userData, uid };

//         // Dispatch setCurrency based on user's country
//         if (user.country?.toLowerCase() === 'brazil') {
//           dispatch(setCurrency('BRL'));
//         } else {
//           dispatch(setCurrency('USD'));
//         }

//         return user;
//       } else {
//         throw new Error('User details not found.');
//       }
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         if ('code' in error) {
//           return rejectWithValue((error as { code: string }).code);
//         } else {
//           return rejectWithValue(error.message);
//         }
//       } else {
//         return rejectWithValue('An unknown error occurred during sign in.');
//       }
//     }
//   }
// );

// // Fetch User Details Thunk
// export const fetchUserDetails = createAsyncThunk<
//   User,
//   string,
//   { state: RootState; rejectValue: string }
// >(
//   'auth/fetchUserDetails',
//   async (uid, { rejectWithValue, dispatch }) => {
//     try {
//       const userDocRef = doc(db, 'users', uid);
//       const userSnapshot = await getDoc(userDocRef);

//       if (userSnapshot.exists()) {
//         const userData = userSnapshot.data();
//         if (userData) {
//           const user: User = { ...(userData as User), uid };

//           // Dispatch setCurrency based on user's country
//           if (user.country?.toLowerCase() === 'brazil') {
//             dispatch(setCurrency('BRL'));
//           } else {
//             dispatch(setCurrency('USD'));
//           }

//           return user;
//         } else {
//           throw new Error('Invalid user data format.');
//         }
//       } else {
//         throw new Error('User details not found.');
//       }
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         return rejectWithValue(error.message);
//       } else {
//         return rejectWithValue(
//           'An unknown error occurred while fetching user details.'
//         );
//       }
//     }
//   }
// );

// // Sign Out Thunk
// export const signOutUser = createAsyncThunk<void, void, { state: RootState; rejectValue: string }>(
//   'auth/signOut',
//   async (_, { rejectWithValue }) => {
//     try {
//       await firebaseSignOut(auth);
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         return rejectWithValue(error.message);
//       }
//       return rejectWithValue('An unknown error occurred during sign out.');
//     }
//   }
// );

// // Update User Details Thunk
// export const updateUserDetails = createAsyncThunk<
//   User,
//   User,
//   { state: RootState; rejectValue: string }
// >(
//   'user/updateUserDetails',
//   async (userData, { rejectWithValue }) => {
//     const user = auth.currentUser;
//     if (user) {
//       try {
//         await setDoc(doc(db, 'users', user.uid), userData, { merge: true });
//         return userData;
//       } catch (error: unknown) {
//         if (error instanceof Error) {
//           return rejectWithValue(error.message);
//         } else {
//           return rejectWithValue('An unknown error occurred while updating user details.');
//         }
//       }
//     } else {
//       return rejectWithValue('No user found');
//     }
//   }
// );

// // Selectors
// export const selectIsAdmin = (state: RootState) => {
//   return state.auth.currentUser?.isAdmin || false;
// };

// // -------------------- Slice --------------------

// export const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     // Update user with partial data
//     updateUser: (state, action: PayloadAction<Partial<User>>) => {
//       if (state.currentUser && action.payload) {
//         state.currentUser = {
//           ...state.currentUser,
//           ...action.payload,
//         };
//       }
//     },
//     // Authenticate user
//     authenticateUser: (state) => {
//       state.authenticated = true;
//     },
//     // Set user directly
//     setUser: (state, action: PayloadAction<User>) => {
//       state.currentUser = action.payload;
//     },
//     // Sign out user
//     signOut: (state) => {
//       state.authenticated = false;
//       state.currentUser = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Handle signIn Thunk
//       .addCase(signIn.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(signIn.fulfilled, (state, action: PayloadAction<User>) => {
//         state.authenticated = true;
//         state.currentUser = action.payload;
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(signIn.rejected, (state, action) => {
//         state.loading = false;
//         state.authenticated = false;
//         state.currentUser = null;
//         state.error =
//           typeof action.payload === 'string'
//             ? action.payload
//             : 'An unknown error occurred during sign in.';
//       })

//       // Handle fetchUserDetails Thunk
//       .addCase(fetchUserDetails.fulfilled, (state, action: PayloadAction<User>) => {
//         state.currentUser = action.payload;
//         state.authenticated = true;
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(fetchUserDetails.rejected, (state, action) => {
//         state.error =
//           typeof action.payload === 'string'
//             ? action.payload
//             : 'An unknown error occurred while fetching user details.';
//       })

//       // Handle signOutUser Thunk
//       .addCase(signOutUser.fulfilled, (state) => {
//         state.authenticated = false;
//         state.currentUser = null;
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(signOutUser.rejected, (state, action) => {
//         state.error =
//           typeof action.payload === 'string'
//             ? action.payload
//             : 'An unknown error occurred during sign out.';
//       })

//       // Handle updateUserDetails Thunk
//       .addCase(updateUserDetails.fulfilled, (state, action: PayloadAction<User>) => {
//         state.currentUser = action.payload;
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(updateUserDetails.rejected, (state, action) => {
//         state.error =
//           typeof action.payload === 'string'
//             ? action.payload
//             : 'An unknown error occurred while updating user details.';
//       });
//   },
// });

// // Export actions
// export const {
//   signOut,
//   updateUser,
//   setUser,
//   authenticateUser,
// } = authSlice.actions;

// // Export reducer
// export default authSlice.reducer;

// // Export selector
// export const selectCurrentUser = (state: RootState) => state.auth.currentUser;