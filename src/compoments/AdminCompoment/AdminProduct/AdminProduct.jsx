import React, { useState } from "react";
import { WrapperHeader, WrapperUploadFile } from "./style";
import { Button, Form, Input, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TableCompoment from "../../TableCompoment/TableCompoment";
import InputComponentProduct from "../../InputCompoment/InputComponentProduct";
import { getBase64 } from "../../../utils";
import * as productService from "../../../services/productService";
import { useMutationHooks } from "../../../hook/useMutationHook";
import Loading from "../../LoadingCompoment/Loading";

const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stateProduct, setStateProduct] = useState({
    name: "",
    type: "",
    price: "",
    countInStock: "",
    description: "",
    rating: "",
    image: "",
  });

  const [form] = Form.useForm();
  const mutation = useMutationHooks((data) => {
    const { name, type, price, countInStock, description, rating, image } =
      data;
    const res = productService.createProduct({
      name,
      type,
      price,
      countInStock,
      description,
      rating,
      image,
    });
    return res;
  });
  const { data, isPending, isSuccess, isError } = mutation;

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProduct,
      image: file?.preview,
    });
  };
  //check
  const onFinish = (values) => {
    mutation.mutate(stateProduct);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleOnChange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };

  // check

  console.log(stateProduct.image);

  return (
    <div>
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
      <div style={{ padding: "16px " }}>
        <Button
          style={{
            height: "150px",
            width: "150px",
            borderRadius: "6px",
            borderStyle: "dashed",
            borderWidth: "2px",
          }}
          onClick={() => setIsModalOpen(true)}
        >
          <PlusOutlined style={{ fontSize: "64px" }} />
        </Button>
      </div>
      <TableCompoment />
      <Modal
        title="Tạo sản phẩm"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
      >
        <Loading isPending={isPending}>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <InputComponentProduct
                value={stateProduct.name}
                onChange={handleOnChange}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Type"
              name="type"
              rules={[
                {
                  required: true,
                  message: "Please input your type!",
                },
              ]}
            >
              <InputComponentProduct
                value={stateProduct.type}
                onChange={handleOnChange}
                name="type"
              />
            </Form.Item>

            <Form.Item
              label="CountInStock"
              name="countInStock"
              rules={[
                {
                  required: true,
                  message: "Please input your count in stock!",
                },
              ]}
            >
              <InputComponentProduct
                value={stateProduct.countInStock}
                onChange={handleOnChange}
                name="countInStock"
              />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please input your price!",
                },
              ]}
            >
              <InputComponentProduct
                value={stateProduct.price}
                onChange={handleOnChange}
                name="price"
              />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input your description!",
                },
              ]}
            >
              <InputComponentProduct
                value={stateProduct.description}
                onChange={handleOnChange}
                name="description"
              />
            </Form.Item>

            <Form.Item
              label="Rating"
              name="rating"
              rules={[
                {
                  required: true,
                  message: "Please input your rating!",
                },
              ]}
            >
              <InputComponentProduct
                value={stateProduct.rating}
                onChange={handleOnChange}
                name="rating"
              />
            </Form.Item>

            {/* check */}
            <Form.Item
              label="Image"
              name="image"
              rules={[
                {
                  required: true,
                  message: "Please select your image!",
                },
              ]}
            >
              <WrapperUploadFile onChange={handleAvatar} maxCount={1}>
                <Button>Select File</Button>
              </WrapperUploadFile>
              {stateProduct?.image && (
                <img
                  src={stateProduct.image}
                  style={{
                    height: "120px",
                    width: "120px",
                    objectFit: "cover",
                  }}
                  alt="avatar"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ margin: "16px 0 0 36px" }}
              >
                Apply
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </Modal>
    </div>
  );
};

export default AdminProduct;
