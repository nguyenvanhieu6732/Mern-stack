import React from "react";
import { WrapperHeader } from "./style";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TableCompoment from "../../TableCompoment/TableCompoment";
const AdminUser = () => {
  return (
    <div>
      <WrapperHeader>Quản lý người dùng</WrapperHeader>
      <div style={{ padding: "16px " }}>
        <Button
          style={{
            height: "150px",
            width: "150px",
            borderRadius: "6px",
            borderStyle: "dashed",
            borderWidth: "2px",
          }}
        >
          <PlusOutlined style={{ fontSize: "64px" }} />
        </Button>
      </div>
      <TableCompoment />
    </div>
  );
};

export default AdminUser;
