import React, { useState } from "react";
import { X, User, Mail, Phone } from "lucide-react";
import "../Styles/Popups/EditProfile.css";

export default function EditProfile({ user, onClose, onSave }) {
  const [formData, setFormData] = useState({
    id: user?.id,
    email: user?.email,
    name: user?.name,
    phone: user?.phone,
    roleHash: user?.roleHash,
    joinDate: new Date(user?.joinDate).toISOString(),
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSave) onSave(formData);
  };

  return (
    <div className="EditProfileOverlay">
      <div className="EditProfileContainer">
        <div className="EditProfileHeader">
          <h2 className="EditProfileTitle">Edit Profile</h2>
          <button className="EditProfileClose" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form className="EditProfileForm" onSubmit={handleSubmit}>
          {/* Name */}
          <label className="EditProfileLabel" htmlFor="name">
            Name
          </label>
          <div className="EditProfileInputWrapper">
            <User size={16} className="EditProfileIcon" />
            <input
              id="name"
              name="name"
              className="EditProfileInput"
              placeholder="Ahmed Soliman"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <label className="EditProfileLabel" htmlFor="email">
            Email
          </label>
          <div className="EditProfileInputWrapper">
            <Mail size={16} className="EditProfileIcon" />
            <input
              id="email"
              name="email"
              type="email"
              className="EditProfileInput"
              placeholder="john.doe@email.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Phone */}
          <label className="EditProfileLabel" htmlFor="phone">
            Phone
          </label>
          <div className="EditProfileInputWrapper">
            <Phone size={16} className="EditProfileIcon" />
            <input
              id="phone"
              name="phone"
              className="EditProfileInput"
              placeholder="+123456789"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="EditProfileActions">
            <button
              type="button"
              className="EditProfileButton EditProfileCancel"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="EditProfileButton EditProfileConfirm"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
