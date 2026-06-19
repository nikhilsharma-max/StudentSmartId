import React, { useEffect, useState } from "react";
import "./NotificationPageContent.css";
import Navbar from "../Navbar";
import api from "../api/axios";
import { toast } from "react-toastify";
import { Trash2, Bell } from "lucide-react";

const NotificationPageContent = () => {
  const [schoolName, setSchoolName] = useState("School's Name");

  const [notifications, setNotifications] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [title, setTitle] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [audienceType, setAudienceType] =
    useState("All");

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [selectedNotification, setSelectedNotification] =
    useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const schoolResponse =
        await api.get("/schoolSetting");

      setSchoolName(
        schoolResponse?.data?.data?.[0]
          ?.schoolName || "School's Name"
      );

      const notificationResponse =
        await api.get("/notification");

      setNotifications(
        notificationResponse?.data?.data ||
          []
      );
    } catch (error) {
      toast.error(
        "Failed to load notifications"
      );
    }
  };

  const createNotification =
    async (e) => {
      e.preventDefault();

      if (!title.trim()) {
        return toast.error(
          "Title is required"
        );
      }

      if (!message.trim()) {
        return toast.error(
          "Message is required"
        );
      }

      try {
        setLoading(true);

        await api.post(
          "/notification",
          {
            title,
            message,
            audienceType,
          }
        );

        toast.success(
          "Notification created"
        );

        setTitle("");
        setMessage("");
        setAudienceType("All");

        getData();
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            "Failed to create notification"
        );
      } finally {
        setLoading(false);
      }
    };

  const handleDeleteClick = (
    notification
  ) => {
    setSelectedNotification(
      notification
    );
    setShowDeleteModal(true);
  };

  const deleteNotification =
    async () => {
      try {
        await api.delete(
          `/notification/${selectedNotification._id}`
        );

        toast.success(
          "Notification deleted"
        );

        setShowDeleteModal(false);

        getData();
      } catch (error) {
        toast.error(
          "Failed to delete notification"
        );
      }
    };

  return (
    <div className="notification-page-content">
      <Navbar
        SchoolName={schoolName}
      />

      <div className="notification-header">
        <div>
          <p>
            Notification Management
          </p>
          <h1>
            Create and manage school
            notifications
          </h1>
        </div>
      </div>

      <div className="notification-form-card">
        <div className="card-title">
          <Bell size={20} />
          <span>
            Create Notification
          </span>
        </div>

        <form
          onSubmit={
            createNotification
          }
        >
          <input
            type="text"
            placeholder="Notification title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
          />

          <select
            value={audienceType}
            onChange={(e) =>
              setAudienceType(
                e.target.value
              )
            }
          >
            <option value="All">
              All
            </option>
            <option value="Students">
              Students
            </option>
            <option value="Teachers">
              Teachers
            </option>
            <option value="Parents">
              Parents
            </option>
          </select>

          <textarea
            rows="5"
            placeholder="Write notification message..."
            value={message}
            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Sending..."
              : "Send Notification"}
          </button>
        </form>
      </div>

      <div className="notification-table">
        <div className="table-header">
          <h2>
            Notification History
          </h2>
        </div>

        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Audience</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {notifications.length >
            0 ? (
              notifications.map(
                (
                  notification
                ) => (
                  <tr
                    key={
                      notification._id
                    }
                  >
                    <td>
                      {
                        notification.title
                      }
                    </td>

                    <td>
                      {
                        notification.audienceType
                      }
                    </td>

                    <td>
                      {new Date(
                        notification.createdAt
                      ).toLocaleDateString()}
                    </td>

                    <td>
                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDeleteClick(
                            notification
                          )
                        }
                      >
                        <Trash2
                          size={16}
                        />
                      </button>
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="empty-row"
                >
                  No notifications
                  found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showDeleteModal && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">
            <h2>
              Delete Notification
            </h2>

            <p>
              Are you sure you want
              to delete this
              notification?
            </p>

            <div className="modal-buttons">
              <button
                onClick={() =>
                  setShowDeleteModal(
                    false
                  )
                }
              >
                Cancel
              </button>

              <button
                onClick={
                  deleteNotification
                }
                className="delete-confirm-btn"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPageContent;