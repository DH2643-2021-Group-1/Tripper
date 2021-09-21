import React, { FC } from 'react';
import './profile-picture.scss';
import EmptyProfilePicture from './assets/empty_profile_picture.svg';

interface ProfilePictureProps {
    profilePictureSrc: string | null,
}

const ProfilePicture: FC<ProfilePictureProps> = (props) => {

    return (
        <div
            style={{ backgroundImage: `url(${props.profilePictureSrc ?? EmptyProfilePicture})` }}
            className="profile-picture__container"></div>
    )
}

export default ProfilePicture;