import React from "react";
import TypeProduct from "../../compoments/TypeProduct/TypeProduct";
import { WrapperTypeProduct } from "./style";
import SliderCompoment from "../../compoments/SliderCompoment/SliderCompoment";
import slider1 from "../../assets/images/slider1.jpg";
import slider2 from "../../assets/images/slider2.jpg";
import slider3 from "../../assets/images/slider3.jpg";
import slider4 from "../../assets/images/slider4.jpg";
import CardCompoment from "../../compoments/CardCompoment/CardCompoment";
import { Button } from "antd";
import FooterCompoment from "../../compoments/FooterCompoment/FooterCompoment";
import { useQuery } from "@tanstack/react-query";
import * as productService from "../../services/productService";

const HomePage = () => {
  const arr = ["TV", "Tủ Lạnh", "Máy Giặt", "Điều Hòa", "Đầu Đĩa"];
  const fetchProductAll = async () => {
    const res = await productService.getAllProduct();
    return res;
  };
  const { isLoading, data: product } = useQuery({
    queryKey: ["product"], // Đây là queryKey
    queryFn: fetchProductAll, // Hàm lấy dữ liệu
    retry: 3,
    retryDelay: 1000,
  });
  console.log("data", product);
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
          {product?.data?.map((productItem) => {
            return (
              <CardCompoment
                key={productItem._id}
                countInStock={productItem.countInStock}
                description={productItem.description}
                image={productItem.image}
                name={productItem.name}
                price={productItem.price}
                rating={productItem.rating}
                type={productItem.type}
              />
            );
          })}
        </div>
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
      <FooterCompoment />
    </>
  );
};

export default HomePage;
