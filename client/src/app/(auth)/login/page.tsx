'use client';
import { PORT } from '@/api/port';
import axios from 'axios';
import { useState } from 'react';
import { CiUser, CiWarning } from 'react-icons/ci';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa6';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function LoginPage() {
    const router = useRouter();

    const [hidenPass, setHidenPass] = useState(true);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const handleHidenPass = () => {
        setHidenPass(!hidenPass);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${PORT}/auth/login`, {
                userName,
                password,
            });
            if (response.status === 200) {
                const userData = JSON.stringify(response.data);
                localStorage.setItem('userLoginData', userData);
                toast.success('Đăng nhập thành công!');
                setTimeout(() => {
                    router.push('/home');
                }, 3000);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    switch (error.response.status) {
                        case 401:
                            toast('Tên đăng nhập hoặc mật khẩu sai!', {
                                icon: <CiWarning className="text-yellow-500" />,
                            });
                            break;
                        default:
                            toast.error('Đăng nhập thất bại!');
                    }
                } else {
                    console.error('Lỗi khi đăng nhập!', error);
                    toast.error('Lỗi khi đăng nhập!');
                }
            } else {
                console.error('Lỗi không xác định khi đăng nhập!', error);
                toast.error('Lỗi không xác định khi đăng nhập!');
            }
        }
    };
    return (
        <div className=" flex items-center justify-center h-[100vh] bg-[url(/images/bg_login.png)] bg-center bg-no-repeat bg-cover">
            <form
                className="relative rounded-2xl w-[450px] box_shadow border-2 border-[#fff] backdrop-blur-sm"
                onSubmit={handleSubmit}
            >
                <div className="login-header absolute top-0 left-[50%] translate-x-[-50%] flex items-center justify-center bg-white w-[140px] h-[60px] roboto-bold text-[20px] rounded-b-[15px]">
                    Đăng nhập
                </div>
                <div className="relative flex justify-center my-5 mt-[100px]">
                    <input
                        className="h-[55px] rounded-[30px] border-2 px-3 w-[90%] bg-transparent text-white placeholder:text-white outline-none caret-white "
                        type="text"
                        value={userName}
                        placeholder="Tên đăng nhập"
                        onChange={(e) => {
                            setUserName(e.target.value);
                        }}
                    />
                    <i className="absolute top-[50%] translate-y-[-50%] right-[10%] text-white text-[20px]">
                        <CiUser />
                    </i>
                </div>

                <div className="relative flex justify-center my-5">
                    <input
                        className="h-[55px] rounded-[30px] border-2 px-3 w-[90%] bg-transparent text-white placeholder:text-white outline-none caret-white "
                        type={hidenPass ? 'password' : 'text'}
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />

                    <i
                        className="absolute cursor-pointer top-[50%] translate-y-[-50%] right-[10%] text-white text-[20px]"
                        onClick={handleHidenPass}
                    >
                        {hidenPass ? <FaEyeSlash /> : <FaEye />}
                    </i>
                </div>

                <div className="flex justify-end w-[90%] my-5 text-white">
                    <a href="#" className="hover:underline decoration-white ">
                        Quên mật khẩu?
                    </a>
                </div>
                <div className="flex justify-center my-5">
                    <button
                        className="text-center w-[90%] h-[55px] border-2 rounded-[30px] roboto-bold bg-white"
                        type="submit"
                    >
                        Đăng nhập
                    </button>
                </div>
                <div className="text-white text-center my-5">
                    Bạn chưa có tài khoản?{' '}
                    <a href="/register" className="underline">
                        Đăng ký tại đây!
                    </a>
                </div>
            </form>
            <Toaster position="top-right" />
        </div>
    );
}

export default LoginPage;
