import { ROUTES } from "configs/routes";
import { Product } from "models/products";
import {
  changeDeleteProduct,
  changeParamsUpdate,
  Params,
} from "modules/adminProduct/redux/manageProductReducer";
import { forwardRef, useEffect, useRef, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { BsCurrencyDollar } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { TbPower } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "redux/reducer";
import { formatPrice } from "utils/formatInputPrice";

export interface TdTableProductProps {
  product: Product;
  handleUpdateProduct: Function;
}
const InputUpdatePrice = forwardRef<HTMLInputElement, any>((props, ref) => (
  <input ref={ref} {...props} />
));
const InputUpdateStock = forwardRef<HTMLInputElement, any>((props, ref) => (
  <input ref={ref} {...props} step="1" />
));
const checkItemRemove = (params: Params[], product: any) => {
  return params.findIndex((val) => val.id === product.id) !== -1;
};
export default function TdTableProduct({
  product,
  handleUpdateProduct,
}: TdTableProductProps) {
  const dispatch = useDispatch();
  const { productList, params } = useSelector(
    (state: RootState) => state.manageProductReducer
  );
  const navigate = useNavigate();
  const [isUpdate, setIsUpdate] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [inputValue, setInputValue] = useState({
    id: product.id,
    price: product.price,
    stock: product.amount,
  });
  const refPrice = useRef<any>(null);
  const refStock = useRef<any>(null);
  const handleDelete = () => {
    dispatch(changeDeleteProduct({ id: product.id, delete: 1 }));
  };

  useEffect(() => {
    setInputValue({
      id: product.id,
      price: product.price,
      stock: product.amount,
    });
  }, [productList, product]);

  return (
    <tr className={checkItemRemove(params, product) ? "item-remove" : ""}>
      <td>
        <div className="dash-right d-flex align-items-center">
          <div className="input-checkbox">
            <input
              type="checkbox"
              checked={checkItemRemove(params, product)}
              onChange={handleDelete}
            />
          </div>
          <div className="icon-power" onClick={() => setOpenDialog(true)}>
            <TbPower
              fontSize="22px"
              className={Boolean(Number(product.enabled)) ? "active" : ""}
            />
          </div>
          {openDialog && (
            <div className="dialogRemove d-flex align-items-center justify-content-center">
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <span className="title">Confirm Update</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className="body">
                      Do you want to update this product?
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="d-flex justify-content-between align-items-center">
                      <button
                        className="btn"
                        onClick={() => {
                          setOpenDialog(false);
                          if (handleUpdateProduct) {
                            handleUpdateProduct([
                              {
                                id: product.id,
                                enable: Number(product.enabled) === 0 ? 1 : 0,
                              },
                            ]);
                          }
                        }}
                      >
                        YES
                      </button>
                      <button
                        className="btn"
                        onClick={() => {
                          setOpenDialog(false);
                        }}
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
      </td>
      <td>
        <div>
          <span>{product.sku}</span>
        </div>
      </td>
      <td
        className="link mw-300"
        onClick={() => navigate(`${ROUTES.detailProduct}/${product.id}`)}
      >
        {product.name}
      </td>
      <td className="mw-200">{product.category}</td>
      <td>
        {isUpdate ? (
          <div className="bg-dollar d-flex align-items-center">
            <div className="icon-dollar">
              <BsCurrencyDollar />
            </div>
            <InputUpdatePrice
              type="text"
              className="form-control"
              ref={refPrice}
              value={formatPrice(inputValue.price)}
              onChange={(e: any) => {
                setInputValue({
                  ...inputValue,
                  price: formatPrice(e.target.value) || inputValue.price,
                });
              }}
              onBlur={() => {
                dispatch(changeParamsUpdate({ ...inputValue }));
                setIsUpdate(false);
              }}
            />
          </div>
        ) : (
          <div
            className="view edittable d-flex align-items-center"
            onClick={() => {
              setIsUpdate(true);
              setTimeout(() => {
                refPrice.current.focus();
              }, 100);
            }}
          >
            <BsCurrencyDollar />
            <span>
              {Number(inputValue.price).toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
        )}
      </td>
      <td>
        {isUpdate ? (
          <InputUpdateStock
            type="text"
            className="form-control"
            ref={refStock}
            value={formatPrice(inputValue.stock)}
            onChange={(e: any) =>
              setInputValue({
                ...inputValue,
                stock: formatPrice(e.target.value) || inputValue.stock,
              })
            }
            onBlur={() => {
              dispatch(changeParamsUpdate({ ...inputValue }));
              setIsUpdate(false);
            }}
          />
        ) : (
          <div
            className="view edittable d-flex align-items-center"
            onClick={() => {
              setIsUpdate(true);
              setTimeout(() => {
                refStock.current.focus();
              }, 100);
            }}
          >
            <span>{inputValue.stock}</span>
          </div>
        )}
      </td>
      <td
        className="link mw-120"
        onClick={() => navigate(`${ROUTES.detailUser}/${product.vendorID}`)}
      >
        {product.vendor}
      </td>
      <td>
        {product.arrivalDate === "0"
          ? "--"
          : new Date(Number(product.arrivalDate) * 1000).toLocaleString(
              "en-US",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }
            )}
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
