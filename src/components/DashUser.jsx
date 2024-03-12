import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Button, Modal, Table } from 'flowbite-react'
import { BsExclamationCircle } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const DashUser = () => {

  const { currentUser } = useSelector(state => state.user)
  const [users, setUsers] = useState([])
  const [showMore, setShowMore] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [userIdToDelete, setuserIdToDelete] = useState('')

  console.log(users)
  const fetchUser = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/user/getusers`, {
        withCredentials: true
      })
      if (res.status === 200) {
        setUsers(res.data.users)
      }
      if (res.data.users.length < 9) {
        setShowMore(false)
      }
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (currentUser.isAdmin || currentUser.rest.isAdmin) {
      fetchUser()
    }
  }, [currentUser._id])

  const handleShowMore = async () => {
    const startIndex = users.length

    try {
      const res = await axios.get(`http://localhost:3000/user/getusers?startIndex=${startIndex}`)
      if (res.status === 200) {
        setUsers((prev) => [...prev, ...res.data.users])
        if (res.data.users.length < 2) {
          setShowMore(false)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  // const handleDeleteUser = async () => {
  //   setShowModal(false)
  //   try {
  //     const res = await axios.delete(`http://localhost:3000/user/deleteuser/${userIdToDelete}/${currentUser.rest._id || currentUser._id}`, {
  //       withCredentials: true
  //     })
  //     if (res.status !== 200) {
  //       console.log(res.response.data.message)
  //     } else {
  //       setUserPosts((prev) => prev.filter((post) => post._id !== postToDelete))
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <div className=' table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {(currentUser.isAdmin || currentUser.rest.isAdmin) && (users.length || users) > 0 ? (
        <>
          <Table hoverable className=' shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date Created</Table.HeadCell>
              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>Full Name</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell >Delete</Table.HeadCell>
            </Table.Head>
            {
              users.map((user) => (
                <Table.Body key={user._id} className=' divide-y'>
                  <Table.Row className=' bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                    <Table.Cell>
                      
                      <img src={user.photoUrl} alt={user.firstname + user.lastname} className=' w-10 h-10 bg-gray-500  rounded-full' />
                      
                    </Table.Cell>
                    <Table.Cell>
                      { user.firstname } {user.lastname}
                    </Table.Cell>
                    <Table.Cell>
                      { user.email }
                    </Table.Cell>
                    <Table.Cell>
                      { user.isAdmin ? (<FaCheckCircle className=' text-green-500' />) : (<ImCross className=' text-red-500' />)}
                    </Table.Cell>
                    <Table.Cell>
                      <span className=' font-medium text-red-500 hover:underline cursor-pointer' onClick={() => {
                        setShowModal(true)
                        setuserIdToDelete(user._id)
                      }}>Delete</span>
                    </Table.Cell>
                    
                  </Table.Row>
                </Table.Body>
              ))
            }
          </Table>
          {
            showMore && (
              <Button className=' w-full text-teal-500 self-center text-sm' color='white' onClick={handleShowMore}>Show More</Button>
            )
          }
        </>
      ) : (
        <div className="">
          <p>You have no user yet</p>
        </div>
      )}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size={'md'}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <BsExclamationCircle className=' h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className=' text-lg text-gray-500 mb-5 dark:text-gray-400'>Are you sure you want to delete this user?</h3>
            <div className=" flex justify-center gap-4">
              <Button color='failure'>Yes, I'm Sure</Button>
              <Button onClick={() => setShowModal(false)} color='gray'>No, Cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default DashUser