import React, { useState } from 'react'
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';

const CreatePost = () => {

  const [file, setFile] = useState(null)
  const [imageUploadProgress, setImageUploadProgress] = useState(null)
  const [imageUploadError, setImageUploadError] = useState(null)
  const [formData, setFormData] = useState({})
  const handleUpload = async () => {
    try {
      if (!file) {
        setImageUploadError("PLease Select an Image")
        return
      }
      setImageUploadError(null)
      const storage = getStorage(app)
      const fileName = new Date().getTime() + "-" + file.name
      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setImageUploadProgress(progress.toFixed(0))
        },
        (error) => {
          setImageUploadError(error, "image Upload Failed")
          setImageUploadProgress(null)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setImageUploadProgress(null)
            setImageUploadError(null)
            setFormData({...formData, image: downloadUrl})
          })
        }
      )
    } catch (error) {
      setImageUploadError('Image Upload failed')
      setImageUploadProgress(null)
      console.log(error)
    }

  }
  
  console.log(imageUploadProgress)


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
          <FileInput type='file' accept='image/*' onChange={(e) => setFile(e.target.files[0])} />
          <Button type='button' gradientDuoTone={'purpleToBlue'} size={'sm'} outline onClick={handleUpload} disabled={imageUploadProgress}>
            {
              imageUploadProgress ? (
              <div className=" w-16 h-16"> <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0} %`} /></div>
              ) : 'Upload Image'
            }
          </Button>
        </div>
        {
          imageUploadError && (
            <Alert color={'failure'}>{ imageUploadError }</Alert>
          )
        }
        {
          formData.image && (
            <img src={formData.image} alt='upload' className=' w-full h-72 object-cover' />
          )
        }

        <ReactQuill theme="snow" placeholder='Drop your Message...' className=' h-72 mb-12' required />
        <Button type='button' gradientDuoTone={'purpleToPink'}>Publish Post</Button>
      </form>
    </div>
  )
}

export default CreatePost