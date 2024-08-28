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
const { Search } = Input;

const HeaderCompomment = () => {
  return (
    <div>
      <WrapperHeader>
        <Col span={6}>
          <WrapperTextHeader>DINO.somi</WrapperTextHeader>
        </Col>
        <Col span={12}>
          <Search
            placeholder="Tên mặt hàng mà bạn muốn tìm kiếm"
            enterButton="Tìm Kiếm"
            size="large"
          />
        </Col>
        <Col span={6}>
          <WrapperHeaderAccount>
            <UserOutlined style={{ fontSize: "32px" }} />
            <div>
              <span>Đăng nhập / Đăng kí</span>
              <div>
                <span>
                  Tài khoản
                  <CaretDownOutlined />
                </span>
              </div>
            </div>
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
