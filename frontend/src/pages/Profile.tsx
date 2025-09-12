import { ACCESS_TOKEN } from '@/constants'
import { useAuth } from '@/hooks/useAuth'
import { useEffect } from 'react'

const Profile = () => {
  const { getCurrentProfile, loggedUser } = useAuth()
  useEffect(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN)
    if (accessToken) getCurrentProfile(accessToken)
  }, [])

  if (!loggedUser) return <div>Loading...</div>
  const { id, username, email, avatar_url, friends } = loggedUser

  return (
    <div>
      <div>ID: {id}</div>
      <div>Username: {username}</div>
      <div>Email: {email}</div>
      <div>Pic: {avatar_url}</div>
      <div>Friend List: {friends}</div>
    </div>
  )
}

export default Profile
