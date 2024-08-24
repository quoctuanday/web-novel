'use client';
import { useRef, useState } from 'react';
import { useUser } from '@/store/userLogin';
import Image from 'next/image';
import Link from 'next/link';
import { BiSearch, BiWorld } from 'react-icons/bi';
import { CgClose } from 'react-icons/cg';
import { CiLogout } from 'react-icons/ci';
import { FaFilter, FaTrophy, FaUser } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import { IoHome } from 'react-icons/io5';
import { LuPencilLine } from 'react-icons/lu';
import axios from 'axios';
import { PORT } from '@/api/port';

function Header() {
    const { userLoginData, setUserLoginData } = useUser();
    const closeSidebar = useRef<HTMLDivElement>(null);
    const overlay = useRef<HTMLDivElement>(null);

    const handleSearchChange = (e: any) => {
        console.log(e.target.value);
    };

    const handleLogOut = async () => {
        try {
            const response = await axios.post(`${PORT}/auth/logout`);
            if (response) {
                setUserLoginData(null);
                localStorage.clear();
            }
        } catch (error) {}
    };

    const handleCloseSidebar = () => {
        if (closeSidebar.current) {
            closeSidebar.current.style.width = '0';
            closeSidebar.current.style.padding = '0';
            overlay.current?.classList.add('hidden');
            document.body.style.background = 'white';
            document.body.style.zIndex = '0';
        }
    };
    const handleOpenSidebar = () => {
        if (closeSidebar.current) {
            closeSidebar.current.style.width = '340px';
            closeSidebar.current.style.padding = '24px';
            overlay.current?.classList.remove('hidden');
            document.body.onclick = handleCloseSidebar;
            document.body.style.zIndex = '9';
        }
    };
    return (
        <div>
            <div
                className="fixed inset-0 bg-black opacity-50 z-10"
                onClick={handleCloseSidebar}
                ref={overlay}
            ></div>
            <div
                className="h-[100%] z-20 fixed top-0 right-0 w-[340px] bg-[#272729] duration-200 ease-in-out p-6 text-white text-base roboto-bold"
                ref={closeSidebar}
            >
                <div className=" flex justify-end ">
                    <CgClose
                        className="text-white text-2xl "
                        onClick={handleCloseSidebar}
                    />
                </div>
                <div className="mt-6">
                    {userLoginData ? (
                        <>
                            <div className="flex items-center">
                                <Image
                                    className="rounded-full"
                                    src={
                                        userLoginData && userLoginData.image
                                            ? userLoginData.image
                                            : '/images/avatar-trang.jpg'
                                    }
                                    alt=""
                                    width={40}
                                    height={40}
                                ></Image>
                                <div className="ml-4">
                                    {userLoginData.userName}
                                </div>
                            </div>
                            <div className="mt-6 ml-3">
                                <div className="mb-3">
                                    <Link
                                        href={'/home'}
                                        className="flex items-center"
                                    >
                                        <div className="">
                                            <IoHome />
                                        </div>
                                        <div className="roboto-bold ml-4">
                                            Trang chủ
                                        </div>
                                    </Link>
                                </div>

                                <div className="mb-3">
                                    <Link
                                        href={'#'}
                                        className="flex items-center"
                                    >
                                        <div className="">
                                            <BiWorld />
                                        </div>
                                        <div className="roboto-bold ml-4">
                                            Thế giới
                                        </div>
                                    </Link>
                                </div>
                                <div className="mb-3">
                                    <Link
                                        href={'#'}
                                        className="flex items-center"
                                    >
                                        <div className="">
                                            <FaFilter />
                                        </div>
                                        <div className="roboto-bold ml-4">
                                            Lọc truyện
                                        </div>
                                    </Link>
                                </div>
                                <div className="mb-3">
                                    <Link
                                        href={'#'}
                                        className="flex items-center"
                                    >
                                        <div className="">
                                            <FaTrophy />
                                        </div>
                                        <div className="roboto-bold ml-4">
                                            Bảng xếp hạng
                                        </div>
                                    </Link>
                                </div>
                                <div className="mb-3">
                                    <Link
                                        href="/postStory"
                                        className="flex items-center"
                                    >
                                        <div className="">
                                            <LuPencilLine />
                                        </div>
                                        <div className="roboto-bold ml-4">
                                            Đăng truyện
                                        </div>
                                    </Link>
                                </div>
                                <div className="mb-3">
                                    <Link
                                        href="/profile"
                                        className="flex items-center"
                                    >
                                        <div className="">
                                            <IoMdSettings />
                                        </div>
                                        <div className="roboto-bold ml-4">
                                            Cài đặt cá nhân
                                        </div>
                                    </Link>
                                </div>
                                <div className="mb-3">
                                    <div
                                        className="flex items-center"
                                        onClick={handleLogOut}
                                    >
                                        <div className="">
                                            <CiLogout />
                                        </div>
                                        <div className="roboto-bold ml-4">
                                            Đăng xuất
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="">
                                <Link href={'/login'} className="">
                                    Đăng nhập
                                </Link>
                            </div>
                            <div className="">
                                <Link href={'/register'} className="">
                                    Đăng ký tài khoản
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="px-[250px] py-8 h-10 bg-[#333] text-white flex items-center justify-between">
                <div className="">
                    <Image
                        src={'/images/logo.png'}
                        alt=""
                        width={40}
                        height={20}
                    ></Image>
                </div>

                <div className="relative flex items-center">
                    <button className="absolute left-[-4%] hover:bg-[#ee8181] bg-[#999595] text-[#333] h-10 px-2 rounded-l">
                        <BiSearch className="w-6 h-6" />
                    </button>
                    <input
                        className="w-[750px] rounded p-2 ml-1 text-[#333] outline-none"
                        type="text"
                        placeholder="Tìm kiếm theo tên truyện, tên tác giả"
                        onChange={handleSearchChange}
                    />
                </div>

                <div onClick={handleOpenSidebar}>
                    <FaUser />
                </div>
            </div>
        </div>
    );
}

export default Header;
