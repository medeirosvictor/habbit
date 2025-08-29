import { Outlet } from 'react-router'
import Header from './Header'
import Footer from './Footer'
import { useState } from 'react'
import { SelectedPage } from '@/shared/types'

export default function Layout() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(SelectedPage.Activities)

  return (
    <div className="flex flex-col min-h-screen">
      <Header setSelectedPage={setSelectedPage} selectedPage={selectedPage} />
      <main className="w-5/6 flex-grow mx-auto p-2">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
