import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import EditView from "./EditView";
import useBlogPostApi, {handleEditProfile} from "../../../hooks/useBlogPostApi";

const EditPresenter: React.FC = () => {
  const SAMPLE_USER_REF = "UuJaEV7oLO07OZgreaAc";

  const history = useHistory();
  const [
    handleGetAllBlogPosts,
    handleGetBlogPostByUserId,
    handleGetUserDetails,
  ] = useBlogPostApi();

  // Get user info from database
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
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
    savedFirstName: string,
    savedLastName: string,
    savedBio: string,
    savedProfilePicture: File | null
  ) => {
    // write to database
    await handleEditProfile(
      "UuJaEV7oLO07OZgreaAc",
      savedFirstName,
      savedLastName,
      savedProfilePicture ?? null,
      savedBio,
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
    handleGetUserDetails(SAMPLE_USER_REF).then((data) => {
      setFirstName(data[0]);
      setLastName(data[1]);
      if (data[3]){
        setPreviewOn(true);
        setProfilePicture(data[3][0]);
        setPreviewImage(data[3][0]);
      }
      setBio(data[4]);
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
