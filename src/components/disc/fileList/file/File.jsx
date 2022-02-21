import React from 'react';
import './file.scss'
import dirSvg from '../../../../assets/images/disk-dir.svg'
import fileSvg from '../../../../assets/images/disk-file.svg'
import {useDispatch, useSelector} from "react-redux";
import {pushInStack, setCurrentDir} from "../../../../reducers/fileReducer";
import {deleteFile, downloadFile} from "../../../../actions/file";
import sizeFormat from '../../../../utils/sizeFormat'


const File = ({file}) => {

    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.file.currentDir)
    const filesView = useSelector(state => state.file.view)


    function openHandler() {
        dispatch(pushInStack(currentDir))
        dispatch(setCurrentDir(file._id))
    }

    function downloadHandler(e) {
        e.stopPropagation()
        downloadFile(file)
    }

    function deleteFileHandler(e) {
        e.stopPropagation()
        dispatch(deleteFile(file))
    }

    if(filesView === 'plate') {
        return (
            <div
                className='file-plate__item'
                onClick={openHandler}
            >
                <img src={file.type === 'dir' ? dirSvg : fileSvg} alt="img" className='file-plate__img'/>
                <div className="file-plate__name">{file.name}</div>
                <div className='file-plate__btns'>
                    {file.type !== 'dir' &&
                    <button
                        className='file-plate__btn file-plate__download'
                        onClick={downloadHandler}
                    >download</button>
                    }
                    <button
                        className='file-plate__btn file-plate__delete'
                        onClick={deleteFileHandler}
                    >delete</button>
                </div>
            </div>
        );
    }


    if(filesView === 'list') {
        return (
            <div
                className='file'
                onClick={openHandler}
            >
                <img src={file.type === 'dir' ? dirSvg : fileSvg} alt="img" className='file__img'/>
                <div className="file__name">{file.name}</div>
                <div className="file__date">{file.date.split('T')[0].split('-').join('.')}</div>
                <div className="file__size">{sizeFormat(file.size)}</div>
                {file.type !== 'dir' &&
                <button
                    className='file__btn file__download'
                    onClick={downloadHandler}
                >download</button>
                }
                <button
                    className='file__btn file__delete'
                    onClick={deleteFileHandler}
                >delete</button>
            </div>
        );
    }
};

export default File;
