import React from "react";
import { useHistory } from "react-router-dom";
import EditView from "./EditView";

const EditPresenter: React.FC = () => {
  const history = useHistory();

  // Get user info from database
  const [name, setName] = React.useState<string>("Jane Doe");
  const [bio, setBio] = React.useState<string>("This is my initial bio");
  const [profilePicture, setProfilePicture] = React.useState<
    string | undefined
  >();
  const [changedImage, setChangedImage] = React.useState<Boolean>(false);
  const [opacity, setOpacity] = React.useState<number>(0);

  const onChangeProfilePicture = (event: any) => {
    let imageFile = event.target.files[0];
    console.log(imageFile);
    setChangedImage(true);
    // Write to database to upload image
  };

  const onSave = (savedName: string, savedBio: string) => {
    // write to database
    console.log(savedName);
    console.log(savedBio);
    console.log(profilePicture);
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

  return (
    <EditView
      name={name}
      setName={setName}
      bio={bio}
      setBio={setBio}
      profilePicture={profilePicture}
      setProfilePicture={setProfilePicture}
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
