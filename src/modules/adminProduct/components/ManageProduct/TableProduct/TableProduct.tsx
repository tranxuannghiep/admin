import { Table } from "react-bootstrap";
import TdTableProduct from "../TdTableProduct/TdTableProduct";
import "./TableProduct.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducer";
import {
  changeDeleteAllProduct,
  changeFilterProduct,
  clearDeleteAllProduct,
} from "modules/adminProduct/redux/manageProductReducer";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";

export interface TableProductProps {
  handleUpdate: Function;
}

export default function TableProduct({ handleUpdate }: TableProductProps) {
  const { productList, params, filters } = useSelector(
    (state: RootState) => state.manageProductReducer
  );
  const dispatch = useDispatch();
  const handleChangeAll = (e: any) => {
    if (e.target.checked) {
      dispatch(changeDeleteAllProduct());
    } else {
      dispatch(clearDeleteAllProduct());
    }
  };
  return (
    <div id="TableProduct">
      <Table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={
                  productList.length === params.length && params.length !== 0
                }
                onChange={handleChangeAll}
              />
            </th>
            <th
              className="cursor-pointer"
              onClick={() =>
                dispatch(
                  changeFilterProduct({
                    order_by: filters.order_by === "DESC" ? "ASC" : "DESC",
                    sort: "sku",
                  })
                )
              }
            >
              SKU
              {filters.sort === "sku" ? (
                filters.order_by === "DESC" ? (
                  <IoIosArrowRoundUp fontSize="20px" />
                ) : (
                  <IoIosArrowRoundDown fontSize="20px" />
                )
              ) : (
                true
              )}
            </th>
            <th
              className="cursor-pointer"
              onClick={() =>
                dispatch(
                  changeFilterProduct({
                    order_by: filters.order_by === "DESC" ? "ASC" : "DESC",
                    sort: "name",
                  })
                )
              }
            >
              Name
              {filters.sort === "name" ? (
                filters.order_by === "DESC" ? (
                  <IoIosArrowRoundUp fontSize="20px" />
                ) : (
                  <IoIosArrowRoundDown fontSize="20px" />
                )
              ) : (
                true
              )}
            </th>
            <th>Category</th>
            <th
              className="cursor-pointer"
              onClick={() =>
                dispatch(
                  changeFilterProduct({
                    order_by: filters.order_by === "DESC" ? "ASC" : "DESC",
                    sort: "price",
                  })
                )
              }
            >
              Price
              {filters.sort === "price" ? (
                filters.order_by === "DESC" ? (
                  <IoIosArrowRoundUp fontSize="20px" />
                ) : (
                  <IoIosArrowRoundDown fontSize="20px" />
                )
              ) : (
                true
              )}
            </th>
            <th
              className="cursor-pointer"
              onClick={() =>
                dispatch(
                  changeFilterProduct({
                    order_by: filters.order_by === "DESC" ? "ASC" : "DESC",
                    sort: "amount",
                  })
                )
              }
            >
              In stock
              {filters.sort === "amount" ? (
                filters.order_by === "DESC" ? (
                  <IoIosArrowRoundUp fontSize="20px" />
                ) : (
                  <IoIosArrowRoundDown fontSize="20px" />
                )
              ) : (
                true
              )}
            </th>
            <th
              className="cursor-pointer"
              onClick={() =>
                dispatch(
                  changeFilterProduct({
                    order_by: filters.order_by === "DESC" ? "ASC" : "DESC",
                    sort: "vendor",
                  })
                )
              }
            >
              Vendor
              {filters.sort === "vendor" ? (
                filters.order_by === "DESC" ? (
                  <IoIosArrowRoundUp fontSize="20px" />
                ) : (
                  <IoIosArrowRoundDown fontSize="20px" />
                )
              ) : (
                true
              )}
            </th>
            <th
              className="cursor-pointer"
              onClick={() =>
                dispatch(
                  changeFilterProduct({
                    order_by: filters.order_by === "DESC" ? "ASC" : "DESC",
                    sort: "arrivalDate",
                  })
                )
              }
            >
              Arrival Date
              {filters.sort === "arrivalDate" ? (
                filters.order_by === "DESC" ? (
                  <IoIosArrowRoundUp fontSize="20px" />
                ) : (
                  <IoIosArrowRoundDown fontSize="20px" />
                )
              ) : (
                true
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {productList.map((val) => (
            <TdTableProduct
              handleUpdateProduct={(values: any) => handleUpdate(values)}
              key={val.id}
              product={val}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
}
