import "./EditPage.scss";
import Button, { ButtonTypes } from "../../button/button";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  name: string;
  setName: Function;
  bio: string;
  setBio: Function;
  onSave: Function;
  onCancel: Function;
  onChangeProfilePicture: Function;
}

const EditView: React.FC<Props> = ({
  name,
  setName,
  bio,
  setBio,
  onSave,
  onCancel,
  onChangeProfilePicture,
}) => {
  return (
    <div className="editPageContainer">
      <div className="editFormConatiner">
        <h1>Edit profile</h1>
        <form>
          <div className="editProfilePicture">
            <label>Profile Picture</label>
            <div className="imageUploader">
              <FontAwesomeIcon icon={faUpload} size="4x" />
              <input type="file" onChange={(e) => onChangeProfilePicture(e)} />
            </div>
          </div>
          <div className="editName">
            <label>Name</label>
            <input
              type="text"
              autoFocus={true}
              placeholder={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={20}
            />
          </div>
          <div className="editBio">
            <label>Biography</label>
            <textarea
              className="bioTextarea"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={210}
            ></textarea>
          </div>
        </form>
        <div className="buttons">
          <Button type={ButtonTypes.secondary} onPress={() => onCancel()}>
            Cancel
          </Button>
          <Button type={ButtonTypes.primary} onPress={() => onSave(name, bio)}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditView;
