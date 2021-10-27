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
  const [loadingUser, setLoadingUser] = useState<boolean>(true);
  const [loadingBlogPosts, setLoadingBlogPosts] = useState<boolean>(true);

  const [userPosts, setUserPosts] = useState<any[]>([]);

  const [
    handleGetAllBlogPosts,
    handleGetBlogPostByUserId,
    handleGetUserDetails,
  ] = useBlogPostApi();

  useEffect(() => {
    if (user) {
      setLoadingUser(true);
      handleGetUserDetails(user["uid"]).then((data) => {
        setLoadingUser(false);
        setDisplayName(data["displayName"]);
        setBio(data["biography"]);
        setProfilePicture(data["profilePicture"]);
        setLoadingUser(false);
      });

      setLoadingBlogPosts(true);
      handleGetBlogPostByUserId(user["uid"]).then((data) => {
        setUserPosts(data);
        setLoadingBlogPosts(false);
      });
    }
  }, [user]);

  return (
    <ProfileView
      displayName={displayName}
      bio={bio}
      profilePicture={profilePicture}
      userPosts={userPosts}
      loadingUser={loadingUser}
      loadingBlogPosts={loadingBlogPosts}
    />
  );
};

export default ProfilePresenter;
