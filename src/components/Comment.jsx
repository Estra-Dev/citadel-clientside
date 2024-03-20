import axios from 'axios'
import React, { useEffect, useState } from 'react'
import moment from 'moment'

// eslint-disable-next-line react/prop-types
const Comment = ({ comment }) => {
  const [user, setUser] = useState({})
  console.log(user)
  
  useEffect(() => {
    const getUser = async () => {
      try {
        // eslint-disable-next-line react/prop-types
        const res = await axios.get(`http://localhost:3000/user/${comment.userId}`)
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
          <span className=' text-gray-500 text-xs'>{ moment(comment.createdAt).fromNow() }</span>
        </div>
        <p className=' text-gray-500 pb-2'>{ comment.content }</p>
      </div>
    </div>
  )
}

export default Comment