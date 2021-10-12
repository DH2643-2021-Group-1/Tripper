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
    <div className="profilePageContainer">
      <div className="profileContainer">
        <div className="infoContainer">
          <div className="profileInformation">
            <span className="name">{name}</span>
            <span className="bio">{bio}</span>
            <div className="editProfile">
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
          <div className="profilePicture">
            {profilePicture ? (
              <img
                className="picture"
                src={profilePicture}
                alt="profile"
              />
            ) : (
              <div className="defaultProfilePicture">
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
        <div className="postContainer">
          {[1, 2, 3, 4, 5].map((post, idx) => {
            return <div className="post" key={idx}>Post {post}</div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
