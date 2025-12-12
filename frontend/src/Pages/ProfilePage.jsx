import React from 'react'
import { useAuth } from '../store/useAuthStore';


const ProfilePage = () => {
    const { authUser } = useAuth();
  
  return (
    <div>
      ProfilePage
    </div>
  )
}

export default ProfilePage
