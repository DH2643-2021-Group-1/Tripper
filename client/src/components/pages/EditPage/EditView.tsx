import "./EditPage.scss";
import Button, { ButtonTypes } from "../../button/button";
import { faUpload, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextField from "@mui/material/TextField";

interface Props {
  firstName: string;
  setFirstName: Function;
  lastName: string;
  setLastName: Function;
  bio: string;
  setBio: Function;
  profilePicture: string | undefined;
  setProfilePicture: Function;
  previewImage: string;
  onSave: Function;
  onCancel: Function;
  onChangeProfilePicture: Function;
  changedImage: Boolean;
  onHover: Function;
  opacity: number;
  onClose: Function;
}

const EditView: React.FC<Props> = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  bio,
  setBio,
  profilePicture,
  setProfilePicture,
  previewImage,
  onSave,
  onCancel,
  onChangeProfilePicture,
  changedImage,
  onHover,
  opacity,
  onClose,
}) => {
  return (
    <div className="edit-page__container">
      <div className="edit-page__form-conatiner">
        <h1>Edit profile</h1>
        <form>
          <div className="edit-page__profile-picture">
            <label>Profile Picture</label>
            <div className="edit-page__image-uploader">
              {changedImage ? (
                <>
                  <div
                    className="edit-page__image-uploader-remove"
                    onMouseOver={() => onHover()}
                    onMouseOut={() => onHover()}
                    onClick={() => onClose()}
                  >
                    <img
                      className="edit-page__picture"
                      src={previewImage}
                      alt="profile"
                    />
                    <FontAwesomeIcon
                      icon={faClose}
                      className="edit-page__close-icon"
                      opacity={opacity}
                    />
                  </div>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faUpload} size="4x" />
                  <input
                    type="file"
                    onChange={(e) => onChangeProfilePicture(e)}
                  />
                </>
              )}
            </div>
          </div>
          <div className="edit-page__name">
            <label>First Name</label>
            <TextField
              id="outlined-basic"
              label="First Name"
              value={firstName}
              variant="outlined"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="edit-page__name">
            <label>Last Name</label>
            <TextField
              id="outlined-basic"
              label="Last Name"
              value={lastName}
              variant="outlined"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="edit-page__bio">
            <label>Biography</label>
            <TextField
              id="outlined-multiline-static"
              label="Bio"
              multiline
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
        </form>
        <div className="edit-page__buttons">
          <Button type={ButtonTypes.secondary} onPress={() => onCancel()}>
            Cancel
          </Button>
          <Button
            type={ButtonTypes.primary}
            onPress={() => onSave(firstName, lastName, bio, profilePicture)}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditView;
