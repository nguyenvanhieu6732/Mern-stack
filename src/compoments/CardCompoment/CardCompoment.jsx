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

const CardCompoment = () => {
  const { Meta } = Card;
  return (
    <div>
      <Card
        hoverable
        style={{ width: 160 }}
        bodyStyle={{ padding: "10px" }}
        cover={
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        }
      >
        <StyleNameProduct>
          <WrapperFavouriteText>Yêu Thích</WrapperFavouriteText> Nguyễn Văn Hiếu
        </StyleNameProduct>
        <WrapperReportText>
          <span>4.9</span>
          <StarFilled style={{ color: "#ee4d2d" }} />
          <span style={{ marginLeft: "16px" }}>Đã bán 1000</span>
        </WrapperReportText>
        <WrapperPriceText>
          180.000 <WrapperDiscountText>-40%</WrapperDiscountText>
        </WrapperPriceText>
      </Card>
    </div>
  );
};

export default CardCompoment;
