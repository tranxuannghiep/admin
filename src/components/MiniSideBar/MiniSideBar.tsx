import { FiTag } from "react-icons/fi";
import { TbUsers } from "react-icons/tb";
import { useLocation } from "react-router-dom";
import "./MiniSideBar.scss";
export interface MiniSideBarProps {
  setIsMenuMini: Function;
}

export default function MiniSideBar({ setIsMenuMini }: MiniSideBarProps) {
  const location = useLocation();
  return (
    <div id="MiniSideBar">
      <ul>
        <li
          className={
            location.pathname.includes("/pages/products") ? "active" : ""
          }
        >
          <div
            className="d-flex align-items-center justify-content-center"
            onClick={() => setIsMenuMini((prev: boolean) => !prev)}
          >
            <FiTag />
          </div>
        </li>
        <li
          className={location.pathname.includes("/pages/user") ? "active" : ""}
        >
          <div
            className="d-flex align-items-center justify-content-center "
            onClick={() => setIsMenuMini((prev: boolean) => !prev)}
          >
            <TbUsers />
          </div>
        </li>
      </ul>
    </div>
  );
}
