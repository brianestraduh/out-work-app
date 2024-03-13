import { Link } from "react-router-dom";

export default function Card({ section, children }) {
  return (
    <div className="menu-card">
      <div>
        <span className="menu-card-icon-flex">
          <svg
            className="menu-card-icon"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </span>
      </div>
      <div className="menu-icon-text-margin">
        <h3 className="menu-card-title">
          <Link className="remove-focus-outline" to={`/${section}`}>
            {/*Extend touch target to entire panel*/}
            <span className="fill-space" aria-hidden="true"></span>
            {children}
          </Link>
        </h3>
        <p className="menu-card-description">
          Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit
          repellendus qui ut at blanditiis et quo et molestiae.
        </p>
      </div>
      <span className="menu-card-arrow" aria-hidden="true">
        <svg className="menu-card-icon" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"></path>
        </svg>
      </span>
    </div>
  );
}
