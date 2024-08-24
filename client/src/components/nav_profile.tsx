import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

function NavProfile() {
    const pathName = usePathname();
    const [active, setActive] = useState(pathName);
    const handleClickPath = (path: string) => {
        setActive(path);
    };
    return (
        <nav className="flex items-center bg-[#e3cfb3]">
            <div
                className={`${
                    active == '/profile'
                        ? 'relative bg-white rounded-out-right '
                        : ''
                }  px-3 py-2 roboto-bold transform transition-transform duration-300 ease-in-out`}
            >
                <Link
                    href="/profile"
                    className="px-3 py-2 roboto-bold"
                    onClick={() => {
                        handleClickPath('/profile');
                    }}
                >
                    Thông tin cá nhân
                </Link>
            </div>
            <div
                className={`${
                    active == '/myStory'
                        ? 'relative bg-white rounded-out-bottom'
                        : ''
                }  px-3 py-2 roboto-bold transform transition-transform duration-300 ease-in-out`}
            >
                <Link
                    href="/myStory"
                    className="px-3 py-2 roboto-bold"
                    onClick={() => {
                        handleClickPath('/myStory');
                    }}
                >
                    Truyện của tôi
                </Link>
            </div>
            <div
                className={`${
                    active == '/comment'
                        ? 'relative bg-white rounded-out-bottom'
                        : ''
                }  px-3 py-2 roboto-bold transform transition-transform duration-300 ease-in-out`}
            >
                <Link
                    href="/comment"
                    className="px-3 py-2 roboto-bold"
                    onClick={() => {
                        handleClickPath('/comment');
                    }}
                >
                    Bình luận
                </Link>
            </div>
        </nav>
    );
}

export default NavProfile;
