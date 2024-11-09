import React, { useState, useEffect, useRef } from "react";
import { WrapperHeader } from "./style";
import { Button, Form, Space } from "antd";
import { getBase64 } from "../../../utils";
import { useQuery } from "@tanstack/react-query";
import {
  EditOutlined,
  SearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import * as userService from "../../../services/userService.js";
import TableCompoment from "../../TableCompoment/TableCompoment";
import ModalCompoment from "../../ModalCompoment/ModalCompoment";
import Loading from "../../LoadingCompoment/Loading";
import { WrapperUploadFile } from "./style";
import InputComponentProduct from "../../InputCompoment/InputComponentProduct";
import DrawerComponent from "../../DrawerComponent/DrawerComponent";
import * as message from "../../Message/Message";
import { useSelector } from "react-redux";
import { useMutationHooks } from "../../../hook/useMutationHook";

const AdminUser = () => {
  const { messageApi, contextHolder } = message.useCustomMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isPendingUpdate, setIsPendingUpdate] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const searchInput = useRef(null);
  const user = useSelector((state) => state?.user);

  const [stateUserDetails, setStateUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    isAdmin: false,
    avatar: "",
    address: "",
  });

  const [form] = Form.useForm();

  //true
  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = userService.updateUser(id, { ...rests }, token);
    return res;
  });
  // true
  const mutationDeleted = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = userService.deleteUser(id, { ...rests }, token);
    return res;
  });
  
  // true
  const getAllUser = async () => {
    const res = await userService.getAllUser(user?.access_token);
    return res;
  };
  // true
  const fetchGetDetailsUser = async (rowSelected) => {
    const res = await userService.getDetailsUser(rowSelected);

    if (res?.data) {
      setStateUserDetails({
        name: res?.data?.name,
        email: res?.data?.email,
        phone: res?.data?.phone,
        isAdmin: res?.data?.isAdmin,
        address: res?.data?.address,
        avatar: res.data?.avatar,
      });
    }
    setIsPendingUpdate(false);
  };

  //true

  useEffect(() => {
    form.setFieldValue(stateUserDetails);
  }, [form, stateUserDetails]);

  // true

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsPendingUpdate(true);
      fetchGetDetailsUser(rowSelected);
    }
  }, [rowSelected, isOpenDrawer]);

  const handleDetailUser = () => {
    setIsOpenDrawer(true);
  };

  const renderAction = () => {
    return (
      <div style={{ display: "flex", gap: "16px" }}>
        <EditOutlined
          onClick={handleDetailUser}
          style={{ fontSize: "20px", color: "orange", cursor: "pointer" }}
        />
        <DeleteOutlined
          onClick={() => setIsModalOpenDelete(true)}
          style={{ fontSize: "20px", color: "red", cursor: "pointer" }}
        />
      </div>
    );
  };

  const {
    data: dataUpdated,
    isPending: isPendingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;

  const {
    data: dataDeleted,
    isPending: isPendingDeleted,
    isSuccess: isSuccessDeleted,
    isError: isErrorDeleted,
  } = mutationDeleted;

  const queryUser = useQuery({ queryKey: ["users"], queryFn: getAllUser });
  const { isPending: isPendingUser, data: users } = queryUser;

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    // setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponentProduct
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     // <Highlighter
    //     //   highlightStyle={{
    //     //     backgroundColor: '#ffc069',
    //     //     padding: 0,
    //     //   }}
    //     //   searchWords={[searchText]}
    //     //   autoEscape
    //     //   textToHighlight={text ? text.toString() : ''}
    //     // />
    //   ) : (
    //     text
    //   ),
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
      ...getColumnSearchProps("email"),
    },
    {
      title: "Address",
      dataIndex: "address",
      sorter: (a, b) => a.address.length - b.address.length,
      ...getColumnSearchProps("address"),
    },
    {
      title: "Admin",
      dataIndex: "isAdmin",
      filters: [
        {
          text: "True",
          value: true,
        },
        {
          text: "False",
          value: false,
        },
      ],
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: (a, b) => a.phone - b.phone,
      ...getColumnSearchProps("phone"),
    },
    // {
    //   title: "Action",
    //   dataIndex: "action",
    //   render: renderAction,
    // },
  ];
  const dataTable =
    users?.data?.length &&
    users?.data?.map((user) => {
      return {
        ...user,
        key: user._id,
        isAdmin: user.isAdmin ? "True" : "False",
        name: user.name ? user.name : "Null",
        email: user.email ? user.email : "Null",
        phone: user.phone ? user.phone : "Null",
        address: user.address ? user.address : "Null",
      };
    });

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === "OK") {
      message.success("Xóa user thành công", messageApi);
      handleCancelDelete();
    } else if (isErrorDeleted) {
      message.error("Có lỗi xảy ra", messageApi);
    }
  }, [isSuccessDeleted]);

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleDeleteUser = () => {
    mutationDeleted.mutate(
      { id: rowSelected, token: user?.access_token },
      {
        onSettled: () => {
          queryUser.refetch();
        },
      }
    );
  };

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateUserDetails({
      name: "",
      email: "",
      phone: "",
      isAdmin: false,
    });
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleOnChangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  // check

  const onUpdateUser = () => {
    mutationUpdate.mutate(
      { id: rowSelected, token: user?.access_token, ...stateUserDetails },
      {
        onSettled: () => {
          queryUser.refetch();
        },
      }
    );
  };

  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateUserDetails({
      ...stateUserDetails,
      avatar: file.preview,
    });
  };

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      message.success("Cập nhật user thành công", messageApi);
      handleCloseDrawer();
    } else if (isErrorUpdated) {
      message.error("Có lỗi xảy ra", messageApi);
    }
  }, [isSuccessUpdated]);

  useEffect(() => {
    if (user?.access_token) {
      queryUser.refetch(); // Lấy lại dữ liệu người dùng khi access_token có giá trị
    }
  }, [user?.access_token]);
  return (
    <>
      {contextHolder}
      <div>
        <WrapperHeader>Quản lý người dùng</WrapperHeader>
        <TableCompoment
          columns={columns}
          isPending={isPendingUser}
          data={dataTable}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setRowSelected(record._id);
              },
            };
          }}
        />

        <DrawerComponent
          title="Chi tiết người dùng"
          isOpen={isOpenDrawer}
          width="45%"
          onClose={() => {
            setIsOpenDrawer(false);
          }}
        >
          <Loading isPending={isPendingUpdate || isPendingUpdated}>
            <Form
              name="basic"
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 18,
              }}
              style={{
                maxWidth: 600,
              }}
              onFinish={onUpdateUser}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              form={form}
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
                  value={stateUserDetails.name}
                  onChange={handleOnChangeDetails}
                  name="name"
                />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <InputComponentProduct
                  value={stateUserDetails.type}
                  onChange={handleOnChangeDetails}
                  name="email"
                />
              </Form.Item>

              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone!",
                  },
                ]}
              >
                <InputComponentProduct
                  value={stateUserDetails.phone}
                  onChange={handleOnChangeDetails}
                  name="phone"
                />
              </Form.Item>

              <Form.Item
                label="Address"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Please input your address!",
                  },
                ]}
              >
                <InputComponentProduct
                  value={stateUserDetails.address}
                  onChange={handleOnChangeDetails}
                  name="address"
                />
              </Form.Item>

              {/* check */}
              <Form.Item
                label="Avatar"
                name="avatar"
                rules={[
                  {
                    required: true,
                    message: "Please select your avatar!",
                  },
                ]}
              >
                <div>
                  <WrapperUploadFile
                    onChange={handleOnchangeAvatarDetails}
                    maxCount={1}
                  >
                    <Button>Select File</Button>
                  </WrapperUploadFile>
                  {stateUserDetails?.avatar && (
                    <img
                      src={stateUserDetails.avatar}
                      style={{
                        height: "120px",
                        width: "120px",
                        objectFit: "cover",
                      }}
                      alt="avatar"
                    />
                  )}
                </div>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 18, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Apply
                </Button>
              </Form.Item>
            </Form>
          </Loading>
        </DrawerComponent>
        <ModalCompoment
          forceRender
          title="Xóa sản phẩm"
          open={isModalOpenDelete}
          onCancel={handleCancelDelete}
          onOk={handleDeleteUser}
        >
          <Loading isPending={isPendingDeleted}>
            <div>Bạn có chắc xóa sản phẩm này không?</div>
          </Loading>
        </ModalCompoment>
      </div>
    </>
  );
};

export default AdminUser;
