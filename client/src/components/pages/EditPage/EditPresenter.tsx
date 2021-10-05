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

  const onChangeProfilePicture = (event: any) => {
    let imageFile = event.target.files[0];
    console.log(imageFile);
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

  return (
    <EditView
      name={name}
      setName={setName}
      bio={bio}
      setBio={setBio}
      onSave={onSave}
      onCancel={onCancel}
      onChangeProfilePicture={onChangeProfilePicture}
    />
  );
};

export default EditPresenter;
