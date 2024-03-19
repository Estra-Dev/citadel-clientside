import axios from 'axios'
import { Alert, Button, Textarea } from 'flowbite-react'
import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'

const CommentSection = ({ postId }) => {
  
  const { currentUser } = useSelector(state => state.user)
  const [comment, setComment] = useState('')
  const [commentError, setCommentError] = useState('')

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    if (comment.length > 200) {
      return
    }
    try {
      const res = await axios.post("http://localhost:3000/comment/create", {
        content: comment,
        postId,
        userId: currentUser.rest._id || currentUser._id
      }, {
        withCredentials: true
      })
      if (res.status === 200) {
        setComment('')
        setCommentError(null)
      }
    } catch (error) {
      setCommentError(error.response.data.message)
      console.log(error)
    }
  }

  return (
    <div className=' max-w-2xl mx-auto w-full p-3'>
      {
        currentUser ? (
          <div className=" flex items-center gap-1 my-5 text-gray-500 text-sm">
            <p>Signed in as:</p>
            <img className=' h-5 w-5 object-cover rounded-full' src={currentUser.rest.photoUrl || currentUser.photoUrl} alt={currentUser.rest.email || currentUser.email} />
            <Link to={'/dashboard?tab=profile'} className=' text-xs text-cyan-600 hover:underline'>@{ currentUser.rest.email || currentUser.email }</Link>
          </div>
        ) : (<div className=' text-sm text-teal-500 my-5 flex gap-1'>
              You must Log in to Comment. 
              <Link to={'/login'} className=' text-blue-500 hover:underline'>Log In</Link>
            </div>)
      }
      {currentUser && (
        <form className=' border border-teal-500 rounded-md p-3' onSubmit={handleSubmit}>
          <Textarea
            placeholder='Add a comment...'
            rows={'3'}
            maxLength={'200'}
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          {commentError && (
            <Alert color={'failure'} className=' mt-5'>{ commentError }</Alert>
          )}
          <div className=" flex justify-between items-center mt-5">
            <p className=' text-gray-500 text-xs'>{200 - comment.length} characters remaining</p>
            <Button type='submit' outline gradientDuoTone={'purpleToBlue'}>Submit</Button>
          </div>
        </form>
      )}
    </div>
  )
}

export default CommentSection