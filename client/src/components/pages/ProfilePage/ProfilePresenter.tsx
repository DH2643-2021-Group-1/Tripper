import React, { useContext, useEffect, useState } from "react";
import ProfileView from "./ProfileView";
import useBlogPostApi from "../../../hooks/useBlogPostApi";

import { AuthContext } from "../../../contexts/AuthContext";

const ProfilePresenter: React.FC = () => {
  // Get user info from database
  const user = useContext(AuthContext);

  const [displayName, setDisplayName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<any>(undefined);

  const [userPosts, setUserPosts] = useState<any[]>([]);

  const [
    handleGetAllBlogPosts,
    handleGetBlogPostByUserId,
    handleGetUserDetails,
  ] = useBlogPostApi();

  useEffect(() => {
    if (user) {
      handleGetUserDetails(user["uid"]).then(data => {
        setDisplayName(data["displayName"]);
        setBio(data["biography"]);
        setProfilePicture(data["profilePicture"]);
      });
      handleGetBlogPostByUserId(user["uid"]).then(data => {
        setUserPosts(data);
      });
    }
  }, [user]);

  return (
    <ProfileView
      displayName={displayName}
      bio={bio}
      profilePicture={profilePicture}
      userPosts={userPosts}
    />
  );
};

export default ProfilePresenter;
