import axios from 'axios'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Button } from 'flowbite-react'
import { FaThumbsUp } from "react-icons/fa";
import {useSelector} from 'react-redux'

// eslint-disable-next-line react/prop-types
const Comment = ({ comment, onLike }) => {
  const [user, setUser] = useState({})
  const { currentUser } = useSelector(state => state.user)
  console.log(user)
  
  useEffect(() => {
    const getUser = async () => {
      try {
        // eslint-disable-next-line react/prop-types
        const res = await axios.get(`http://localhost:3000/user/${comment.userId}`, {
          withCredentials: true
        })
        if (res.status === 200) {
          setUser(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [comment])
  

  return (
    <div className=' flex p-4 border-b dark:border-gray-600 text-sm'>
      <div className=" flex-shrink-0 mr-3">
        <img src={user.photoUrl} alt={user.firstname} className=' w-10 h-10 rounded-full bg-gray-200' />
      </div>
      <div className=" flex-1">
        <div className=" flex items-center mb-1 gap-1">
          <span className=' font-bold mr-1 text-sm truncate'>{user ? `@${user.firstname}_${user.lastname}` : "Anonymous user"}</span>
          <span className=' text-gray-500 text-xs'>
            {
              // eslint-disable-next-line react/prop-types
              moment(comment.createdAt).fromNow()
            }
          </span>
        </div>
        <p className=' text-gray-500 pb-2'>
          {
            // eslint-disable-next-line react/prop-types
            comment.content
          }
        </p>
        <div className=" flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
          <button type='button' onClick={() => onLike(comment._id)} className={` text-gray-400 hover:text-blue-500 ${currentUser && comment.likes.includes(currentUser.rest._id || currentUser._id) && '!text-blue-500'}`}>
            <FaThumbsUp className=' text-sm' />
          </button>
          <p className=' text-gray-400'>
            {
              // eslint-disable-next-line react/prop-types
              comment.numberOfLikes > 0 && comment.numberOfLikes + " " + (comment.numberOfLikes === 1 ? 'Like' : "Likes")
            }
          </p>
        </div>
      </div>
    </div>
  )
}

export default Comment