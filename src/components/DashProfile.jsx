import { Button, TextInput } from 'flowbite-react'
import React from 'react'
import {useSelector} from 'react-redux'

const DashProfile = () => {

  const {currentUser} = useSelector(state => state.user)

  return (
    <div className=' max-w-lg mx-auto p-3 w-full'>
      <h1 className=' my-7 text-center font-semibold text-3xl'>Profile</h1>

      <form className=' flex flex-col gap-4'>
        <div className=" w-32 h-32 self-center cursor-pointer shadow-md rounded-full overflow-hidden">
          <img src={currentUser.rest.photoUrl} alt="profile img" className=' rounded-full w-full h-full border-8 border-[lightgray] object-cover' />
        </div>
        <TextInput type='text' name='firstname' placeholder='Firstname' defaultValue={currentUser.rest.firstname} />
        <TextInput type='text' name='lastname' placeholder='Lastname' defaultValue={currentUser.rest.lastname} />
        <TextInput type='email' name='name' placeholder='Email' defaultValue={currentUser.rest.email} />
        <TextInput type='password' name='password' placeholder='*********' />
        <Button type='submit' gradientDuoTone={'purpleToBlue'} outline>Update</Button>
      </form>
      <div className=" text-red-500 flex justify-between mt-3">
        <span className=' cursor-pointer'>Delete Account</span>
        <span className=' cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}

export default DashProfile