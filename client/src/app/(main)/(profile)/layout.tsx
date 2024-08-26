'use client';
import { useRef, useState } from 'react';
import { useUser } from '@/store/userLogin';
import { format } from 'date-fns';
import Image from 'next/image';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase/config';
import { PORT } from '@/api/port';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';
import NavProfile from '@/components/nav_profile';

export default function ProfileLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { userLoginData, setUserLoginData } = useUser();
    const [changeImage, setChangeImage] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadedUrl, setUploadedUrl] = useState<String | null>(null);
    const uploadInput = useRef<HTMLInputElement>(null);
    const uploadImage = useRef<HTMLDivElement>(null);

    const handleChangeImage = () => {
        if (changeImage) {
            setChangeImage(false);
        } else {
            setChangeImage(true);
        }
    };
    const handleFileChange = (e: any) => {
        setFile(e.target.files[0]);
    };

    const handelUpload = async () => {
        if (!file) return;
        setUploading(true);
        const storageRef = ref(
            storage,
            `images/${userLoginData?.userName}/avatar`
        );
        console.log('Uploaded image successfully');
        try {
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            setUploadedUrl(url);
            try {
                const response = await axios.put(
                    `${PORT}/user/updatedProfile/${userLoginData?._id}`,
                    {
                        image: uploadedUrl,
                    }
                );
                if (response.status === 200) {
                    if (userLoginData) {
                        const updatedUser = { ...userLoginData, image: url };
                        localStorage.setItem(
                            'userLoginData',
                            JSON.stringify(updatedUser)
                        );
                        setUserLoginData(updatedUser);
                    }
                    toast.success('Đổi avatar thành công!');
                }
            } catch (error) {
                toast.error('Đổi avt thất bại');
            }
        } catch (error) {
            console.log('uploaded image error', error);
        } finally {
            if (uploadInput.current) {
                uploadInput.current.value = '';
            }
            setFile(null);
            setUploading(false);
        }
    };

    const createdDate = userLoginData?.createdAt
        ? format(new Date(userLoginData.createdAt), 'dd/MM/yyyy HH:mm:ss')
        : '';
    return (
        <div className="">
            <div className="relative">
                <Image
                    src={'https://iili.io/d1bEZtp.png'}
                    alt=""
                    width={400}
                    height={400}
                    className="w-full h-72"
                ></Image>
                <div className="absolute  grid grid-cols-9 top-[90%] box_shadow rounded-t-[20px] w-full ">
                    <aside className="relative px-3 col-span-3 bg-[#fdfcdd] rounded-tl-[20px]">
                        <div className="absolute top-[-1/2] left-1/2 transform -translate-y-1/2 -translate-x-1/2 ">
                            <Image
                                src={
                                    userLoginData && userLoginData.image
                                        ? userLoginData.image
                                        : '/images/avatar-trang.jpg'
                                }
                                alt=""
                                width={400}
                                height={400}
                                className="rounded-full w-40 h-40"
                            ></Image>
                            {uploading && (
                                <div className="absolute top-0 rounded-full w-40 h-40 bg-white opacity-50 flex items-center justify-center">
                                    <FaSpinner className="spin" />
                                </div>
                            )}
                        </div>
                        <div className="mt-20">
                            {' '}
                            <div className=" text-center roboto-bold text-[20px]">
                                {userLoginData?.userName}
                            </div>
                            <div className="text-center">
                                <button
                                    className=" roboto-regular px-2 py-1 rounded-[15px] bg-[#333] text-[#fff] hover:text-[] hover:bg-[#333333d6]"
                                    onClick={handleChangeImage}
                                >
                                    Đổi avatar
                                </button>
                            </div>
                            {changeImage && (
                                <div
                                    className="flex items-center justify-center"
                                    ref={uploadImage}
                                >
                                    <input
                                        type="file"
                                        ref={uploadInput}
                                        className="w-[70%]"
                                        onChange={handleFileChange}
                                    />
                                    <button
                                        className="roboto-regular ml-2 px-2 py-1 rounded-[15px] bg-[#333] text-[#fff] hover:text-[] hover:bg-[#333333d6]"
                                        onClick={handelUpload}
                                    >
                                        Tải lên
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="roboto-regular mt-5">
                            Ngày tạo: {createdDate}
                        </div>
                        <div className="roboto-regular">Số truyện đã đọc:</div>
                        <div className="roboto-regular">
                            Số truyện chương đã đọc:
                        </div>
                        <div className="roboto-regular">
                            Số truyện đánh dấu:
                        </div>
                    </aside>
                    <section className="col-span-6 bg-white rounded-tr-[20px]">
                        <NavProfile />
                        <div className="px-3">{children}</div>
                    </section>
                </div>
            </div>
            <Toaster position="top-right" />
        </div>
    );
}
