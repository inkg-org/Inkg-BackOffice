import React, { useState, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { RiUploadCloud2Line, RiDeleteBin7Line } from 'react-icons/ri'
import { GrSelect } from 'react-icons/gr'
import { formatBytes } from '../../lib/utils/formatBytes'
import Image from 'next/image'

interface FileProps {
  typeOfFile?: string
}

interface FileData {
  id: string
  file: File
  status: 'pending' | 'uploading' | 'success' | 'failed'
  progress: number
  isSelected: boolean
}

const FileUpload: React.FC<FileProps> = ({ typeOfFile = 'sales_invoices' }) => {
  const [files, setFiles] = useState<FileData[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectAll, setSelectAll] = useState(false)

  const processFiles = (files: FileList) => {
    const newFiles = Array.from(files).map(
      (file): FileData => ({
        id: `file-${uuidv4()}`,
        file,
        status: 'pending',
        progress: 0,
        isSelected: selectAll
      })
    )
    setFiles((prevFiles) => [...prevFiles, ...newFiles])
  }

  const handleSelectAllToggle = () => {
    const newSelectAll = !selectAll
    setSelectAll(newSelectAll)
    setFiles((prevFiles) =>
      prevFiles.map((file) => ({
        ...file,
        isSelected: newSelectAll
      }))
    )
  }

  const handleDeleteAll = () => {
    setFiles([])
    setSelectAll(false)
  }

  const handleDeleteFile = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    event.stopPropagation()
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id))
  }

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      processFiles(event.target.files)
    }
  }

  const toggleFileSelection = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    event.stopPropagation()
    setFiles((prevFiles) =>
      prevFiles.map((file) => ({
        ...file,
        isSelected: file.id === id ? !file.isSelected : file.isSelected
      }))
    )
  }

  const anyFileSelected = files.some((file) => file.isSelected)

  return (
    <div className='w-screen'>
      {!anyFileSelected && (
        <div className='text-white align-middle flex justify-end mb-4'>
          <button
            className={`p-3 rounded-lg file-upload-button flex items-center justify-center text-blue-500
                        ${
                          files.length >= 1
                            ? 'border-blue-500 border-2 hover:bg-blue-500 text-blue-500 hover:text-white'
                            : 'bg-blue-500 text-white'
                        } focus:outline-none rounded transition duration-300`}
            onClick={() => fileInputRef.current?.click()}
          >
            <GrSelect className='text-lg mr-2' />
            Select Files from Device
          </button>

          {files.length >= 1 && (
            <button
              className='ml-4 p-3 rounded-lg flex items-center justify-center text-white bg-blue-500 hover:bg-blue-600 focus:outline-none  transition duration-300'
              onClick={() => console.log('Uploading...')}
            >
              <RiUploadCloud2Line className='text-lg mr-2' />
              Upload Files
            </button>
          )}
        </div>
      )}
      <div className='flex justify-end items-center mb-4'>
        {files.length > 1 && selectAll && (
          <button
            onClick={handleDeleteAll}
            className='text-red-500 hover:text-red-700 flex items-center mr-4'
          >
            <RiDeleteBin7Line className='text-lg mr-2' />
            <span>Delete All</span>
          </button>
        )}
        {files.length > 1 && (
          <button
            onClick={handleSelectAllToggle}
            className='text-blue-500 hover:text-blue-700 underline font-bold transition duration-200 focus:outline-none'
          >
            {selectAll ? 'Unselect All' : 'Select All'}
          </button>
        )}
      </div>
      <div className='drop-area p-7 rounded-2xl text-zinc-500 bg-slate-200 hover:bg-cyan-100 transition duration-300 ease-in-out'>
        <input
          ref={fileInputRef}
          type='file'
          multiple
          accept='.jpg,.png,.pdf,.xml'
          style={{ display: 'none' }}
          onChange={handleFileInputChange}
        />
        <h3 className='text-lg mb-2 font-black text-cyan-800'>
          Files ({files.length}):
        </h3>
        {files.length === 0 ? (
          <p className='drop-message text-cyan-950'>
            Click here or drag files to upload
          </p>
        ) : (
          <ul className='file-list '>
            {files.map((fileData) => (
              <li
                key={fileData.id}
                className='mb-4 flex items-center justify-between'
              >
                <div className='flex items-center'>
                  <input
                    type='checkbox'
                    checked={fileData.isSelected}
                    onChange={(e) => toggleFileSelection(e, fileData.id)}
                    className='mr-2'
                  />
                  <div className='ml-3 flex-grow'>
                    <div className='file-preview'>
                      {fileData.file.type.startsWith('image/') && (
                        <Image
                          src={URL.createObjectURL(fileData.file)}
                          alt='Preview'
                          style={{
                            width: '10%',
                            height: '10%',
                            objectFit: 'cover'
                          }}
                        />
                      )}
                    </div>
                    <div className='file-info  text-cyan-800'>
                      <p className='file-name text-sm text-cyan-800 font-bold'>
                        {fileData.file.name}
                      </p>
                      <p className='file-size text-xs text-cyan-600 '>
                        {formatBytes(fileData.file.size)}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={(e) => handleDeleteFile(e, fileData.id)}
                  className='text-red-500 hover:text-red-700 flex items-center space-x-2  transition duration-200 focus:outline-none'
                >
                  <RiDeleteBin7Line className='text-lg' />
                  <span>Delete</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default FileUpload
