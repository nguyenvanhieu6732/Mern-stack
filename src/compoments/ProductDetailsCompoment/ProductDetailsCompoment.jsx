import { Col, Row, Image } from "antd";
import React from "react";
import imageProduct from "../../assets/images/product1.jpg";
import imageProductSmall from "../../assets/images/productSmall.jpg";
import {
    ButtonBuyProduct,
    ButtonValueNumber,
  InputValueNumber,
  WrapperAddressProduct,
  WrapperNameProduct,
  WrapperPriceProduct,
  WrapperProductSmall,
} from "./style";
// import type { InputNumberProps } from "antd";
// import { InputNumber } from "antd";
import { StarFilled, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import ButtonGroup from "antd/es/button/button-group";

const ProductDetailsCompoment = () => {
  const onChange = () => {};

  return (
    <Row style={{ padding: "16px", backgroundColor: "#fff" }}>
      <Col span={10}>
        <Image src={imageProduct} alt="Hinh anh san pham" preview={false} />
        <Row style={{ paddingTop: "10px" }}>
          <Col span={4}>
            <WrapperProductSmall
              src={imageProductSmall}
              alt="Hinh anh san pham"
              preview={false}
            />
          </Col>
          <Col span={4}>
            <WrapperProductSmall
              src={imageProductSmall}
              alt="Hinh anh san pham"
              preview={false}
            />
          </Col>
          <Col span={4}>
            <WrapperProductSmall
              src={imageProductSmall}
              alt="Hinh anh san pham"
              preview={false}
            />
          </Col>
          <Col span={4}>
            <WrapperProductSmall
              src={imageProductSmall}
              alt="Hinh anh san pham"
              preview={false}
            />
          </Col>
          <Col span={4}>
            <WrapperProductSmall
              src={imageProductSmall}
              alt="Hinh anh san pham"
              preview={false}
            />
          </Col>
          <Col span={4}>
            <WrapperProductSmall
              src={imageProductSmall}
              alt="Hinh anh san pham"
              preview={false}
            />
          </Col>
        </Row>
      </Col>
      <Col span={14} style={{ padding: "0 16px" }}>
        <WrapperNameProduct>
          Giá đỡ máy tính xách tay - Hợp kim nhôm
        </WrapperNameProduct>
        <div>
          <StarFilled style={{ color: "yellow", fontSize: "12px" }} />
          <StarFilled style={{ color: "yellow", fontSize: "12px" }} />
          <StarFilled style={{ color: "yellow", fontSize: "12px" }} />
          <StarFilled style={{ color: "yellow", fontSize: "12px" }} />
          <StarFilled style={{ color: "yellow", fontSize: "12px" }} />
          <span
            style={{
              marginLeft: "16px",
              fontSize: "15px",
              lineHeight: "24px",
              color: "rgb(120,120,120)",
            }}
          >
            Đã bán 1000
          </span>
        </div>
        <WrapperPriceProduct>200.000</WrapperPriceProduct>
        <WrapperAddressProduct>
          <span>Giao đến </span>
          <span className="address">Việt Thuận, Vũ Thư, Thái Bình</span> -
          <span className="change-address">Đổi địa chỉ</span>
        </WrapperAddressProduct>
        <div style={{ margin: "12px 0" }}>Số lượng:</div>
        {/* <div>
          <InputNumber min={1} max={10} defaultValue={1} onChange={onChange} />
        </div> */}

        <div>
          <ButtonValueNumber>
            <PlusOutlined />
          </ButtonValueNumber>
          <InputValueNumber  size="small" style={{width: "40px"}}  min={1} max={10} defaultValue={1} onChange={onChange} />
          <ButtonValueNumber>
            <MinusOutlined />
          </ButtonValueNumber>
        </div>
            <Row>
                <Col span={12}>
                <ButtonBuyProduct>Thêm vào giỏ Hàng</ButtonBuyProduct>
                </Col>
                <Col span={12}>
                <ButtonBuyProduct className="btnBuyNow">Mua ngay</ButtonBuyProduct>
                </Col>
            </Row>
      </Col>
    </Row>
  );
};

export default ProductDetailsCompoment;
