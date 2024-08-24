'use client';
import { useState } from 'react';
import { CiMail, CiUser } from 'react-icons/ci';
import { FaCheck, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import axios from 'axios';

function RegisterPage() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidenPass, setHidenPass] = useState(false);
    const [focusPass, setFocusPass] = useState(false);
    const [letter, setLetter] = useState(false);
    const [capital, setCapital] = useState(false);
    const [number, setNumber] = useState(false);
    const [length, setLength] = useState(false);
    const handleHidenPass = () => {
        setHidenPass(!hidenPass);
        console.log(hidenPass);
    };

    const handleFocusPass = () => {
        setFocusPass(true);
    };

    const handleBlurPass = () => {
        setFocusPass(false);
    };

    const handleCheckPass = (e: any) => {
        setPassword(e.target.value);
        var lowerCaseLetters = /[a-z]/g;
        if (e.target.value.match(lowerCaseLetters)) {
            setLetter(true);
        } else {
            setLetter(false);
        }

        var upperCaseLetters = /[A-Z]/g;
        if (e.target.value.match(upperCaseLetters)) {
            setCapital(true);
        } else {
            setCapital(false);
        }

        var numbers = /[0-9]/g;
        if (e.target.value.match(numbers)) {
            setNumber(true);
        } else {
            setNumber(false);
        }

        if (e.target.value.length >= 8) {
            setLength(true);
        } else {
            setLength(false);
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const PORT = 'http://localhost:8080';
        try {
            const response = await axios.post(`${PORT}/auth/register`, {
                email,
                userName,
                password,
            });
            if (response.status === 200) {
                alert('Đăng ký thành công');
                setEmail('');
                setPassword('');
                setUserName('');
            } else {
                alert('Đăng ký thất bại');
            }
        } catch (error) {
            console.error('Lỗi khi đăng ký', error);
            alert('Lỗi khi đăng ký');
        }
    };

    return (
        <div className=" flex items-center justify-center h-[100vh] bg-[url(/images/bg_login.png)] bg-center bg-no-repeat bg-cover">
            <form
                className="relative rounded-2xl w-[450px] box_shadow border-2 border-[#fff] backdrop-blur-sm"
                onSubmit={handleSubmit}
            >
                <div className="login-header absolute top-0 left-[50%] translate-x-[-50%] flex items-center justify-center bg-white w-[140px] h-[60px] roboto-bold text-[20px] rounded-b-[15px]">
                    Đăng ký
                </div>
                <div className="relative flex justify-center my-5 mt-[100px]">
                    <input
                        className="h-[55px] rounded-[30px] border-2 px-3 w-[90%] bg-transparent text-white placeholder:text-white outline-none caret-white "
                        type="text"
                        value={userName}
                        onChange={(e) => {
                            setUserName(e.target.value);
                        }}
                        placeholder="Tên đăng nhập"
                    />
                    <i className="absolute top-[50%] translate-y-[-50%] right-[10%] text-white text-[20px]">
                        <CiUser />
                    </i>
                </div>

                <div className="relative flex justify-center my-5">
                    <input
                        className="h-[55px] rounded-[30px] border-2 px-3 w-[90%] bg-transparent text-white placeholder:text-white outline-none caret-white "
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <i className="absolute top-[50%] translate-y-[-50%] right-[10%] text-white text-[20px]">
                        <CiMail />
                    </i>
                </div>

                <div className="relative flex justify-center my-5">
                    <input
                        className="h-[55px] rounded-[30px] border-2 px-3 w-[90%] bg-transparent text-white placeholder:text-white outline-none caret-white "
                        type={hidenPass ? 'password' : 'text'}
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        placeholder="Mật khẩu"
                        value={password}
                        onFocus={handleFocusPass}
                        onBlur={handleBlurPass}
                        onChange={handleCheckPass}
                    />

                    <i
                        className="absolute cursor-pointer top-[50%] translate-y-[-50%] right-[10%] text-white text-[20px]"
                        onClick={handleHidenPass}
                    >
                        {hidenPass ? <FaEyeSlash /> : <FaEye />}
                    </i>
                </div>
                {focusPass ? (
                    <>
                        <div className="text-white ml-10">
                            <li className="list-none flex items-center justify-start">
                                {capital ? (
                                    <FaCheck className="text-green-500 mr-2" />
                                ) : (
                                    <FaXmark className="text-red-500 mr-2" />
                                )}
                                Ít nhất 1 kí tự in hoa.{' '}
                            </li>
                            <li className="list-none flex items-center justify-start">
                                {letter ? (
                                    <FaCheck className="text-green-500 mr-2" />
                                ) : (
                                    <FaXmark className="text-red-500 mr-2" />
                                )}
                                Ít nhất 1 kí tự thường.{' '}
                            </li>
                            <li className="list-none flex items-center justify-start">
                                {number ? (
                                    <FaCheck className="text-green-500 mr-2" />
                                ) : (
                                    <FaXmark className="text-red-500 mr-2" />
                                )}
                                Ít nhất 1 số.{' '}
                            </li>
                            <li className="list-none flex items-center justify-start">
                                {length ? (
                                    <FaCheck className="text-green-500 mr-2" />
                                ) : (
                                    <FaXmark className="text-red-500 mr-2" />
                                )}
                                Ít nhất phải có 8 kí tự.{' '}
                            </li>
                        </div>
                    </>
                ) : (
                    <></>
                )}

                <div className="flex justify-center my-5">
                    <button
                        className="text-center w-[90%] h-[55px] border-2 rounded-[30px] roboto-bold bg-white"
                        type="submit"
                    >
                        Đăng ký
                    </button>
                </div>
                <div className="text-white text-center my-5">
                    Đã có tài khoản?{' '}
                    <a href="/login" className="underline">
                        Đăng nhập tại đây!
                    </a>
                </div>
            </form>
        </div>
    );
}

export default RegisterPage;
