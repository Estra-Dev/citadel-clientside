import React from 'react'
import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
  return (
    <div className=' p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className=' text-center text-3xl my-7 font-semibold'>Create a Post</h1>
      <form className=' flex flex-col gap-4'>
        <div className=" flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput type='text' placeholder='Title' required name='title' className=' flex-1' />
          <Select>
            <option value="uncategorized">Select a Category</option>
            <option value="words">Words of Wisdom</option>
            <option value="announcement">Announcement</option>
            <option value="activities">Activities</option>
          </Select>
        </div>
        <div className=" flex items-center gap-4 justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput type='file' accept='image/*' />
          <Button type='button' gradientDuoTone={'purpleToBlue'} size={'sm'} outline>Upload Image</Button>
        </div>
        <ReactQuill theme="snow" placeholder='Drop your Message...' className=' h-72 mb-12' required />
        <Button type='button' gradientDuoTone={'purpleToPink'}>Publish Post</Button>
      </form>
    </div>
  )
}

export default CreatePost