import axios from 'axios'
import {setFiles, createFile, deleteFileAction} from "../reducers/fileReducer";
import {addUploadFile, changeUploadFile, showUploader} from "../reducers/uploadReducer";
import {hideLoader, showLoader} from "../reducers/appReducer";
import {API_URL} from "../config";

export function getFiles(id, sort) {
    return async dispatch => {
        try {

            dispatch(showLoader())

            let  url = `${API_URL}/api/files`

            if(id && !sort) {
                url += `?parent=${id}`
            }

            if(sort && !id) {
                url += `?sort=${sort}`
            }

            if(id && sort) {
                url += `?parent=${id}&sort=${sort}`
            }

            const res = await axios.get(url, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            dispatch(setFiles(res.data.files))
        }
        catch(e) {
            console.log('get files error', e.res.data.message)
        }
        finally {
            dispatch(hideLoader())
        }
    }
}

export function createDir(id, name) {
    return async dispatch => {
        try {
            const res = await axios.post(`${API_URL}/api/files`, {
                name,
                parent: id,
                type: 'dir'
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            console.log(res.data)
            dispatch(createFile(res.data))
        }
        catch(e) {
            console.log('get files error', e.message)
        }
    }
}

export function uploadFile(file, dirId) {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            if(dirId) {
                formData.append('parent', dirId)
            }

            const uploadFile = {
                name: file.name,
                progress: 0,
                id: Date.now()
            }

            dispatch(showUploader())
            dispatch(addUploadFile(uploadFile))

            const res = await axios.post(`${API_URL}/api/files/upload`, formData, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    console.log('total', totalLength)
                    if(totalLength) {
                        uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
                        dispatch(changeUploadFile(uploadFile.id, uploadFile.progress))
                    }
                }
            })
            console.log(res.data)
            dispatch(createFile(res.data))
        }
        catch(e) {
            console.log('upload file error', e.message)
        }
    }
}

export async function downloadFile(file) {
    try {
        const res = await fetch(`${API_URL}/api/files/download?id=${file._id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        if(res.status === 200) {
            const blob = await res.blob()
            const downloadUrl = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = downloadUrl
            a.download = file.name
            document.body.appendChild(a)
            a.click()
            a.remove()
        }
    }
    catch(e) {
        console.log('upload file error', e.message)
    }
}

export function deleteFile(file) {
    return async dispatch => {
        try {
            await axios.delete(`${API_URL}/api/files?id=${file._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(deleteFileAction(file._id))
        }
        catch(e) {
            console.log('delete file error', e)
        }
    }
}

export function searchFiles(fileName) {
    return async dispatch => {
        try {
            const res = await axios.get(`${API_URL}/api/files/search?search=${fileName}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(setFiles(res.data.files))
        }
        catch(e) {
            console.log('search file error', e)
        }
        finally {
            dispatch(hideLoader())
        }
    }
}



