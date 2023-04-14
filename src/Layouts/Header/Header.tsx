import { AppContext } from "../../App";
import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "../../Assets/styles/css/Header.css"

function Header() {
  const { profile } = React.useContext(AppContext);

  return (
    <div className="row p-3 header-padding">
        <div className="text-white d-flex justify-content-between">
            <h1 className="mx-2">{profile.name}</h1>
            <img
                alt="Profile"
                src="./Images/apple.jpg"
                width="40px"
                height="40px"
                className="rounded-circle m-2"
            />
        </div>
    </div>
  );
}

export default Header