import React from 'react';
import './Uploader.scss'
import {useDispatch} from "react-redux";
import {removeUploadFile} from "../../../reducers/uploadReducer";

const UploadFile = ({file}) => {

    const dispatch = useDispatch()


    function removeUploadFileHandler() {
        dispatch(removeUploadFile(file.id))
    }

    return (
        <div className='uploader-file'>
            <div className='uploader-file__header'>
                <div className='uploader-file__name'>{file.name}</div>
                <button
                    className="uploader-file__remove"
                    onClick={removeUploadFileHandler}
                >X</button>
            </div>
            <div className='uploader-file__progress-bar'>
                <div className="uploader-file__upload-bar" style={{width: `${file.progress}%`}}/>
                <div className="uploader-file__percent">{file.progress}%</div>
            </div>
        </div>
    );
};

export default UploadFile;
