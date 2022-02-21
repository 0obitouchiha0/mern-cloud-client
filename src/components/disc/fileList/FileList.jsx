import React from 'react';
import './fileList.scss'
import {useSelector} from "react-redux";
import File from "./file/File";
import TransitionGroup from "react-transition-group/esm/TransitionGroup";
import CSSTransition from "react-transition-group/esm/CSSTransition";

const FileList = () => {

    const files = useSelector(state => state.file.files)
    const filesView = useSelector(state => state.file.view)

    if(files.length === 0) {
        return (
            <div>Папка пуста</div>
        )
    }

    if(filesView === 'plate') {
        return (
            <div className='file-plate'>
                {files.map(file => (
                    <CSSTransition
                        key={file._id}
                        timeout={500}
                        classNames='file'
                        exit={false}
                    >
                        <File file={file}/>
                    </CSSTransition>
                ))}
            </div>
        )

    }

    if(filesView === 'list') {
        return (
            <div className='filelist'>
                <div className="filelist__header">
                    <div className="filelist__name">Название</div>
                    <div className="filelist__date">Дата</div>
                    <div className="filelist__size">Размер</div>
                </div>
                <TransitionGroup>

                    {files.map(file => (
                        <CSSTransition
                            key={file._id}
                            timeout={500}
                            classNames='file'
                            exit={false}
                        >
                            <File file={file}/>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </div>
        );
    }
};

export default FileList;
