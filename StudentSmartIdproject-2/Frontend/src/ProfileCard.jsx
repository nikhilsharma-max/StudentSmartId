import React, { useRef } from "react";
import "./ProfileCard.css";
import api from "./api/axios";
import { toast } from "react-toastify";
import { useState } from "react";

const ProfileCard = ({
  studentData,
  studentId,
  setStudentDetails
}) => {

  const fileInputRef = useRef(null);
const [photoLoading,setPhotoLoading] = useState(false);
  const handlePhotoUpload = async (e) => {
    setPhotoLoading(true);
    const file = e.target.files?.[0];

    if (!file) return;

    try {

      const formData = new FormData();

      formData.append(
        "photo",
        file
      );

      const response =
        await api.patch(
          `/student/${studentId}/photo`,
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data"
            }
          }
        );

      setStudentDetails(prev => ({
        ...prev,
        profilePhoto:
          response.data.photoUrl
      }));

      toast.success(
        "Photo updated successfully"
      );

    }
    catch (error) {

      console.log(error);

      toast.error(
        error?.response?.data?.message ||
        "Failed to upload photo"
      );

    }    
    finally{
      setPhotoLoading(false);
    }
  };

  return (

    <div className="profile-card-main-div">

    {
        photoLoading
        ?
        <div className="photo-loader">
            Uploading...
        </div>
        :
        <img
            className="profile-picture"
            src={
                studentData?.profilePhoto ||
                "/user-image.png"
            }
            alt="Profile"
        />
    }

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handlePhotoUpload}
      />

<label className="change-photo-btn">

    {
        photoLoading
        ?
        "Uploading..."
        :
        "Change Photo"
    }

    <input
        type="file"
        hidden
        onChange={handlePhotoUpload}
        disabled={photoLoading}
    />

</label>

      <p className="profile-name">
        {studentData?.name}
      </p>

      <p>
        Roll no. {studentData?.rollNumber}
      </p>

      <p>
        Class {studentData?.classId?.className}
      </p>

      <p>
        Section {studentData?.section}
      </p>

      <p>
        Admission no.
        {studentData?.admissionNumber}
      </p>

      <p>
        Ph no. {studentData?.phone}
      </p>

      <p>
        Session {studentData?.session}
      </p>

    </div>

  );
};

export default ProfileCard;