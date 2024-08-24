'use client';
import Loanding from '@/app/(main)/(profile)/loanding';
import { useUser } from '@/store/userLogin';
import Link from 'next/link';
import { Suspense, useRef, useState } from 'react';

function ProfilePage() {
    const { userLoginData, setUserLoginData } = useUser();

    return (
        <Suspense fallback={<Loanding />}>
            <div className="ml-11 mt-6">
                <div className="roboto-regular mt-2">
                    <span className="roboto-bold">Tên đăng nhập: </span>{' '}
                    {userLoginData?.userName}
                </div>
                <div className="roboto-regular mt-2">
                    <span className="roboto-bold">Email: </span>{' '}
                    {userLoginData?.email}
                </div>
                {userLoginData?.gender && (
                    <div className="roboto-regular mt-2">
                        <span className="roboto-bold">Gender: </span>{' '}
                        {userLoginData?.gender}
                    </div>
                )}
                <button className="button mt-3 ml-5 rounded-[15px] roboto-regular text-white bg-[#3977cdc6] px-3 py-2 hover:bg-[#3977cd] ">
                    <Link href="/editProfile" className="px-3 py-2">
                        Chỉnh sửa
                    </Link>
                </button>
            </div>
        </Suspense>
    );
}

export default ProfilePage;
