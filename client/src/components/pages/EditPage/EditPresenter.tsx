import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import EditView from "./EditView";
import useBlogPostApi from "../../../hooks/useBlogPostApi";

const EditPresenter: React.FC = () => {
  const SAMPLE_USER_REF = "UuJaEV7oLO07OZgreaAc";

  const history = useHistory();
  const [
    handleGetAllBlogPosts,
    handleSetPost,
    handleGetBlogPostByUserId,
    handleGetBlogPostByPostId,
    handleEditProfile,
    handleGetUserDetails,
  ] = useBlogPostApi();

  // Get user info from database
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<any>();
  const [previewImage, setPreviewImage] = useState<string>("");
  const [changedImage, setChangedImage] = useState<Boolean>(false);
  const [opacity, setOpacity] = useState<number>(0);

  const onChangeProfilePicture = (event: any) => {
    let imageFile = event.target.files[0];
    setChangedImage(true);
    setProfilePicture(imageFile);
    setPreviewImage(URL.createObjectURL(imageFile));
    // Write to database to upload image
  };

  const onSave = (
    savedFirstName: string,
    savedLastName: string,
    savedBio: string,
    savedProfilePicture: any
  ) => {
    // write to database
    handleEditProfile(
      "UuJaEV7oLO07OZgreaAc",
      savedFirstName,
      savedLastName,
      savedProfilePicture ?? null,
      savedBio
    );
    history.push("/profile");
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
    setChangedImage(false);
    setProfilePicture(undefined);
  };

  useEffect(() => {
    handleGetUserDetails(SAMPLE_USER_REF).then((data) => {
      setFirstName(data[0]);
      setLastName(data[1]);
      setProfilePicture(data[3]);
      setBio(data[4])
    });
  }, []);

  return (
    <EditView
      firstName={firstName}
      setFirstName={setFirstName}
      lastName={lastName}
      setLastName={setLastName}
      bio={bio}
      setBio={setBio}
      profilePicture={profilePicture}
      setProfilePicture={setProfilePicture}
      previewImage={previewImage}
      onSave={onSave}
      onCancel={onCancel}
      onChangeProfilePicture={onChangeProfilePicture}
      changedImage={changedImage}
      onHover={onHover}
      opacity={opacity}
      onClose={onClose}
    />
  );
};

export default EditPresenter;
