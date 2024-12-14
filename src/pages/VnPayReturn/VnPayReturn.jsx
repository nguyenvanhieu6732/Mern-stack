import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VnPayReturn = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPaymentResult = async () => {
            // Lấy các tham số từ URL
            const params = new URLSearchParams(location.search);
            const vnpSecureHash = params.get('vnp_SecureHash');
            const vnpTxnRef = params.get('vnp_TxnRef');
            const vnpAmount = params.get('vnp_Amount');
            const vnpCommand = params.get('vnp_Command');
            const vnpCreateDate = params.get('vnp_CreateDate');
            const vnpCurrCode = params.get('vnp_CurrCode');
            const vnpIpAddr = params.get('vnp_IpAddr');
            const vnpLocale = params.get('vnp_Locale');
            const vnpOrderInfo = params.get('vnp_OrderInfo');
            const vnpOrderType = params.get('vnp_OrderType');
            const vnpReturnUrl = params.get('vnp_ReturnUrl');
            const vnpTmnCode = params.get('vnp_TmnCode');
            const vnpVersion = params.get('vnp_Version');

            try {
                // Gửi yêu cầu đến backend để xác thực chữ ký
                const response = await axios.get('http://localhost:3000/api/checkout/vnpay_return', {
                    params: {
                        vnp_SecureHash: vnpSecureHash,
                        vnp_TxnRef: vnpTxnRef,
                        vnp_Amount: vnpAmount,
                        vnp_Command: vnpCommand,
                        vnp_CreateDate: vnpCreateDate,
                        vnp_CurrCode: vnpCurrCode,
                        vnp_IpAddr: vnpIpAddr,
                        vnp_Locale: vnpLocale,
                        vnp_OrderInfo: vnpOrderInfo,
                        vnp_OrderType: vnpOrderType,
                        vnp_ReturnUrl: vnpReturnUrl,
                        vnp_TmnCode: vnpTmnCode,
                        vnp_Version: vnpVersion
                    }
                });

                // Kiểm tra kết quả trả về từ backend
                if (response.data.success) {
                    // Chuyển hướng đến trang thành công
                    navigate('/orderSuccess', { state: { responseCode: response.data.responseCode } });
                } else {
                    // Chuyển hướng đến trang thất bại
                    navigate('/orderFailure', { state: { responseCode: response.data.responseCode } });
                }
            } catch (error) {
                console.error("Error fetching payment result:", error);
                // Xử lý lỗi nếu cần
                navigate('/orderFailure', { state: { responseCode: 'Error' } });
            }
        };

        fetchPaymentResult();
    }, [location.search, navigate]);

    return (
        <div>
            <h2>Đang xử lý thanh toán...</h2>
        </div>
    );
};

export default VnPayReturn;