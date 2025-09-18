import { ACCESS_TOKEN } from '@/constants'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'
import { type ProfileData } from '@/shared/types'

const Profile = () => {
  const { getCurrentProfile, loggedUser } = useAuth()
  const [formData, setFormData] = useState<ProfileData | null>(null)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const flexCenter = 'flex items-center justify-center'

  useEffect(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN)
    if (accessToken) getCurrentProfile(accessToken)
  }, [])

  if (!loggedUser) return <div>Loading...</div>
  const { id, username, email, avatar_url, friends } = loggedUser

  return (
    <>
      <div
        className={`${flexCenter} bg-amber-50 border-1 rounded-lg p-6 w-full max-w-[500px] max-h-[80vh] overflow-y-auto shadow-ld mx-auto `}
      >
        <form className={`${flexCenter} flex-col gap-2`}>
          <div className="flex gap-3">
            {/* left side */}
            <div>
              <div>
                {avatar_url}
                <img
                  src={avatar_url ? avatar_url : 'https://avatar.iran.liara.run/public/13'}
                  alt="profile-image"
                  className="w-[200px] h-[200px] object-cover rounded-full border-2 border-emerald-600"
                />
              </div>
            </div>
            {/* right side */}
            <div>
              <div>
                <span className="font-bold">ID:</span> {id}
              </div>
              <div>
                <span className="font-bold">Username:</span> {username}
              </div>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="email"
                defaultValue={email}
                className="border-1 border-violet-700 p-1"
              />
              <div>Friend List: {friends}</div>
            </div>
          </div>
          <button
            type="submit"
            disabled={isEditing}
            className="cursor-pointer border-2 p-1 border-emerald-600 hover:text-white hover:bg-emerald-600"
          >
            save changes
          </button>
        </form>
      </div>
      {/* Data about completed habits and completed activitites */}
      <div>
        <h2 className="text-2xl text-center mt-6 mb-2 font-extrabold">Statistics</h2>
        <div className={`${flexCenter} gap-6`}>
          <div className="bg-emerald-100 p-4 rounded-lg shadow-md w-[150px] text-center">
            <h3 className="font-bold uppercase ">Working Out</h3>
            <ul className="text-left text-sm">
              <li>Current: 5 days</li>
              <li>Longest: 12 days</li>
            </ul>
          </div>
          <div className="bg-emerald-100 p-4 rounded-lg shadow-md w-[150px] text-center">
            <h3 className="font-bold uppercase ">Meditation</h3>
            <ul className="text-left text-sm">
              <li>Current: 3 days</li>
              <li>Longest: 10 days</li>
            </ul>
          </div>
          <div className="bg-emerald-100 p-4 rounded-lg shadow-md w-[150px] text-center">
            <h3 className="text-lg font-semibold mb-2">Completed Activities</h3>
            <p className="text-3xl font-bold">128</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
