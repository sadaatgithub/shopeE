import React, { useEffect, useState } from 'react'

import {getAuth,onAuthStateChanged,User} from 'firebase/auth'

const auth = getAuth();

export function useAuthentication() {
    const [user,setUser] = useState()

    useEffect(() =>{
        const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, (user) =>{
            if(user) {
                setUser(user)
            } else{
                setUser(undefined)
            }
        })
        return unsubscribeFromAuthStateChanged;

    },[])

    return {
        user
    }
}