import { ROUTES } from "configs/routes";
import { UserDetail } from "models/user";
import { BsCurrencyDollar } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./AccountDetail.scss";

export interface AccountDetailProps {
  userDetail: UserDetail;
}

export default function AccountDetail({ userDetail }: AccountDetailProps) {
  const navigate = useNavigate();
  return (
    <div id="AccountDetail">
      <div className="row mb-4">
        <label className="col-sm-3 text-right">Orders placed as a buyer</label>
        <div className="col-sm-3">
          <label className=" d-flex align-items-center">
            <span className="link me-1">{userDetail.order_as_buyer}</span>
            (<BsCurrencyDollar fontSize="15px" />
            {Number(userDetail.order_as_buyer_total).toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
            )
          </label>
        </div>
      </div>

      <div className="row mb-4">
        <label className="col-sm-3 text-right">Vendor Income</label>
        <div className="col-sm-3">
          <label className=" d-flex align-items-center">
            <BsCurrencyDollar fontSize="15px" />
            {Number(userDetail.income).toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </label>
        </div>
      </div>

      <div className="row mb-4">
        <label className="col-sm-3 text-right">Vendor Expense</label>
        <div className="col-sm-3">
          <label className=" d-flex align-items-center">
            <BsCurrencyDollar fontSize="15px" />
            {Number(userDetail.expense).toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </label>
        </div>
      </div>
      <div className="row mb-4">
        <label className="col-sm-3 text-right link">
          View transaction details
        </label>
      </div>
      <div className="row mb-4">
        <label className="col-sm-3 text-right">Earning balance</label>
        <div className="col-sm-3">
          <label className=" d-flex align-items-center">
            <BsCurrencyDollar fontSize="15px" />
            {userDetail.earning}
          </label>
        </div>
      </div>
      <div className="row mb-4">
        <label className="col-sm-3 text-right">Products listed as vendor</label>
        <div className="col-sm-3">
          <label
            className="link"
            onClick={() =>
              navigate(
                `${ROUTES.manageProduct}?vendor=${userDetail.profile_id}`
              )
            }
          >
            {userDetail.products_total}
          </label>
        </div>
      </div>
      {userDetail.joined && (
        <div className="row mb-4">
          <label className="col-sm-3 text-right">Joined</label>
          <div className="col-sm-3">
            <label>
              {new Date(Number(userDetail.joined) * 1000).toLocaleString(
                "en-US",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </label>
          </div>
        </div>
      )}
      {userDetail.last_login && (
        <div className="row mb-4">
          <label className="col-sm-3 text-right">Last login</label>
          <div className="col-sm-3">
            <label>
              {new Date(Number(userDetail.last_login) * 1000).toLocaleString(
                "en-US",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </label>
          </div>
        </div>
      )}

      <div className="row mb-4">
        <label className="col-sm-3 text-right">Language</label>
        <div className="col-sm-3">
          <label>{userDetail.language}</label>
        </div>
      </div>
      <div className="row">
        <label className="col-sm-3 text-right">Referer</label>
        <div className="col-sm-3">
          <label>{userDetail.referer}</label>
        </div>
      </div>
    </div>
  );
}
