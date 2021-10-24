import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import EditView from "./EditView";
import useBlogPostApi, {handleEditProfile} from "../../../hooks/useBlogPostApi";

import { AuthContext } from '../../../contexts/AuthContext'

const EditPresenter: React.FC = () => {
  const SAMPLE_USER_REF = "UuJaEV7oLO07OZgreaAc";

  const history = useHistory();
  const user = useContext(AuthContext);
  const [
    handleGetAllBlogPosts,
    handleGetBlogPostByUserId,
    handleGetUserDetails,
  ] = useBlogPostApi();

  // Get user info from database
  const [displayName, setDisplayName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [changedImage, setChangedImage] = useState<Boolean>(false);
  const [previewOn, setPreviewOn] = useState<Boolean>(false);
  const [opacity, setOpacity] = useState<number>(0);

  const onChangeProfilePicture = (event: any) => {
    let imageFile = event.target.files[0];
    setChangedImage(true);
    setPreviewOn(true);
    setProfilePicture(imageFile);
    setPreviewImage(URL.createObjectURL(imageFile));
    // Write to database to upload image
  };

  const onSave = async (
    displayName: string,
    bio: string,
    profilePicture: File | null
  ) => {
    // write to database
    user && await handleEditProfile(
      user['uid'],
      displayName,
      profilePicture ?? null,
      bio,
      changedImage
    ).then(() => {history.push("/profile");});
  };

  const onCancel = () => {
    history.push("/profile");
  };

  const onHover = () => {
    if (opacity === 0) {
      setOpacity(1);
    } else {
      setOpacity(0);
    }
  };

  const onClose = () => {
    setPreviewOn(false);
    setChangedImage(true);
    setProfilePicture(null);
  };

  useEffect(() => {
    if (user) {
      handleGetUserDetails(user['uid']).then((data) => {
        setDisplayName(data['displayName']);
        setBio(data['biography']);
        if (data['profilePicture']) {
          setPreviewOn(true);
          setProfilePicture(data['profilePicture'])
          setPreviewImage(data['profilePicture']);
        };
      });
    }
  }, [user]);

  return (
    <EditView
      displayName={displayName}
      setDisplayName={setDisplayName}
      bio={bio}
      setBio={setBio}
      profilePicture={profilePicture}
      previewImage={previewImage}
      onSave={onSave}
      onCancel={onCancel}
      onChangeProfilePicture={onChangeProfilePicture}
      previewOn={previewOn}
      onHover={onHover}
      opacity={opacity}
      onClose={onClose}
    />
  );
};

export default EditPresenter;
