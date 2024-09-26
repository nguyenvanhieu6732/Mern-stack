import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from "./routes/index";
import DefaultCompoment from './compoments/DefaultCompoment/DefaultCompoment';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { isJsonString } from './utils';
import { jwtDecode } from 'jwt-decode';
import * as userService from "./services/userService";
import { useDispatch } from "react-redux";
import { updateUser } from './redux/slices/userSlice';



function App() {

  const dispatch = useDispatch();

  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {}
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData }
  }


  useEffect(() => {
    const { storageData, decoded } = handleDecoded()
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData);
    }
  }, []);

  // true
  userService.axiosJWT.interceptors.request.use(async (config) => {
    const currentTime = new Date();
    const { decoded } = handleDecoded();
    if (decoded?.exp < currentTime.getTime() / 1000)   
   {
      try {
        const data = await userService.refreshToken();
        config.headers['token'] = `Bearer ${data?.access_token}`;
      } catch (error) {
        // Xử lý lỗi refresh token (ví dụ: thông báo lỗi cho người dùng, chuyển hướng đăng nhập)
        console.error("Refresh token error:", error);
      }
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });


  const handleGetDetailsUser = async (id, token) => {
    const res = await userService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page
            const Layout = route.isShowHeader ? DefaultCompoment : Fragment
            return (
              <Route key={route.path} path={route.path} element={
                <Layout>
                  <Page />
                </Layout>
              } />
            )
          })}
        </Routes>
      </Router>
    </div>
  )
}

export default App