import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DangNhap = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogin = () => {
        const loginRequest = {
            username: username,
            password: password
        };

        fetch('http://localhost:8080/tai-khoan/dang-nhap',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginRequest)
            }
        ).then(
            (response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Đăng nhập thất bại!')
                }
            }
        ).then(
            (data) => {
                // Xử lý đăng nhập thành công
                const { jwt } = data;
                // Lưu token vào localStorage hoặc cookie
                localStorage.setItem('token', jwt);
                // Điều hướng đến trang chính hoặc thực hiện các tác vụ sau đăng nhập thành công
                setError('Đăng nhập thành công!');
            }
        ).catch((error) => {
            // Xử lý lỗi đăng nhập
            console.error('Đăng nhập thất bại: ', error);
            setError('Đăng nhập thất bại. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu.');
        }
        )
    }
    return (
        <div className='container mt-4 mb-4' style={{ maxWidth: '500px', margin: '0 auto', padding: '2em', background: '#f7f7f7', borderRadius: '8px', border: '1px solid #007BFF', boxShadow: '5px 5px 15px rgba(0,0,0,0.1)' }}>
            <div className="form-signin">
                <h1 className="h3 mb-3 font-weight-normal" style={{ textAlign: 'center', marginBottom: '1em' }}>Đăng nhập</h1>
                <div className='mt-4'>
                    <label className="sr-only">Tên đăng nhập</label>
                    <input type="username" id="username" className="form-control mb-2" placeholder="Tên đăng nhập"
                        style={{ padding: '1em', fontSize: '1.1em' }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className='mt-4'>
                    <label className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control mb-2" placeholder="Password" required
                        style={{ padding: '1em', fontSize: '1.1em' }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="checkbox mb-3 mt-4" style={{ marginBottom: '1em' }}>
                    <label>
                        <input type="checkbox" value="remember-me" /> Remember me
                    </label>
                    <label style={{marginBottom: '5em'}}>
                        <Link to={`/dang-ky`} > Đăng ký </Link>
                    </label>
                </div>

                <div className='text-center mt-4'>
                    <button
                        className="btn btn-lg btn-primary btn-block"
                        type="button"
                        onClick={handleLogin}
                    >
                        Đăng nhập
                    </button>
                </div>
                {error && <div className="mt-4" style={{ color: '#25B9FB', marginTop: '10px' }}>{error}</div>}
            </div>
        </div>


    );
}

export default DangNhap;