import React, { useEffect, useState } from 'react'
import { Icon } from './row_renderers/utils'
import {
  FileEntity,
  implementsExternalFileHandleInterface,
} from '../utils/synapseTypes'
import { SynapseClient } from '../utils'
import { FileFetchResponse } from './FileEntityHandleQueryWrapper'

export type DirectFileDownloadProps = {
  token?: string
  fileEntityHandle?: FileFetchResponse
}

const DirectDownload: React.FunctionComponent<DirectFileDownloadProps> = (props) => {

  const {token, fileEntityHandle} = props
  const [isExternalFile, setIsExternalFile] = useState<boolean>(false)
  const [hasFileAccess, setHasFileAccess] = useState<boolean>(false)
  const [fileEntity, setFileEntity] = useState<FileEntity>()
  const [externalURL, setExternalURL] = useState<string>()
  let mounted:boolean = true

  useEffect( () => {
    setHasFileAccess(false)
    setIsExternalFile(false)
    if (mounted) {
      if (fileEntityHandle) {
        if (!fileEntityHandle.success && 'message' in fileEntityHandle) {
          console.log("DirectDownload - Error fetching file data: ", fileEntityHandle.message)
          setHasFileAccess(false)
        } else {
          if ('data' in fileEntityHandle) {
            const { fileEntity, fileHandle } = fileEntityHandle.data
            setFileEntity(fileEntity)
            if (fileHandle) {
              // have S3 file access and not file preview
              if ('isPreview' in fileHandle && !fileHandle.isPreview) {
                setHasFileAccess(true)
              }
              // is external file url
              if (implementsExternalFileHandleInterface(fileHandle) && 'externalURL' in fileHandle) {
                setHasFileAccess(true)
                setIsExternalFile(true)
                setExternalURL(fileHandle.externalURL)
              }
            }
          }
        }
      }
    }
    return () => {
      mounted = false
    }
  }, [token, fileEntityHandle])

  const getDownloadLink = () => {
    SynapseClient.getFileResult(
      fileEntity!,
      token,
      false,
      true
    ).then(data => {
      if (data.preSignedURL) {
        window.open(data.preSignedURL)
      }
    }).catch(error => {
      console.log("Fail to get file download link")
    })
  }

  const getIcon = () => {
    if (isExternalFile) {
      return <a rel="noreferrer" href={externalURL} target="_blank"><Icon type="externallink" /></a>
    }
    if (hasFileAccess) {
      return <button onClick={getDownloadLink}><Icon type="download"/></button>
    }
    return <></>
  }

  return (
    <span className="SRC-primary-text-color">{getIcon()}</span>
  )
}

export default DirectDownload