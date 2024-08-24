'use client';
import { PORT } from '@/api/port';
import Loanding from '@/app/(main)/(profile)/loanding';
import { User } from '@/schema/User';
import { useUser } from '@/store/userLogin';
import axios from 'axios';
import Link from 'next/link';
import React, { Suspense, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

function EditProfilePage() {
    const router = useRouter();
    const { userLoginData, setUserLoginData } = useUser();
    const [formData, setFormData] = useState<User>({
        _id: '',
        userName: '',
        password: '',
        image: '',
        email: '',
        gender: '',
        role: '',
        isBlocked: false,
        createdAt: '',
        updatedAt: '',
    });

    useEffect(() => {
        if (userLoginData) {
            setFormData(userLoginData);
        }
    }, [userLoginData]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `${PORT}/user/updatedProfile/${userLoginData?._id}`,
                { formData }
            );
            if (response.status === 200) {
                if (userLoginData) {
                    localStorage.setItem(
                        'userLoginData',
                        JSON.stringify(formData)
                    );
                    setUserLoginData(formData);
                }
                toast.success('Lưu thông tin thành công!');
                setTimeout(() => {
                    router.push('/profile');
                }, 2000);
            }
        } catch (error) {
            toast.error('Lưu thông tin thất bại');
        }
    };

    return (
        <Suspense fallback={<Loanding />}>
            <button className="mt-2 p-2 hover:rounded-full hover:bg-[#50bceb] hover:text-white">
                <Link href="/profile">
                    <FaArrowLeft />
                </Link>
            </button>
            <form className="mt-2 ml-8" onSubmit={handleSubmit}>
                <div className="">
                    <span className="roboto-bold">Email: </span>
                    <input
                        type="email"
                        value={formData?.email}
                        name="email"
                        className="rounded-[15px] border-2 p-1 pl-4 roboto-regular"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex items-center mt-3">
                    <span className="roboto-bold mr-3">Gender: </span>
                    <input
                        className="mr-2"
                        type="radio"
                        value="Nam"
                        name="gender"
                        checked={formData?.gender === 'Nam'}
                        onChange={handleChange}
                    />
                    <label className="roboto-regular mr-3" htmlFor="male">
                        Nam
                    </label>
                    <input
                        className="mr-2"
                        type="radio"
                        value="Nữ"
                        name="gender"
                        checked={formData?.gender === 'Nữ'}
                        onChange={handleChange}
                    />
                    <label className="roboto-regular" htmlFor="female">
                        Nữ
                    </label>
                </div>
                <button
                    type="submit"
                    className="button mt-3 ml-5 rounded-[15px] roboto-regular text-white bg-[#3977cdc6] px-3 py-2 hover:bg-[#3977cd]"
                >
                    <Link href="/profile">Lưu thông tin</Link>
                </button>
            </form>
            <Toaster position="top-right" />
        </Suspense>
    );
}

export default EditProfilePage;
