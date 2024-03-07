import React, { useEffect, useState } from 'react'
import { Sidebar } from 'flowbite-react'
import { FaUserTie } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { signOutSuccess } from '../redux/user/userSlice';
import { HiDocumentText } from "react-icons/hi";

const DashSidebar = () => {

  const dispatch = useDispatch()
  const location = useLocation()
  const [tab, setTab] = useState("")
  const {currentUser} = useSelector(state => state.user)

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    console.log(tabFromUrl)
    
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search])

  const handleSignOut = async () => {
    try {
      const res = await axios.post('http://localhost:3000/user/signout')
      if (res.status !== 200) {
        console.log(res.data)
      } else {
        dispatch(signOutSuccess())
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Sidebar className=' w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup className=' flex flex-col gap-1'>
          <Link to={'/dashboard?tab=profile'}>
            <Sidebar.Item active={tab === 'profile'} icon={FaUserTie} label={(currentUser.isAdmin || currentUser.rest.isAdmin) ? "Admin" : "User"} labelColor="dark" as='p'>
              Profile
            </Sidebar.Item>
          </Link>
          {
            (currentUser.isAdmin || currentUser.rest.isAdmin) && (
              <Link to={'/dashboard?tab=posts'}>
                <Sidebar.Item active={tab==="posts"} icon={HiDocumentText} as='div'>Posts</Sidebar.Item>
              </Link>
            )
          }
          <Sidebar.Item icon={FaSignOutAlt} className=' cursor-pointer' as='p' onClick={handleSignOut}>
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        
      </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar