import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFiles, uploadFile} from "../../actions/file";
import FileList from "./fileList/FileList";
import './disc.scss'
import {createDir} from "../../actions/file";
import Popup from './Popup'
import {setCurrentDir, setView} from "../../reducers/fileReducer";
import Uploader from "./uploader/Uploader";
import Loader from "./loader/Loader";

const Disc = () => {

    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.file.currentDir)
    const dirStack = useSelector(state => state.file.dirStack)
    const loader = useSelector(state => state.app.loader)

    const [dragEnter, setDragEnter] = useState(false)
    const [sort, setSort] = useState('type')

    useEffect(() => {
        dispatch(getFiles(currentDir, sort))
    }, [currentDir, dispatch, sort])

    const [isPopupVisible, setIsPopupVisible] = useState(false)

    const showPopup = () => {
        setIsPopupVisible(true)
    }

    const hidePopup = () => {
        setIsPopupVisible(false)
    }

    const createDirHandler = (name) => {
        dispatch(createDir(currentDir, name))
        hidePopup()
    }


    function goBackHandler() {
        const backDirId = dirStack.pop()
        dispatch(setCurrentDir(backDirId))
    }


    function uploadFileHandler(e) {
        const files = [...e.target.files];
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
    }

    function dragEnterHandler(e) {
        e.preventDefault()
        e.stopPropagation()
        setDragEnter(true)
    }

    function dragLeaveHandler(e) {
        e.preventDefault()
        e.stopPropagation()
        setDragEnter(false)
    }


    function dragDropHandler(e) {
        e.preventDefault()
        e.stopPropagation()
        let files = [...e.dataTransfer.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setDragEnter(false)
    }

    function setSortHandler(e) {
        setSort(e.target.value)
    }


    if(loader) {
        return <Loader/>
    }

    function setViewHandler(e) {
        dispatch(setView(e.target.value))
    }

    return ( !dragEnter ?
        <div
            className="disk-container"
            onDragEnter={dragEnterHandler}
            onDragLeave={dragLeaveHandler}
            onDragOver={dragEnterHandler}
        >
            <div className='disk'>
                <div className="disk__btns">
                    <button className="disk__back" onClick={goBackHandler}>Назад</button>
                    <button className="disk__create" onClick={showPopup}>Создать</button>
                    <div className="disk__upload">
                        <label htmlFor="file" className="disk__upload-label">Загрузить файл</label>
                        <input
                            type="file"
                            id="file"
                            className="disk__upload-input"
                            multiple={true}
                            onChange={uploadFileHandler}
                        />
                    </div>
                    <select
                        className='disk__select'
                        value={sort}
                        onChange={setSortHandler}
                    >
                        <option value="name">По имени</option>
                        <option value="type">По типу</option>
                        <option value="date">По дате</option>
                        <option value="size">По размеру</option>
                    </select>
                    <div className="view-model__container">
                        <button
                            className="disk__view-model disk__plate"
                            value='plate'
                            onClick={setViewHandler}
                        />
                        <button
                            className="disk__view-model disk__list"
                            value='list'
                            onClick={setViewHandler}
                        />
                    </div>
                </div>
                <FileList/>
                {isPopupVisible && <Popup createDir={createDirHandler} hidePopup={hidePopup}/>}
                <Uploader/>
            </div>
        </div>
            :
            <div
                className="drop-area"
                onDragEnter={dragEnterHandler}
                onDragLeave={dragLeaveHandler}
                onDragOver={dragEnterHandler}
                onDrop={dragDropHandler}
            >
                Перетащите файлы сюда
            </div>
    );
};

export default Disc;
