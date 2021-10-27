import React from "react";
import "./ProfilePage.scss";
import Button, { ButtonTypes } from "../../button/button";
import { useHistory } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BlogPostCard from "../../blog-post-card/blog-post-card";
import CenterContent from "../../center-content/center-content";
import LoadingIndicator from "../../loading-indicator/loading-indicator";

interface Props {
  displayName: string;
  bio: string;
  profilePicture: string | undefined;
  userPosts: any[],
  loadingUser: boolean,
  loadingBlogPosts: boolean
}

const ProfileView: React.FC<Props> = (props) => {
  const history = useHistory();
  return (
    <CenterContent>
      <div className="profile-page__profile-container">
        {
          props.loadingUser
          ?
            <LoadingIndicator/>
          :
            <div className="profile-page__info-container">
              <div className="profile-page__profile-information">
                <span className="profile-page__name">{props.displayName}</span>
                <span className="profile-page__bio">{props.bio}</span>
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
                {props.profilePicture ? (
                  <img
                    className="profile-page__picture"
                    src={props.profilePicture}
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
        }

        {
          props.loadingBlogPosts
          ?
            <LoadingIndicator/>
          :
            <div className="profile-page__post-container">
              {props.userPosts.map((post, idx) => {
                return <div key={idx} className="profile-page__post"><BlogPostCard data={post} key={idx}></BlogPostCard></div>
              })}
            </div>
        }

      </div>
    </CenterContent>
  );
};

export default ProfileView;
