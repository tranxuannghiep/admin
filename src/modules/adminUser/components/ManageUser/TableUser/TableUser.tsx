import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import TdTable from "../TdTableUser/TdTableUser";
import "./TableUser.scss";
import { RootState } from "redux/reducer";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import {
  changeDeleteAllUser,
  changeFilterUser,
  clearDeleteAllUser,
} from "modules/adminUser/redux/mangeUserReducer";
export interface TableUserProps {}

export default function TableUser(props: TableUserProps) {
  const { userList, filters, params } = useSelector(
    (state: RootState) => state.mangeUserReducer
  );
  const dispatch = useDispatch();
  const handleChangeAll = (e: any) => {
    if (e.target.checked) {
      dispatch(changeDeleteAllUser());
    } else {
      dispatch(clearDeleteAllUser());
    }
  };
  return (
    <div id="TableUser">
      <Table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={
                  userList.length === params.length && params.length !== 0
                }
                onChange={handleChangeAll}
              />
            </th>
            <th
              className="cursor-pointer"
              onClick={() =>
                dispatch(
                  changeFilterUser({
                    order_by: filters.order_by === "DESC" ? "ASC" : "DESC",
                    sort: "vendor",
                  })
                )
              }
            >
              Login/Email
              {filters.sort === "vendor" ? (
                filters.order_by === "DESC" ? (
                  <IoIosArrowRoundDown fontSize="20px" />
                ) : (
                  <IoIosArrowRoundUp fontSize="20px" />
                )
              ) : (
                true
              )}
            </th>
            <th
              className="cursor-pointer"
              onClick={() =>
                dispatch(
                  changeFilterUser({
                    order_by: filters.order_by === "DESC" ? "ASC" : "DESC",
                    sort: "fistName",
                  })
                )
              }
            >
              Name
              {filters.sort === "fistName" ? (
                filters.order_by === "DESC" ? (
                  <IoIosArrowRoundDown fontSize="20px" />
                ) : (
                  <IoIosArrowRoundUp fontSize="20px" />
                )
              ) : (
                true
              )}
            </th>
            <th
              className="cursor-pointer"
              onClick={() =>
                dispatch(
                  changeFilterUser({
                    order_by: filters.order_by === "DESC" ? "ASC" : "DESC",
                    sort: "access_level",
                  })
                )
              }
            >
              Access level
              {filters.sort === "access_level" ? (
                filters.order_by === "DESC" ? (
                  <IoIosArrowRoundDown fontSize="20px" />
                ) : (
                  <IoIosArrowRoundUp fontSize="20px" />
                )
              ) : (
                true
              )}
            </th>
            <th>Products</th>
            <th>Orders</th>
            <th>Wishlist</th>
            <th
              className="cursor-pointer"
              onClick={() =>
                dispatch(
                  changeFilterUser({
                    order_by: filters.order_by === "DESC" ? "ASC" : "DESC",
                    sort: "created",
                  })
                )
              }
            >
              Created
              {filters.sort === "created" ? (
                filters.order_by === "DESC" ? (
                  <IoIosArrowRoundDown fontSize="20px" />
                ) : (
                  <IoIosArrowRoundUp fontSize="20px" />
                )
              ) : (
                true
              )}
            </th>
            <th
              className="cursor-pointer"
              onClick={() =>
                dispatch(
                  changeFilterUser({
                    order_by: filters.order_by === "DESC" ? "ASC" : "DESC",
                    sort: "last_login",
                  })
                )
              }
            >
              Last Login
              {filters.sort === "last_login" ? (
                filters.order_by === "DESC" ? (
                  <IoIosArrowRoundDown fontSize="20px" />
                ) : (
                  <IoIosArrowRoundUp fontSize="20px" />
                )
              ) : (
                true
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <TdTable key={user.profile_id} user={user} />
          ))}
        </tbody>
      </Table>
    </div>
  );
}
