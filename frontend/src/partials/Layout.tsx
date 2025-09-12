import { Outlet } from 'react-router'
import Header from './Header'
import Footer from './Footer'
import { useState } from 'react'
import { SelectedPage } from '@/shared/types'
import { useAuth } from '@/hooks/useAuth'

export default function Layout() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(SelectedPage.activities)
  const { isAuthorized } = useAuth()

  return (
    <div className="flex flex-col min-h-screen">
      {isAuthorized && <Header setSelectedPage={setSelectedPage} selectedPage={selectedPage} />}
      <main className="w-5/6 flex-grow mx-auto p-2 ">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
