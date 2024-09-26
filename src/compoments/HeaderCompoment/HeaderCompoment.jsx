import React from "react";
import { Col, Row, Input, Space } from "antd";
import {
  WrapperHeader,
  WrapperTextHeader,
  WrapperHeaderAccount,
} from "./style";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const { Search } = Input;

const HeaderCompomment = () => {
  const Navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const handleNavigateLogin = () => {
    Navigate("/sign-in");
  };
  return (
    <div>
      <WrapperHeader>
        <Col span={5}>
          <WrapperTextHeader>DINO.somi</WrapperTextHeader>
        </Col>
        <Col span={13}>
          <Search
            placeholder="Tên mặt hàng mà bạn muốn tìm kiếm"
            enterButton="Tìm Kiếm"
            size="large"
          />
        </Col>
        <Col span={6} style={{ columnGap: "20px" }}>
          <WrapperHeaderAccount>
            <UserOutlined style={{ fontSize: "32px" }} />
            {user?.name ? (
              <div style={{ cursor: "pointer" }}>{user.name}</div>
            ) : (
              <div onClick={handleNavigateLogin} style={{ cursor: "pointer" }}>
                <span>Đăng nhập / Đăng kí</span>
                <div>
                  <span>
                    Tài khoản
                    <CaretDownOutlined />
                  </span>
                </div>
              </div>
            )}
            <div>
              <ShoppingCartOutlined style={{ fontSize: "32px" }} />
              <span>Giỏ hàng</span>
            </div>
          </WrapperHeaderAccount>
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderCompomment;
