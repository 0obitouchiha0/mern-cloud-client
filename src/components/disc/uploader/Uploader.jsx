import React from 'react';
import UploadFile from "./UploadFile";
import './Uploader.scss'
import {useDispatch, useSelector} from "react-redux";
import {hideUploader} from "../../../reducers/uploadReducer";

const Uploader = () => {

    const dispatch = useDispatch()

    const isVisible = useSelector(state => state.upload.isVisible)
    const files = useSelector(state => state.upload.files )

    const closeUploaderHandler = () => {
        dispatch(hideUploader())
    }

    return (
        isVisible &&
            <div className='uploader'>
                <div className="uploader__header">
                    <div className="uploader__title">Загрузки</div>
                    <button
                        className="uploader__close"
                        onClick={closeUploaderHandler}
                    >X</button>
                </div>
                {files.map(file => (
                    <UploadFile key={file.id} file={file}/>
                ))}
            </div>
    );
};

export default Uploader;
