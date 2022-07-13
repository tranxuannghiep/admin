import { useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducer";
import "./BtnUpdateProduct.scss";
export interface IBtnUpdateProductProps {
  handleUpdate: Function;
}

export default function BtnUpdateProduct({
  handleUpdate,
}: IBtnUpdateProductProps) {
  const { params, paramsUpdate } = useSelector(
    (state: RootState) => state.manageProductReducer
  );

  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div id="BtnUpdateProduct">
      <button
        className="btn"
        disabled={!params.length && !paramsUpdate.length}
        onClick={() => setOpenDialog(true)}
      >
        {!params.length ? "Save changes" : "Remove selected"}
      </button>
      {openDialog && (
        <div className="dialogRemove d-flex align-items-center justify-content-center">
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <span className="title">
                  {!params.length ? "Confirm Update" : "Confirm Delete"}
                </span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="body">
                  {!params.length
                    ? "Do you want to update this product?"
                    : "Do you want to delete this product?"}
                </span>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="d-flex justify-content-between align-items-center">
                  <button
                    className="btn"
                    onClick={() => {
                      setOpenDialog(false);
                      if (!params.length) handleUpdate(paramsUpdate);
                      else handleUpdate(params);
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
