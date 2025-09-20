import { Link, useLocation } from "react-router-dom";
import dashboardicon from "../Assets/dashboard.png";
import usericon from "../Assets/user.png";
import notificationicon from "../Assets/notifications.png";
import membersicon from "../Assets/group.png";
import schoolicon from "../Assets/school.png";
import "../Styles/Components/Navbar.css";

// Try to import motion safely
let motion;
try {
  motion = require("framer-motion").motion;
} catch {
  motion = null; // No framer-motion installed
}

export default function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navLinks = [
    { path: "/dashboard", label: "Dashboard", icon: dashboardicon },
    { path: "/profile", label: "Profile", icon: usericon },
    { path: "/notifications", label: "Notifications", icon: notificationicon },
    { path: "/members", label: "Members", icon: membersicon }
  ];

  return (
    <div className="NavbarContainer">
      <h1 className="NavbarTitle">School Task Manager</h1>

      <div className="NavigationsContainer">
        {navLinks.map((link) => {
          const isActive = currentPath === link.path;

          const ImgTag = motion ? motion.img : "img";
          const LabelTag = motion ? motion.label : "label";
          const UnderlineTag = motion ? motion.div : "div";

          return (
            <Link
              key={link.path}
              to={link.path}
              className={isActive ? "SelectedLink" : "NormalLink"}
            >
              <ImgTag
                src={link.icon}
                alt={link.label}
                className="LinkImage"
                {...(motion && {
                  animate: {
                    filter: isActive
                      ? "brightness(0) saturate(100%) invert(18%) sepia(89%) saturate(7500%) hue-rotate(-10deg) brightness(95%) contrast(105%)"
                      : "none"
                  },
                  transition: { duration: 0.3 }
                })}
              />
              <LabelTag
                className="LinkLabel"
                {...(motion && {
                  animate: { color: isActive ? "#EF3131" : "gray" },
                  transition: { duration: 0.3 }
                })}
              >
                {link.label}
              </LabelTag>

              {isActive && (
                <UnderlineTag
                  className="NavbarUnderline"
                  {...(motion && {
                    layoutId: "navbar-underline",
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                  })}
                />
              )}
            </Link>
          );
        })}
      </div>

      <div className="NavbarIconFrame">
        <img className="NavbarIcon" src={schoolicon} alt="School" />
      </div>
    </div>
  );
}
