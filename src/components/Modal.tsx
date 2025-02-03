import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ModalDataProps } from "../interfaces";
import { fetchPhotoStatistic } from "../api";
import "./componentsCSS/Modal.css";

function Modal(props: ModalDataProps) {
  const [modal, setModal] = useState(false);

  const {
    data: statistics,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["photoStats", props.id],
    queryFn: () => fetchPhotoStatistic(props.id),
    enabled: modal,
    staleTime: 1000 * 30 * 1, // 5 minutes
  });

  const toggleModal = () => {
    setModal((modal) => !modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      <div onClick={toggleModal} className="imageModalToggle">
        <img
          src={props.urls.small}
          alt={props.description}
          className="mini-image"
        />
      </div>
      {modal && (
        <div className="modal" onClick={toggleModal}>
          <div className="innerPicContainer">
            <img className="big-image" src={props.urls.full} alt="bigPic" />
          </div>
          <div className="infoBar">
            <div className="downloads">
              {isLoading
                ? "Loading..."
                : error || !statistics
                ? "Error loading stats"
                : `Downloads: ${statistics.downloads.total}`}
            </div>
            <div className="likes">Likes: {props.likes}</div>
            <div className="views">
              {isLoading
                ? "Loading..."
                : error
                ? "Error loading stats"
                : `Views: ${statistics?.views.total}`}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
