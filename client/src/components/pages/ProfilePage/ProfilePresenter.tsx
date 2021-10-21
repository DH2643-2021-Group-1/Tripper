import React, { useState, useEffect } from "react";
import ProfileView from "./ProfileView";
import useBlogPostApi from "../../../hooks/useBlogPostApi";

const ProfilePresenter: React.FC = () => {
  // Get user info from database
  const SAMPLE_USER_REF = "UuJaEV7oLO07OZgreaAc";

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<any>(undefined);

  const [userPosts, setUserPosts] = useState<any[]>([]);

  const [
    handleGetAllBlogPosts,
    handleSetPost,
    handleGetBlogPostByUserId,
    handleGetBlogPostByPostId,
    handleEditProfile,
    handleGetUserDetails,
  ] = useBlogPostApi();

  useEffect(() => {
    handleGetUserDetails(SAMPLE_USER_REF).then((data) => {
      setFirstName(data[0]);
      setLastName(data[1]);
      setBio(data[4]);
      setProfilePicture(null); // null for now since image isn't uploaded to database yet
    });
    handleGetBlogPostByUserId(SAMPLE_USER_REF).then((data) => {
      setUserPosts(data);
    });
  }, [bio]);

  return (
    <ProfileView
      firstName={firstName}
      lastName={lastName}
      bio={bio}
      profilePicture={profilePicture}
      userPosts={userPosts}
    />
  );
};

export default ProfilePresenter;
