import "./Header.scss";
import { AiOutlineMenu, AiOutlineBell } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "configs/routes";
import { AUTH } from "utils/constants";
import { useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
export interface HeaderProps {
  setIsMenuMini: Function;
}
export default function Header({ setIsMenuMini }: HeaderProps) {
  const user = JSON.parse(localStorage.getItem("user") || "");
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <div id="Header">
      <div className="logo">
        <div
          className="logo-icon-menu"
          onClick={() => setIsMenuMini((prev: boolean) => !prev)}
        >
          <AiOutlineMenu />
        </div>
        <h3 className="title">Gear Focus Admin</h3>
        <div className="logo-icon-bell">
          <AiOutlineBell />
        </div>
      </div>
      <div className="icon-user">
        <BiUser />
        <div className="profile-user">
          <span
            onClick={() => navigate(`${ROUTES.detailUser}/${user.profile_id}`)}
          >
            My profile
          </span>
          <p>{user.login}</p>
          <span onClick={() => setOpenDialog(true)}>Log out</span>
        </div>
      </div>
      {openDialog && (
        <div className="dialogRemove d-flex align-items-center justify-content-center">
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <span className="title">Log Out</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="body">Are you sure want to log out?</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="d-flex justify-content-between align-items-center">
                  <button
                    className="btn"
                    onClick={() => {
                      setOpenDialog(false);
                      localStorage.removeItem("user");
                      localStorage.removeItem(AUTH);
                      navigate(ROUTES.login);
                    }}
                  >
                    YES
                  </button>
                  <button className="btn" onClick={() => setOpenDialog(false)}>
                    NO
                  </button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </div>
      )}
    </div>
  );
}
