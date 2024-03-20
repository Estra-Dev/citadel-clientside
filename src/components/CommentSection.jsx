import axios from 'axios'
import { Alert, Button, Textarea } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import Comment from './Comment'

// eslint-disable-next-line react/prop-types
const CommentSection = ({ postId }) => {
  
  const { currentUser } = useSelector(state => state.user)
  const [comment, setComment] = useState('')
  const [commentError, setCommentError] = useState('')
  const [comments, setComments] = useState([])

  console.log(comments)

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
        setComments([res.data, ...comments])
      }
    } catch (error) {
      setCommentError(error.response.data.message)
      console.log(error)
    }
  }

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/comment/getPostComments/${postId}`)
        if (res.status === 200) {
          setComments(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getComments()
  }, [postId])

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
      {comments === 0 ? (
      <p className=' text-sm my-5'>No Comments yet!</p>
      ) : (
          <>
            <div className=" text-sm my-5 flex item-center gap-1">
              <p>Comments</p>
              <div className=" border border-gray-400 py-1 px-2 rounded-sm">
                <p>{ comments.length }</p>
              </div>
            </div>
            {comments.map(comment => (
              <Comment key={comment._id} comment={comment} />
            ))}
          </>
      )}
    </div>
  )
}

export default CommentSection