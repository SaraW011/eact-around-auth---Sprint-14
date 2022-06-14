import React from 'react';
import PopupWithForm from "./PopupWithForm";


export default function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

    // clear the input:
    React.useEffect(() => {
      avatarRef.current.value = '';
    }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      title="Change profile picture"
      buttonText="Save"
    >
      <input
        ref={avatarRef}
        id="input_type_avatar-url"
        type="url"
        className="form__input form__input_type_link"
        placeholder="avatar link"
        name="link"
        required
      />
      <span id="input_type_avatar-url-error" className="form__error"></span>
    </PopupWithForm>
  );
}
