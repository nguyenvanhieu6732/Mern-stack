import React from "react";
import TypeProduct from "../../compoments/TypeProduct/TypeProduct";
import { WrapperTypeProduct } from "./style";
import SliderCompoment from "../../compoments/SliderCompoment/SliderCompoment";
import slider1 from "../../assets/images/slider1.jpg";
import slider2 from "../../assets/images/slider2.jpg";
import slider3 from "../../assets/images/slider3.jpg";
import slider4 from "../../assets/images/slider4.jpg";
import CardCompoment from "../../compoments/CardCompoment/CardCompoment";
import { WrapperLabelText } from "../../compoments/NavbarCompoment/style";
import NavbarCompoment from "../../compoments/NavbarCompoment/NavbarCompoment";
import { Button } from "antd";
import FooterCompoment from "../../compoments/FooterCompoment/FooterCompoment";
const HomePage = () => {
  const arr = ["TV", "Tủ Lạnh", "Máy Giặt", "Điều Hòa", "Đầu Đĩa"];
  return (
    <>
      <div style={{ padding: "0 120px" }}>
        <WrapperTypeProduct>
          {arr.map((item, index) => {
            return <TypeProduct name={item} key={index} />;
          })}
        </WrapperTypeProduct>
      </div>
      <div
        id="container"
        style={{
          backgroundColor: "#efefef",
          padding: "0 120px",
          height: "auto",
        }}
      >
        <SliderCompoment arrImages={[slider1, slider2, slider3, slider4]} />
        <div
          style={{
            marginTop: "32px",
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <CardCompoment />
          <CardCompoment />
          <CardCompoment />
          <CardCompoment />
          <CardCompoment />
          <CardCompoment />
          <CardCompoment />
          <CardCompoment />
          <CardCompoment />
        </div>
        {/* <NavbarCompoment /> */}
      </div>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Button
          type="primary"
          style={{
            margin: "32px",
            padding: "10px 20px",
            fontSize: "16px",
          }}
        >
          Xem thêm
        </Button>
      </div>
      <FooterCompoment/>
    </>
  );
};

export default HomePage;
