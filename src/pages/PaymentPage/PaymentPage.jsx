import React from 'react';

const PaymentPage = () => {
  const totalPrice = 100000; // Tổng tiền giỏ hàng
  const data = [
    { name: 'Sản phẩm 1', price: 50000 },
    { name: 'Sản phẩm 2', price: 50000 },
  ];

  return (
    <div className="container mt-5">
      <div style={{flexDirection: 'column', textAlign: 'center', paddingTop: 26, paddingBottom: 26, gap: 20}}>
        <i className="fa-regular fa-credit-card" style={{ fontSize: 64 }}></i>
        <h1>Thanh Toán</h1>
        <p>Vui lòng kiểm tra thông tin thanh toán, giỏ hàng trước khi đặt hàng</p>
      </div>
      <div className="row">
        <div className="col-md-8">
          <h2 style={{ marginBottom: 12 }}>Thông tin khách hàng</h2>
          <form id="createOrder" action="create_payment_url" method="POST">
            <div className="form-group">
              <label htmlFor="name">Họ tên</label>
              <input type="text" required className="form-control" id="name" name="name" />
            </div>
            <div className="form-group">
              <label htmlFor="address">Địa chỉ</label>
              <input type="text" required className="form-control" id="address" name="address" />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Điện thoại</label>
              <input type="text" required className="form-control" id="phone" name="phone" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" required className="form-control" id="email" name="email" />
            </div>

            <div className="form-group">
              <label>Số tiền</label>
              <input
                readOnly
                className="form-control"
                id="amount"
                name="amount"
                placeholder="Số tiền"
                value={totalPrice}
              />
            </div>

            <div className="form-group">
              <label>Chọn Phương thức thanh toán:</label>
              <div className="controls">
                <label className="radio-inline">
                  <input
                    type="radio"
                    name="bankCode"
                    id="defaultPaymentMethod"
                    value=""
                    defaultChecked
                  />{' '}
                  Cổng thanh toán VNPAYQR
                </label>
              </div>
              <div className="controls">
                <label className="radio-inline">
                  <input type="radio" name="bankCode" id="vnpayqrPaymentMethod" value="VNPAYQR" />{' '}
                  Thanh toán qua ứng dụng hỗ trợ VNPAYQR
                </label>
              </div>
              <div className="controls">
                <label className="radio-inline">
                  <input type="radio" name="bankCode" id="vnbankPaymentMethod" value="VNBANK" />{' '}
                  Thanh toán qua ATM-Tài khoản ngân hàng nội địa
                </label>
              </div>
              <div className="controls">
                <label className="radio-inline">
                  <input type="radio" name="bankCode" id="intcardPaymentMethod" value="INTCARD" />{' '}
                  Thanh toán qua thẻ quốc tế
                </label>
                <input type="hidden" value={JSON.stringify(data)} name="items" />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block btn-lg">
              Đặt hàng
            </button>
          </form>
        </div>

        <div className="col-md-4">
          <h2 style={{ marginBottom: 12 }}>Giỏ hàng</h2>
          <ul className="list-group">
            {data.map((item, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {item.name}
                <span>{item.price.toLocaleString('vi-VN')} VND</span>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Tổng thành tiền
              <strong>{totalPrice.toLocaleString('vi-VN')} VND</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
