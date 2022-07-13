import FilterUser from "modules/adminUser/components/ManageUser/FilterUser/FilterUser";
import PaginationComponent from "modules/common/components/PaginationComponent/PaginationComponent";
import RemoveUser from "modules/adminUser/components/ManageUser/RemoveUser/RemoveUser";
import TableUser from "modules/adminUser/components/ManageUser/TableUser/TableUser";
import { useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "redux/reducer";
import { Action } from "redux";
import "./ManageUserPage.scss";
import { fetchThunk } from "modules/common/redux/thunk";
import { API_PATHS } from "configs/api";
import {
  changeFilterUser,
  clearDeleteAllUser,
  getUserList,
} from "modules/adminUser/redux/mangeUserReducer";
import Loading from "components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "configs/routes";
import { UserFilter } from "models/user";
export interface ManageUserPageProps {}

export default function ManageUserPage(props: ManageUserPageProps) {
  const navigate = useNavigate();
  const dispatch =
    useDispatch<ThunkDispatch<RootState, null, Action<string>>>();
  const { filters } = useSelector((state: RootState) => state.mangeUserReducer);
  const [totalPage, setTotalPage] = useState(25);
  const [loading, setLoading] = useState(false);
  const getData = useCallback(
    async (values: UserFilter) => {
      setLoading(true);
      const json = await dispatch(
        fetchThunk(API_PATHS.getUserList, "post", values)
      );
      setLoading(false);
      if (json.success) {
        setTotalPage(Number(json.recordsTotal));
        dispatch(getUserList(json.data));
        dispatch(clearDeleteAllUser());
      }
    },
    [dispatch]
  );

  const handleDelete = async (values: object) => {
    setLoading(true);
    const json = await dispatch(
      fetchThunk(API_PATHS.updateUserList, "post", { params: values })
    );
    if (json.success) {
      getData(filters);
    } else {
      setLoading(false);
    }
  };

  const handleChangeFilter = (values: object) => {
    dispatch(changeFilterUser(values));
  };

  useEffect(() => {
    getData(filters);
  }, [getData, filters]);
  return (
    <div id="ManageUserPage">
      {loading && <Loading />}
      <FilterUser />
      <Button
        variant="primary"
        className="mb-4 btn-add-user"
        onClick={() => navigate(ROUTES.newUser)}
      >
        Add User
      </Button>
      <TableUser />
      <PaginationComponent
        filters={filters}
        total={totalPage}
        handleChange={handleChangeFilter}
      />
      <RemoveUser handleDelete={handleDelete} />
    </div>
  );
}
