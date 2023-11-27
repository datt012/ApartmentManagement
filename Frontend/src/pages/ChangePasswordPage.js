import React, { useState, useEffect, useRef } from "react";

import axios from '../setups/custom_axios';
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../Redux/authSlice";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
export default function ChangePasswordPage() {

  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const handleSubmit = async () => {

    if (oldPassword === '') {
      toast('Hãy nhập password cũ!');
      return;
    }
    if (newPassword === '') {
      toast('Hãy nhập password mới!');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast('Confirm password không chính xác!');
      return;
    }
    try {
      var res = await axios.put('/change-password', {
        userName: user?.userName,
        oldPassword,
        newPassword
      });
      toast(res?.message);
      dispatch(logout());
    }
    catch (e) {
      toast('Đổi mật khẩu thất bại!');
      return;
    }

  }
  useEffect(() => {

  }, []);

  return (
    <div>
      <div className="input-custome" style={{ margin: "auto", width: '40%' }}>
        <div className="text-center mt-3 mb-3" >
          <h3>ĐỔI MẬT KHẨU</h3>
        </div>
        <div className="content-body row">
          <div className="form-group">
            <label>
              Tên đăng nhập (<span className="text-danger">*</span>)
            </label>
            <input
              type="text"
              className="form-control"
              value={user?.userName}
              disabled
            />
          </div>

          <div className="form-group">
            <label>
              Mật khẩu cũ (<span className="text-danger">*</span>)
            </label>
            <input
              type="password"
              className="form-control"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Nhập mật khẩu cũ . . ."
            />
          </div>
          <div className="form-group">
            <label>
              Mật khẩu mới (<span className="text-danger">*</span>)
            </label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Nhập mật khẩu mới . . ."
            />
          </div>
          <div className="form-group">
            <label>
              Xác nhận mật khẩu mới (<span className="text-danger">*</span>)
            </label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Xác nhận mật khẩu mới . . ."
            />
          </div>
          <Button onClick={() => handleSubmit()} variant="contained" color="info"
           style={{ width: 100, margin: 'auto' }}>Gửi</Button>
        </div>
      </div>
    </div>
  );
}
