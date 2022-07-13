import "./SideBar.scss";
import { TbUsers } from "react-icons/tb";
import { AiOutlineLeft } from "react-icons/ai";
import { FiTag } from "react-icons/fi";
import { useState } from "react";
import { Collapse } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "configs/routes";
export interface SideBarProps {}

export default function SideBar(props: SideBarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [openCatalog, setOpenCatalog] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  return (
    <div id="SideBar">
      <ul>
        <li
          onClick={() => setOpenCatalog(!openCatalog)}
          className={
            location.pathname.includes("/pages/products") ? "active" : ""
          }
        >
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <FiTag />
              <span>Catalog</span>
            </div>
            <AiOutlineLeft className={openCatalog ? "rotate-90" : ""} />
          </div>
        </li>
        <Collapse in={openCatalog}>
          <ul>
            <li
              onClick={() => {
                navigate(ROUTES.manageProduct);
              }}
              className={
                location.pathname.includes("/pages/products/manage-product")
                  ? "active"
                  : ""
              }
            >
              Product
            </li>
          </ul>
        </Collapse>
        <li
          onClick={() => setOpenUser(!openUser)}
          className={location.pathname.includes("/pages/user") ? "active" : ""}
        >
          <div className="d-flex align-items-center justify-content-between ">
            <div className="d-flex align-items-center">
              <TbUsers />
              <span>User</span>
            </div>
            <AiOutlineLeft className={openUser ? "rotate-90" : ""} />
          </div>
        </li>
        <Collapse in={openUser}>
          <ul>
            <li
              onClick={() => {
                navigate(ROUTES.manageUser);
              }}
              className={
                location.pathname.includes("/pages/user/manage-user")
                  ? "active"
                  : ""
              }
            >
              User list
            </li>
          </ul>
        </Collapse>
      </ul>
    </div>
  );
}
