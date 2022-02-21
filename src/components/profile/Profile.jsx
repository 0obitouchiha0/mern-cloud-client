import React from 'react';
import {useDispatch} from "react-redux";
import {deleteAvatar, uploadAvatar} from "../../actions/user";

const Profile = () => {

    const dispatch = useDispatch()


    function deleteAvatarHandler() {
        dispatch(deleteAvatar())
    }

    async function uploadAvatarHandler(e) {
        await dispatch(deleteAvatar())
        await dispatch(uploadAvatar(e.target.files[0]))
    }

    return (
        <div>
            <button
                onClick={deleteAvatarHandler}
            >Удалить аватар</button>
            <input
                type="file"
                accept='image/jpeg'
                placeholder='Выберите avatar'
                onChange={uploadAvatarHandler}
            />
        </div>
    );
};

export default Profile;
