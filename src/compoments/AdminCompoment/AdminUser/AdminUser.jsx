import React, { useState, useEffect, useRef } from "react";
import { WrapperHeader } from "./style";
import { Button, Form, Space } from "antd";
import { getBase64 } from "../../../utils";
import { useQuery } from "@tanstack/react-query";
import {
  PlusOutlined,
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

  const initial = () => ({
    name: "",
    email: "",
    phone: "",
    isAdmin: false,
    // avatar: "",
    // address: "",
  });
  const [stateUser, setStateUser] = useState(initial());
  const [stateUserDetails, setStateUserDetails] = useState(initial());

  const [form] = Form.useForm();
  const mutation = useMutationHooks((data) => {
    const { name, email, phone, isAdmin } = data;
    const res = userService.signUpUser({
      name: "",
      email: "",
      phone: "",
      isAdmin: false,
      // avatar: "",
      // address: "",
    });
    return res;
  });

  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = userService.updateUser(id, token, { ...rests });
    return res;
  });

  const mutationDeleted = useMutationHooks((data) => {
    const { id, token } = data;
    const res = userService.deleteUser(id, token);
    return res;
  });

  const getAllUser = async () => {
    const res = await userService.getAllUser(user?.access_token);
    return res;
  };

  const fetchDetailUser = async (rowSelected) => {
    const res = await userService.getDetailsUser(rowSelected);

    if (res?.data) {
      setStateUserDetails({
        name: res?.data?.name,
        email: res?.data?.email,
        phone: res?.data?.phone,
        isAdmin: res?.data?.isAdmin,
        // address: res?.data?.address,
        // avatar: res.data?.avatar,
      });
    }
    setIsPendingUpdate(false);
  };

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsPendingUpdate(true);
      fetchDetailUser(rowSelected);
    }
  }, [rowSelected, isOpenDrawer]);

  useEffect(() => {
    if (!isModalOpen) {
      form.setFieldsValue(stateUserDetails);
    } else {
      form.setFieldsValue(initial());
    }
  }, [form, stateUserDetails, isModalOpen]);

  const handleDetailUser = () => {
    if (rowSelected) {
      setIsPendingUpdate(true);
      fetchDetailUser(rowSelected);
    }
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

  const { data, isPending, isSuccess, isError } = mutation;
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

  const queryUser = useQuery({
    queryKey: ["user"],
    queryFn: getAllUser,
  });
  const { isPending: isPendingUser, data: User } = queryUser;

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    // setSearchText(selectedKeys[0]);
    // setSearchedColumn(dataIndex);
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
    {
      title: "Action",
      dataIndex: "action",
      render: renderAction,
    },
  ];
  const dataTable =
    User?.data?.length &&
    User?.data?.map((UserItem) => {
      return {
        ...UserItem,
        key: UserItem._id,
        isAdmin: UserItem.isAdmin ? "TRUE" : "FALSE",
      };
    });
  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      message.success("Thêm sản phẩm thành công", messageApi);
      handleCancel();
    } else if (isError) {
      message.error("Có lỗi xảy ra", messageApi);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === "OK") {
      message.success("Xóa sản phẩm thành công", messageApi);
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

  const handleCancel = () => {
    setIsModalOpen(false);
    setStateUser({
      name: "",
      email: "",
      phone: "",
      isAdmin: false,
      // avatar: "",
      // address: "",
    });
    form.resetFields();
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
  //check
  const onFinish = (values) => {
    mutation.mutate(stateUser, {
      onSettled: () => {
        queryUser.refetch();
      },
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleOnChange = (e) => {
    setStateUser({
      ...stateUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  // check
  const handleAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateUser({
      ...stateUser,
      image: file.preview,
    });
  };

  const handleAvatarDetails = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateUser({
      ...stateUserDetails,
      image: file.preview,
    });
  };
  const onUpdateUser = () => {
    mutationUpdate.mutate(
      {
        id: rowSelected,
        token: user?.access_token,
        ...stateUserDetails,
      },
      {
        onSettled: () => {
          queryUser.refetch();
        },
      }
    );
  };

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      message.success("Cập nhật sản phẩm thành công", messageApi);
      handleCloseDrawer();
    } else if (isErrorUpdated) {
      message.error("Có lỗi xảy ra", messageApi);
    }
  }, [isSuccessUpdated]);

  return (
    <>
      {contextHolder}
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
            onClick={() => setIsModalOpen(true)}
          >
            <PlusOutlined style={{ fontSize: "64px" }} />
          </Button>
        </div>
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
        <ModalCompoment
          forceRender
          title="Thêm người dùng"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <Loading isPending={isPending}>
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
              onFinish={onFinish}
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
                  value={stateUser.name}
                  onChange={handleOnChange}
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
                  value={stateUser.type}
                  onChange={handleOnChange}
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
                  value={stateUser.phone}
                  onChange={handleOnChange}
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
                  value={stateUser.adress}
                  onChange={handleOnChange}
                  name="address"
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
                <div>
                  <WrapperUploadFile onChange={handleAvatar} maxCount={1}>
                    <Button>Select File</Button>
                  </WrapperUploadFile>
                  {stateUser?.image && (
                    <img
                      src={stateUser.image}
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
                  Add User
                </Button>
              </Form.Item>
            </Form>
          </Loading>
        </ModalCompoment>
        <DrawerComponent
          title="Chi tiết sản phẩm"
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
              onFinish={onFinish}
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
                  value={stateUser.name}
                  onChange={handleOnChange}
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
                  value={stateUser.type}
                  onChange={handleOnChange}
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
                  value={stateUser.phone}
                  onChange={handleOnChange}
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
                  value={stateUser.adress}
                  onChange={handleOnChange}
                  name="address"
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
                <div>
                  <WrapperUploadFile onChange={handleAvatar} maxCount={1}>
                    <Button>Select File</Button>
                  </WrapperUploadFile>
                  {stateUser?.image && (
                    <img
                      src={stateUser.image}
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
                  Add User
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
