'use client'
import { useState } from 'react'
import { Upload as TusUpload } from 'tus-js-client'
import cookie from 'cookie'

interface FileProps {
  typeOfFile?: string
}

export default function FileUpload({
  typeOfFile = 'sales_invoices'
}: FileProps) {
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [uploadError, setUploadError] = useState<string>('')
  const [amountFiles, setAmountFiles] = useState<number>(0)
  const [uploadDone, setUploadDone] = useState<boolean>(false)
  const [fileList, setFileList] = useState<string[]>([])

  const cookies = cookie.parse(document.cookie)
  const token = cookies.auth_token

  const handleFilesUpload = async (files: FileList) => {
    setAmountFiles(files.length)
    let uploadedCount = 0
    const fileNames = Array.from(files).map((file) => file.name)
    setFileList(fileNames)

    for (const file of files) {
      const fileExt = file.name.split('.').pop()?.toLowerCase() || 'png'
      const allowedExtensions = ['jpg', 'png', 'pdf', 'xml']

      if (!allowedExtensions.includes(fileExt)) {
        setUploadError('Unsupported file type.')
        return
      }

      let folderPath = `${typeOfFile}/`
      const fileName = `${folderPath}${Math.floor(
        Math.random() * 10000000
      )}.${fileExt}`

      switch (typeOfFile) {
        case 'nominee_documents':
          folderPath += 'nominee_documents/'
          break
        case 'buy_invoices':
          folderPath += 'buy_invoices/'
          break
        default:
          folderPath += 'sales_invoices/'
      }

      try {
        const upload = new TusUpload(file, {
          endpoint: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/upload/resumable`,
          metadata: {
            bucketName: 'invoices',
            filename: fileName,
            contentType: file.type
          },
          headers: {
            Authorization: `Bearer ${token}`
          },
          onError: (error) => {
            console.error('Upload failed:', error)
            setUploadError('Upload failed: ' + error)
          },
          onProgress: (bytesUploaded, bytesTotal) => {
            const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2)
            setUploadProgress(Number(percentage))
            console.log(`Upload progress: ${percentage}%`)
          },
          onSuccess: () => {
            console.log('Upload complete for:', fileName)
            uploadedCount++
            if (uploadedCount === files.length) {
              setUploadDone(true)
            }
          }
        })

        await upload.start()
      } catch (error) {
        console.error('Error during upload:', error)
        setUploadError((error as any).message)
      }
    }
  }

  const resetToInitialState = () => {
    setUploadProgress(0)
    setUploadError('')
    setAmountFiles(0)
    setUploadDone(false)
    setFileList([])
  }

  return (
    <div>
      <input
        className='text-slate-900 black'
        type='file'
        multiple
        accept='.jpg,.png,.pdf,.xml'
        onChange={(e) => {
          const files = e.target.files
          if (files && files.length > 0) {
            handleFilesUpload(files)
          }
        }}
      />
      <ul>
        {fileList.map((fileName, index) => (
          <li className='text-slate-500' key={index}>
            {fileName}
          </li>
        ))}
      </ul>
      {uploadDone ? (
        <>
          <div>Upload successful!</div>
          <button onClick={resetToInitialState}>Delete and Reset</button>
        </>
      ) : uploadError ? (
        <>
          <div>Error: {uploadError}</div>
          <button
            className='rounded-md py-2 px-4 text-white bg-indigo-600'
            onClick={resetToInitialState}
          >
            Try Again
          </button>
        </>
      ) : (
        <>
          {uploadProgress > 0 && (
            <div>
              Uploading {uploadProgress}% - ({amountFiles} files)
            </div>
          )}
          {amountFiles > 0 && uploadProgress === 0 && (
            <button onClick={resetToInitialState}>Cancel Upload</button>
          )}
        </>
      )}
    </div>
  )
}
