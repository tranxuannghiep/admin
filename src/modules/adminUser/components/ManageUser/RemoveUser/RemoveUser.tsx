import "./RemoveUser.scss";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducer";
import { Card, ListGroup } from "react-bootstrap";
import { useState } from "react";

export interface RemoveUserProps {
  handleDelete: Function;
}

export default function RemoveUser({ handleDelete }: RemoveUserProps) {
  const { params } = useSelector((state: RootState) => state.mangeUserReducer);
  const [openDialogRemove, setOpenDialogRemove] = useState(false);
  return (
    <div id="RemoveUser">
      <button
        className="btn"
        disabled={!params.length}
        onClick={() => setOpenDialogRemove(true)}
      >
        Remove selected
      </button>
      {openDialogRemove && (
        <div className="dialogRemove d-flex align-items-center justify-content-center">
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <span className="title">Confirm Delete</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="body">Do you want to delete this user?</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="d-flex justify-content-between align-items-center">
                  <button
                    className="btn"
                    onClick={() => {
                      setOpenDialogRemove(false);
                      handleDelete(params);
                    }}
                  >
                    YES
                  </button>
                  <button
                    className="btn"
                    onClick={() => setOpenDialogRemove(false)}
                  >
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
