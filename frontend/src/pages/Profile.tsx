import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState, type FormEvent } from 'react'
import { type ProfileData } from '@/shared/types'

const Profile = () => {
  const { loggedUser, updateAccount, deleteAccount, getCurrentProfile } = useAuth()
  const [formData, setFormData] = useState<ProfileData | null>(null)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const styles = {
    flexCenter: 'flex flex-col items-center justify-center',
    input: 'border-1 border-violet-700 p-1 w-[275px]',
    button: 'cursor-pointer border-2 p-1 border-emerald-600 hover:text-white hover:bg-emerald-600',
  }

  useEffect(() => {
    getCurrentProfile()
  }, [])

  useEffect(() => {
    setFormData(loggedUser)
  }, [loggedUser])

  if (!formData)
    return (
      <div className="flex justify-center items-center text-2xl relative h-[50vh]">Loading...</div>
    )

  const { id, username, email, avatar_url, friends } = formData || {}

  const handleUpdateAccount = async (e: FormEvent) => {
    e.preventDefault()
    updateAccount(formData)
  }

  const handleDeleteAccount = (e: FormEvent) => {
    e.preventDefault()
    deleteAccount(formData.id)
  }

  return (
    <>
      <div
        className={`${styles.flexCenter} bg-amber-50 border-1 rounded-lg p-6 w-full max-w-[500px] max-h-[80vh] overflow-y-auto shadow-ld mx-auto `}
      >
        <form className={`${styles.flexCenter} flex-col gap-2 text-sm w-full`}>
          <div className={`${styles.flexCenter} gap-3`}>
            {/* left side */}
            <div>
              <div>
                {avatar_url}
                <img
                  src={avatar_url ? avatar_url : 'https://avatar.iran.liara.run/public/13'}
                  alt="profile-image"
                  className="w-[175px] h-[175px] object-cover rounded-full border-2 border-emerald-600"
                />
              </div>
            </div>
            {/* right side */}
            <div className="flex flex-col gap-1 text-sm">
              <div className="flex flex-col">
                <span className="font-bold">id:</span>
                <div>{id}</div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold">username:</span>
                <input
                  type="text"
                  defaultValue={username}
                  className={styles.input}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev!,
                      username: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold">email:</span>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="email"
                  defaultValue={email}
                  className={styles.input}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold">Friend List:</span>
                <div> {friends ? friends : 'no friends yet :('}</div>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              disabled={isEditing}
              className="cursor-pointer border-2 p-1 border-emerald-600 hover:text-white hover:bg-emerald-600"
              onClick={handleUpdateAccount}
            >
              save changes
            </button>
            <button
              type="submit"
              disabled={isEditing}
              className="cursor-pointer border-2 p-1 border-red-600 hover:text-white hover:bg-red-600"
              onClick={handleDeleteAccount}
            >
              delete account
            </button>
          </div>
        </form>
      </div>
      {/* Data about completed habits and completed activitites */}
      <div>
        <h2 className="text-2xl text-center mt-6 mb-2 font-extrabold">Statistics</h2>
        <div className={`${styles.flexCenter} md:flex-row gap-6`}>
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
