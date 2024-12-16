import React from "react";
import {
    WrapperAllPrice,
    WrapperContentInfo,
    WrapperHeaderUser,
    WrapperInfoUser,
    WrapperItem,
    WrapperItemLabel,
    WrapperLabel,
    WrapperNameProduct,
    WrapperProduct,
    WrapperStyleContent,
} from "./style";
import { useLocation, useParams } from "react-router-dom";
import * as OrderService from "../../services/orderService";
import { useQuery } from "@tanstack/react-query";
import { orderContant } from "../../contant";
import { convertPrice } from "../../utils";
import { useMemo } from "react";
import Loading from "../../compoments/LoadingCompoment/Loading";

const DetailsOrderPage = () => {
    const params = useParams();
    const location = useLocation();
    const { state } = location;
    const { id } = params;

    const fetchDetailsOrder = async () => {
        const res = await OrderService.getDetailsOrder(id, state?.token);
        return res.data;
    };

    const queryOrder = useQuery(
        {
            queryKey: ["orders-details"], queryFn: fetchDetailsOrder,
            enabled: Boolean(id)
        }
    );
    const { isPending, data } = queryOrder;
    console.log("datadata", data)
    const priceMemo = useMemo(() => {
        const result = data?.orderItems?.reduce((total, cur) => {
            return total + cur.price * cur.amount;
        }, 0);
        return result;
    }, [data]);

    return (
        <Loading isPending={isPending}>
            <div style={{ width: "100%", height: "100vh", background: "#f5f5fa" }}>
                <div style={{ width: "1270px", margin: "0 auto" }}>
                    <h4>Chi tiết đơn hàng</h4>
                    <WrapperHeaderUser>
                        <WrapperInfoUser>
                            <WrapperLabel>Địa chỉ người nhận</WrapperLabel>
                            <WrapperContentInfo>
                                <div className="name-info">
                                    {data?.shippingAddress?.fullName}
                                </div>
                                <div className="address-info">
                                    <span>Địa chỉ: </span>
                                    {`${data?.shippingAddress?.address} - ${data?.shippingAddress?.city}`}
                                </div>
                                <div className="phone-info">
                                    <span>Điện thoại: </span> {data?.shippingAddress?.phone}
                                </div>
                            </WrapperContentInfo>
                        </WrapperInfoUser>
                        <WrapperInfoUser>
                            <WrapperLabel>Hình thức giao hàng</WrapperLabel>
                            <WrapperContentInfo>
                                <div className="delivery-info">
                                    <span className="name-delivery">{orderContant.dilivery[data?.shippingMethod]}</span>
                                    - giao hàng tiết kiệm
                                </div>
                                <div className="delivery-fee">
                                    <span>Phí giao hàng: </span> {convertPrice(data?.ShippingPrice)}
                                </div>
                            </WrapperContentInfo>
                        </WrapperInfoUser>
                        <WrapperInfoUser>
                            <WrapperLabel>Hình thức thanh toán</WrapperLabel>
                            <WrapperContentInfo>
                                <div className="payment-info">
                                    {orderContant.payment[data?.paymentMethod]}
                                </div>
                                <div className="status-payment">
                                    {data?.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                                </div>
                            </WrapperContentInfo>
                        </WrapperInfoUser>
                    </WrapperHeaderUser>
                    <WrapperStyleContent>
                        <div
                            style={{
                                flex: 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <div style={{ width: "670px" }}>Sản phẩm</div>
                            <WrapperItemLabel>Giá</WrapperItemLabel>
                            <WrapperItemLabel>Số lượng</WrapperItemLabel>
                            <WrapperItemLabel>Giảm giá</WrapperItemLabel>
                        </div>
                        {data?.orderItems?.map((order) => {
                            return (
                                <WrapperProduct>
                                    <WrapperNameProduct>
                                        <img
                                            src={order?.image}
                                            style={{
                                                width: "70px",
                                                height: "70px",
                                                objectFit: "cover",
                                                border: "1px solid rgb(238, 238, 238)",
                                                padding: "2px",
                                            }}
                                        />
                                        <div
                                            style={{
                                                width: 260,
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                                marginLeft: "10px",
                                                height: "70px",
                                            }}
                                        >
                                            {order?.name}
                                        </div>
                                    </WrapperNameProduct>
                                    <WrapperItem>{convertPrice(order?.price)}</WrapperItem>
                                    <WrapperItem>{order?.amount}</WrapperItem>
                                    <WrapperItem>
                                        {order?.discount
                                            ? convertPrice((priceMemo * order?.discount) / 100)
                                            : "0 đ"}
                                    </WrapperItem>
                                </WrapperProduct>
                            );
                        })}
                        <WrapperAllPrice>
                            <WrapperItemLabel>Tổng cộng</WrapperItemLabel>
                            <WrapperItem>
                                <WrapperItem>{convertPrice(data?.totalPrice)}</WrapperItem>
                            </WrapperItem>
                        </WrapperAllPrice>
                    </WrapperStyleContent>
                </div>
            </div>
        </Loading>
    );
};

export default DetailsOrderPage;
