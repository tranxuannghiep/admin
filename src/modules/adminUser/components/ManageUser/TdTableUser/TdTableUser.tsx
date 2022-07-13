import { ROUTES } from "configs/routes";
import { User } from "models/user";
import {
  changeDeleteUser,
  Params,
} from "modules/adminUser/redux/mangeUserReducer";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "redux/reducer";

export interface TdTableProps {
  user: User;
}
const checkItemRemove = (params: Params[], user: User) => {
  return params.findIndex((val) => val.id === user.profile_id) !== -1;
};
export default function TdTable({ user }: TdTableProps) {
  const navigate = useNavigate();
  const { params } = useSelector((state: RootState) => state.mangeUserReducer);
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(changeDeleteUser({ id: user.profile_id, delete: 1 }));
  };
  return (
    <tr className={checkItemRemove(params, user) ? "item-remove" : ""}>
      <td>
        <div className="dash-right">
          <input
            type="checkbox"
            checked={checkItemRemove(params, user)}
            onChange={handleDelete}
          />
        </div>
      </td>
      <td>
        <div>
          <span
            className="link"
            onClick={() => navigate(`${ROUTES.detailUser}/${user.profile_id}`)}
          >
            {user.vendor}
          </span>
          <p>{user.storeName}</p>
        </div>
      </td>
      <td className="link">
        {user.fistName && `${user.fistName} ${user.lastName}`}
      </td>
      <td>{user.access_level}</td>
      <td
        className="link"
        onClick={() =>
          navigate(`${ROUTES.manageProduct}?vendor=${user.profile_id}`)
        }
      >
        {user.product}
      </td>
      <td className={user.order.order_as_buyer > 0 ? "link" : ""}>
        {user.order.order_as_buyer}
      </td>
      <td className="link">{user.wishlist}</td>
      <td>
        {new Date(Number(user.created) * 1000).toLocaleString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </td>
      <td>
        {user.last_login !== "0"
          ? new Date(Number(user.last_login) * 1000).toLocaleString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "Never"}
      </td>
      <td>
        <div className="dash-left">
          <div className="delete" onClick={handleDelete}>
            <MdDelete />
          </div>
        </div>
      </td>
    </tr>
  );
}
