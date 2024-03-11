import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Button, Modal, Table } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { BsExclamationCircle } from "react-icons/bs";

const DashPosts = () => {

  const { currentUser } = useSelector(state => state.user)
  const [userPosts, setUserPosts] = useState([])
  const [showMore, setShowMore] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [postToDelete, setPostIdToDelete] = useState('')

  console.log(userPosts)
  const fetchPost = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/post/getposts?userId=${currentUser._id || currentUser.rest._id}`)
      if (res.status === 200) {
        setUserPosts(res.data.posts)
      }
      if (res.data.posts.length < 9) {
        setShowMore(false)
      }
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (currentUser.isAdmin || currentUser.rest.isAdmin) {
      fetchPost()
    }
  }, [currentUser._id])

  const handleShowMore = async () => {
    const startIndex = userPosts.length

    try {
      const res = await axios.get(`http://localhost:3000/post/getposts?userId=${currentUser._id || currentUser.rest._id}&startIndex=${startIndex}`)
      if (res.status === 200) {
        setUserPosts((prev) => [...prev, ...res.data.posts])
        if (res.data.posts.length < 9) {
          setShowMore(false)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeletePost = async () => {
    setShowModal(false)
    try {
      const res = await axios.delete(`http://localhost:3000/post/deletepost/${postToDelete}/${currentUser.rest._id || currentUser._id}`, {
        withCredentials: true
      })
      if (res.status !== 200) {
        console.log(res.response.data.message)
      } else {
        setUserPosts((prev) => prev.filter((post) => post._id !== postToDelete))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className=' table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {(currentUser.isAdmin || currentUser.rest.isAdmin) && (userPosts.length || userPosts) > 0 ? (
        <>
          <Table hoverable className=' shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Post Category</Table.HeadCell>
              <Table.HeadCell >
                <span>Delete</span>
              </Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {
              userPosts.map((post) => (
                <Table.Body key={post._id} className=' divide-y'>
                  <Table.Row className=' bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                    <Table.Cell>
                      <Link to={`/post/${post.slug}`}>
                        <img src={post.image} alt={post.title} className=' w-20 h-10 bg-gray-500' />
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/post/${post.slug}`} className=' font-medium text-gray-900 dark:text-white truncate'>{ post.title }</Link>
                    </Table.Cell>
                    <Table.Cell>
                      { post.category }
                    </Table.Cell>
                    <Table.Cell>
                      <span className=' font-medium text-red-500 hover:underline cursor-pointer' onClick={() => {
                        setShowModal(true)
                        setPostIdToDelete(post._id)
                      }}>Delete</span>
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/update-post/${post._id}`} className=' text-teal-500 hover:underline'>
                        <span>Edit</span>
                      </Link>
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
          <p>You have no post yet</p>
        </div>
      )}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size={'md'}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <BsExclamationCircle className=' h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className=' text-lg text-gray-500 mb-5 dark:text-gray-400'>Are you sure you want to delete this post?</h3>
            <div className=" flex justify-center gap-4">
              <Button color='failure' onClick={handleDeletePost}>Yes, I'm Sure</Button>
              <Button onClick={() => setShowModal(false)} color='gray'>No, Cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default DashPosts