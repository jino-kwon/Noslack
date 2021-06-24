import React from "react";
import "./Header.css";
import { Avatar } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import SearchIcon from "@material-ui/icons/Search";
import { useStateValue } from "../../StateProvider";

function Header() {
  const [{ user }] = useStateValue();
  return (
    <div className="header">
      <div className="header__left">
        {/* Time icon */}
        <AccessTimeIcon />
      </div>
      <div className="header__search">
        {/* Search Icon */}
        <SearchIcon />
        {/* Inupt */}
        <input
          placeholder="This is NOT the actual app our team is using, so feel free to leave anything!"
          type="text"
        />
      </div>
      <div className="header__right">
        {/* Avatars for logged in user */}
        <Avatar
          className="header__avatar"
          alt={user?.displayName}
          src={user?.photoURL}
        />
      </div>
    </div>
  );
}

export default Header;
