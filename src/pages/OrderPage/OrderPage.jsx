import React, { useState } from "react";
import { WrapperCountOrder, WrapperInfo, WrapperInputNumber, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperRight, WrapperStyleHeader, WrapperTotal } from "./style";
import { Checkbox, Form } from "antd";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import ButtonComponent from "../../compoments/ButtonComponent/ButtonComponent";
import ModalComponent from "../../compoments/ModalComponent/ModalComponent";
import Loading from '../../compoments/LoadingCompoment/Loading';
import { isPending } from "@reduxjs/toolkit";
import InputComponentProduct from "../../compoments/InputCompoment/InputComponentProduct";
import { useDispatch, useSelector } from "react-redux";
import { convertPrice } from "../../utils";
import { decreaseAmount, increaseAmount, removeAllOrderProduct, removeOrderProduct } from "../../redux/slices/orderSlice";



const OrderPage = () => {
  const order = useSelector((state) => state.order)
  const dispatch = useDispatch()
  const [listChecked, setListChecked] = useState([]);
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
  const handleOnchangeCheckAll = (e) => {
    if(e.target.checked){
      const newListChecked = []
      order?.orderItems?.forEach((item) => {
        newListChecked.push(item?.product)
      });
      setListChecked(newListChecked)
    }else{
      setListChecked([])
    }
   }
  const handleRemoveAllOrder = () => {
    if(listChecked.length > 1){
      dispatch(removeAllOrderProduct({listChecked}))
    }
   }
  const onChange = (e) => {
    if (listChecked.includes(e.target.value)) {
      const newListChecked = listChecked.filter((item) => item !== e.target.value);
      setListChecked(newListChecked)
    } else {
      setListChecked([...listChecked], e.target.value)
    }
  }
  const handleChangeCount = (type, idProduct) => {
    if (type === 'increase') {
      dispatch(increaseAmount({ idProduct }))
    }
    else {
      dispatch(decreaseAmount({ idProduct }))
    }
  }
  console.log("order", order)
  const handleDeleteOrder = (idProduct) => {
    dispatch(removeOrderProduct({ idProduct }))
  }
  const handleChangeAddress = () => { }
  const handleAddCard = () => { }
  const handleUpdateInforUser = () => { }
  const handleOnchangeDetails = () => { }
  const handleCancelUpdate = () => {
    setIsOpenModalUpdateInfo(false);
  };
  const [form] = Form.useForm();

  const [stateUserDetails, setStateUserDetails] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });



  return <div style={{ background: "#f5f5fa", with: "100%", height: "100vh" }}>
    <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
      <h3>Giỏ hàng</h3>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <WrapperLeft>
          <WrapperStyleHeader>
            <span style={{ display: "inline-block", width: "390px" }}>
              <Checkbox
                onChange={handleOnchangeCheckAll}
                checked={listChecked.length === order?.orderItems?.length}
              ></Checkbox>
              <span> Tất cả ({order?.orderItems?.length} sản phẩm)</span>
            </span>
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span>Đơn giá</span>
              <span>Số lượng</span>
              <span>Thành tiền</span>
              <DeleteOutlined
                style={{ cursor: "pointer" }}
                onClick={handleRemoveAllOrder}
              />
            </div>
          </WrapperStyleHeader>
          <WrapperListOrder>
            {order?.orderItems?.map((order) => {
              return (
                <WrapperItemOrder key={order?.product}>
                  <div
                    style={{
                      width: "390px",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <Checkbox
                      onChange={onChange}
                      value={order?.product}
                      checked={listChecked.includes(order?.product)}
                    ></Checkbox>
                    <img
                      src={order?.image}
                      style={{
                        width: "77px",
                        height: "79px",
                        objectFit: "cover",
                      }}
                    />
                    <div
                      style={{
                        width: 260,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {order?.name}
                    </div>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>
                      <span style={{ fontSize: "13px", color: "#242424" }}>
                        {convertPrice(order?.price)}
                      </span>
                    </span>
                    <WrapperCountOrder>
                      <button
                        style={{
                          border: "none",
                          background: "transparent",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          handleChangeCount(
                            "decrease",
                            order?.product,
                            order?.amount === 1
                          )
                        }
                      >
                        <MinusOutlined
                          style={{ color: "#000", fontSize: "14px", padding: "0 4px" }}
                        />
                      </button>
                      <WrapperInputNumber
                        defaultValue={order?.amount}
                        value={order?.amount}
                        size="small"
                        min={1}
                        max={order?.countInStock}
                      />
                      <button
                        style={{
                          border: "none",
                          background: "transparent",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          handleChangeCount(
                            "increase",
                            order?.product,
                            order?.amount === 1
                          )
                        }
                      >
                        <PlusOutlined
                          style={{ color: "#000", fontSize: "14px", padding: "0 4px" }}
                        />
                      </button>
                    </WrapperCountOrder>
                    <span
                      style={{
                        color: "rgb(255, 66, 78)",
                        fontSize: "13px",
                        fontWeight: 500,
                      }}
                    >
                      {convertPrice(order?.price * order?.amount)}
                    </span>
                    <DeleteOutlined
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDeleteOrder(order?.product)}
                    />
                  </div>
                </WrapperItemOrder>
              );
            })}
          </WrapperListOrder>
        </WrapperLeft>
        <WrapperRight>
          <div style={{ width: "100%" }}>
            <WrapperInfo>
              <div>
                <span style={{ color: "blue" }}>Địa chỉ giao hàng: </span>
                <span
                  style={{ fontWeight: "bold" }}
                >Vu Thu - Thai Binh</span>
              </div>
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={handleChangeAddress}
              >
                Thay đổi địa chỉ
              </span>
            </WrapperInfo>
            <WrapperInfo>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>Tạm tính</span>
                <span
                  style={{
                    color: "#000",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  100.000
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>Giảm giá</span>
                <span
                  style={{
                    color: "#000",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  {`5 %`}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>Phí giao hàng</span>
                <span
                  style={{
                    color: "#000",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  100.000
                </span>
              </div>
            </WrapperInfo>
            <WrapperTotal>
              <span>Tổng tiền</span>
              <span style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    color: "rgb(254, 56, 52)",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  100.000
                </span>
                <span style={{ color: "#000", fontSize: "11px" }}>
                  (Đã bao gồm VAT nếu có)
                </span>
              </span>
            </WrapperTotal>
          </div>
          <ButtonComponent
            onClick={() => handleAddCard()}
            size={40}
            styleButton={{
              background: "rgb(255, 57, 69)",
              height: "48px",
              width: "320px",
              border: "none",
              borderRadius: "4px",
            }}
            textButton={"Mua hàng"}
            styleTextButton={{
              color: "#fff",
              fontSize: "15px",
              fontWeight: "700",
            }}
          ></ButtonComponent>
        </WrapperRight>
      </div>
    </div>
    <ModalComponent
      title="Cập nhật thông tin giao hàng"
      open={isOpenModalUpdateInfo}
      onCancel={handleCancelUpdate}
      onOk={handleUpdateInforUser}
    >
      <Loading isPending={isPending}>
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          // onFinish={onUpdateUser}
          autoComplete="on"
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <InputComponentProduct
              value={stateUserDetails["name"]}
              onChange={handleOnchangeDetails}
              name="name"
            />
          </Form.Item>
          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: "Please input your city!" }]}
          >
            <InputComponentProduct
              value={stateUserDetails["city"]}
              onChange={handleOnchangeDetails}
              name="city"
            />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Please input your  phone!" }]}
          >
            <InputComponentProduct
              value={stateUserDetails.phone}
              onChange={handleOnchangeDetails}
              name="phone"
            />
          </Form.Item>
          <Form.Item
            label="Adress"
            name="address"
            rules={[
              { required: true, message: "Please input your  address!" },
            ]}
          >
            <InputComponentProduct
              value={stateUserDetails.address}
              onChange={handleOnchangeDetails}
              name="address"
            />
          </Form.Item>
        </Form>
      </Loading>
    </ModalComponent>
  </div>
};

export default OrderPage;
