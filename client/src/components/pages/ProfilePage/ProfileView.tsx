import React from "react";
import "./ProfilePage.scss";
import Button, { ButtonTypes } from "../../button/button";
import { useHistory } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  name: string;
  bio: string;
  profilePicture: string | undefined;
}

const ProfileView: React.FC<Props> = ({ name, bio, profilePicture }) => {
  const history = useHistory();
  return (
    <div className="profile-page__container">
      <div className="profile-page__profile-container">
        <div className="profile-page__info-container">
          <div className="profile-page__profile-information">
            <span className="profile-page__name">{name}</span>
            <span className="profile-page__bio">{bio}</span>
            <div className="profile-page__edit-profile">
              <Button
                disabled={false}
                type={ButtonTypes.primary}
                onPress={() => {
                  history.push("/edit");
                }}
              >
                Edit profile
              </Button>
            </div>
          </div>
          <div className="profile-page__profile-picture">
            {profilePicture ? (
              <img
                className="profile-page__picture"
                src={profilePicture}
                alt="profile"
              />
            ) : (
              <div className="profile-page__default-profile-picture">
                <FontAwesomeIcon
                  icon={faUser}
                  size="5x"
                  color="white"
                  opacity={0.9}
                />
              </div>
            )}
          </div>
        </div>
        <div className="profile-page__post-container">
          {[1, 2, 3, 4, 5].map((post, idx) => {
            return (
              <div className="profile-page__post" key={idx}>
                Post {post}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
