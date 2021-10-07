import React from "react";
import ProfileView from "./ProfileView";

const ProfilePresenter: React.FC = () => {
  // Get user info from database
  const [name, setName] = React.useState<string>("");
  const [bio, setBio] = React.useState<string>("");
  const [profilePicture, setProfilePicture] = React.useState<
    string | undefined
  >(undefined);

  React.useEffect(() => {
    setName("Jane DoeJane DoeJane");
    setBio(
      "A 20-something fun loving and ambitious female who set up The Travelista blog as a place to document all of my amazing personal and professional travel experiences in witty, informal and honest blog posts."
    );
    setProfilePicture(
      "http://thetravelistablog.files.wordpress.com/2013/05/jess-gibson-the-travelista1.jpg"
    );
  }, []);

  return <ProfileView name={name} bio={bio} profilePicture={profilePicture} />;
};

export default ProfilePresenter;
