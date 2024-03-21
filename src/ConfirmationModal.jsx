import { useSelector } from "react-redux";

export default function ConfirmationModal(props) {
  const { onConfirm, onCancel, children } = props;
  const isDarkTheme = useSelector((state) => state.darkMode);
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <div className="title-text">{children}</div>
        <div className="btn-gap">
          <button
            onClick={onConfirm}
            className={isDarkTheme ? "primary-btn" : "primary-dark-btn"}
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className={isDarkTheme ? "secondary-btn" : "secondary-dark-btn"}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
