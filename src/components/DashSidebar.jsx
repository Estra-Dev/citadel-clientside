import React, { useEffect, useState } from 'react'
import { Sidebar } from 'flowbite-react'
import { FaUserTie } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';

const DashSidebar = () => {

  const location = useLocation()
  const [tab, setTab] = useState("")

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    console.log(tabFromUrl)
    
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search])

  return (
    <Sidebar className=' w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to={'/dashboard?tab=profile'}>
            <Sidebar.Item active={tab === 'profile'} icon={FaUserTie} label="User" labelColor="dark" as='p'>
              Profile
            </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item icon={FaSignOutAlt} className=' cursor-pointer' as='p'>
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar