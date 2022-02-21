import React, {useState} from 'react';

const Popup = ({createDir, hidePopup}) => {

    const [dirName, setDirName] = useState('')

    return (
        <div className='popup'>
            <div className="popup__content">
                <div className="popup__header">
                    <div className="popup__title">Создать новую папку</div>
                    <div
                        className="popup__close"
                        onClick={hidePopup}
                    >X</div>
                </div>
                <input
                    type="text"
                    placeholder="Введите название папки"
                    value={dirName}
                    onChange={e => setDirName(e.target.value)}
                />
                <buttun
                    className="popup__create"
                    onClick={() => createDir(dirName)}
                >Создать</buttun>
            </div>
        </div>
    );
};

export default Popup;
