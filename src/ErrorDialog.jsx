import { useSelector } from "react-redux";

export default function ErrorDialog(props) {
  const { onOk, children } = props;
  const isDarkTheme = useSelector((state) => state.darkMode);

  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <div className="title-text">{children}</div>
        <div className="btn-gap">
          <button
            onClick={onOk}
            className={isDarkTheme ? "primary-btn" : "primary-dark-btn"}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}
