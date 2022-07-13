import "./DetailUserPage.scss";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import TabListDetail from "modules/adminUser/components/DetailUser/TabListDetail/TabListDetail";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "redux/reducer";
import { Action } from "redux";
import { fetchThunk } from "modules/common/redux/thunk";
import { API_PATHS } from "configs/api";
import Loading from "components/Loading/Loading";
export interface DetailUserPageProps {}

export default function DetailUserPage(props: DetailUserPageProps) {
  const navigate = useNavigate();
  const dispatch =
    useDispatch<ThunkDispatch<RootState, null, Action<string>>>();
  const { id } = useParams();
  const [userDetail, setUserDetail] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const getUserDetailById = useCallback(
    async (id: string | undefined) => {
      setLoading(true);
      const json = await dispatch(
        fetchThunk(API_PATHS.getUserDetail, "post", { id })
      );
      setLoading(false);
      if (json.success) {
        setUserDetail(json.data.info);
      }
    },
    [dispatch]
  );
  const handleUpdate = useCallback(
    async (values: any) => {
      setLoading(true);
      const json = await dispatch(
        fetchThunk(API_PATHS.updateUserList, "post", {
          params: [values],
        })
      );
      if (json.success) {
        getUserDetailById(id);
      } else {
        setLoading(false);
      }
    },
    [dispatch, getUserDetailById, id]
  );
  useEffect(() => {
    getUserDetailById(id);
  }, [getUserDetailById, id]);
  if (loading) return <Loading />;
  return (
    <div id="DetailUserPage">
      <div
        className="back-to-prev d-flex align-items-center justify-content-center mb-2"
        onClick={() => navigate(-1)}
      >
        <BsArrowLeft />
      </div>
      <h4 className="title">
        {`${userDetail.email}`}
        {userDetail.companyName && ` (${userDetail.companyName})`}
      </h4>
      <TabListDetail handleUpdateUser={handleUpdate} userDetail={userDetail} />
    </div>
  );
}
