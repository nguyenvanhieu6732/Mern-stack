import React from "react";
import { Card } from "antd";
import { StarFilled } from "@ant-design/icons";
import {
  StyleNameProduct,
  WrapperDiscountText,
  WrapperFavouriteText,
  WrapperPriceText,
  WrapperReportText,
} from "./style";

const CardCompoment = (props) => {
  const { countInStock, description, image, name, price, rating, type } = props;
  const { Meta } = Card;
  return (
    <div>
      <Card
        hoverable
        style={{ width: 160 }}
        styles={{ body: { padding: "10px" } }}
        cover={
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        }
      >
        <StyleNameProduct>
          <WrapperFavouriteText>Yêu Thích</WrapperFavouriteText> {name}
        </StyleNameProduct>
        <WrapperReportText>
          <span>{rating}</span>
          <StarFilled style={{ color: "#ee4d2d" }} />
          <span style={{ marginLeft: "16px" }}>Đã bán 1000</span>
        </WrapperReportText>
        <WrapperPriceText>
          {price} <WrapperDiscountText>-40%</WrapperDiscountText>
        </WrapperPriceText>
      </Card>
    </div>
  );
};

export default CardCompoment;
