import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import "../../Assets/styles/css/Sidebar.css"
import Dropdown from 'react-bootstrap/Dropdown';
import { RxDashboard } from 'react-icons/rx';
import { MdOutlineLibraryAdd, MdOutlineProductionQuantityLimits } from 'react-icons/md'
import { ImTable2 } from 'react-icons/im'

function Sidebar() {
  return (
    <div className="sidebar d-flex flex-column">
    <NavLink to="/" className="text-black link">
      <div className="link-text px-2 py-2">
        <RxDashboard className="mx-2"/>
        Dashboard
      </div>
    </NavLink>
    <Dropdown className='sidebar-tab'>
      <Dropdown.Toggle className='toggle-button w-100' id="dropdown-basic">
        <MdOutlineProductionQuantityLimits  className="mx-2"/>
        Products
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <NavLink to={'/AddProduct'}
          className="text-black link">
          <div className="link-text px-2">
            <MdOutlineLibraryAdd className="mx-2"/>
            Add Product
          </div>
        </NavLink>
        <NavLink to={'/ViewProducts'}
          className="text-black link">
          <div className="link-text px-2">
            <ImTable2 className="mx-2"/>
            View Products
          </div>
        </NavLink>
      </Dropdown.Menu>
    </Dropdown>
  </div>
  
  );
}

export default Sidebar