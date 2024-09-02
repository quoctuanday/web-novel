'use client';
import Aside_story from '@/components/aside_story';
import { useUser } from '@/store/userLogin';
import Image from 'next/image';
import Link from 'next/link';
import { AiFillHome } from 'react-icons/ai';

export default function StoryLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const { userLoginData } = useUser();
    return (
        <div className="grid grid-cols-5 ">
            <div className="col-span-1 fixed h-[100vh] w-[18%] ">
                <Aside_story />
            </div>
            <div className="col-start-2 col-span-4 ">
                <div className="px-5 flex items-center justify-between mt-[2%] rounded-[15px] mr-[2%] h-[68px] bg-[#ccc]">
                    <Link href="/home">
                        <AiFillHome />
                    </Link>
                    <Link href="/profile">
                        <Image
                            src={
                                (userLoginData && userLoginData.image) ||
                                '/images/avatar-trang.jpg'
                            }
                            alt=""
                            width={100}
                            height={100}
                            className="rounded-full w-[40px] h-[40px]"
                        ></Image>
                    </Link>
                </div>
                <div className="mt-[2%] pr-[2%]">{children}</div>
            </div>
        </div>
    );
}
