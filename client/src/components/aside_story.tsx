import Link from 'next/link';
import React from 'react';
import { BiBookAdd } from 'react-icons/bi';
import { FaBook, FaChartLine } from 'react-icons/fa';

function Aside_story() {
    return (
        <div>
            <div className=" h-[100vh] w-full bg-[#333]">
                <h1 className="roboto-bold text-[20px] text-white pt-5 ml-4">
                    Truyện của tôi
                </h1>
                <ul className="roboto-regular text-white  mt-3 px-3">
                    <li className="py-2 px-4 hover:bg-red-500 rounded-[10px]">
                        <Link href="/story" className="flex items-center">
                            <FaBook className="mr-2" />
                            Truyện đã đăng
                        </Link>
                    </li>
                    <li className="py-2 px-4 hover:bg-red-500 rounded-[10px]">
                        <Link href="postStory" className="flex items-center">
                            <BiBookAdd className="mr-2" />
                            Thêm truyện
                        </Link>
                    </li>
                    <li className="py-2 px-4 hover:bg-red-500 rounded-[10px]">
                        <Link href="" className="flex items-center">
                            <FaChartLine className="mr-2" />
                            Thống kê
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Aside_story;
