'use client';
import React, { useRef, useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../../firebase/config';
import Image from 'next/image';
import { CiCirclePlus } from 'react-icons/ci';
import { useUser } from '@/store/userLogin';
import axios from 'axios';
import { PORT } from '@/api/port';
import toast, { Toaster } from 'react-hot-toast';

function PostStoryPage() {
    const { userLoginData, setUserLoginData } = useUser();
    const [imageChange, setImageChange] = useState<string | null>(null);
    const [inputList, setInputList] = useState(['']);
    const [file, setFile] = useState<File | null>(null);
    const [uploadedUrl, setUploadedUrl] = useState<String | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
        image: '',
        numberOfChapter: 0,
        type: [''],
    });

    const imageUpload = useRef<HTMLInputElement>(null);
    const checkedMedssage = useRef<HTMLInputElement>(null);

    const addInput = () => {
        setInputList([...inputList, '']);
    };

    const handleTypeChange = (index: number, e: any) => {
        const value = [...formData.type];
        value[index] = e.target.value;
        setFormData((prevFormData) => ({
            ...prevFormData,
            type: value,
        }));
        console.log(formData);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleFileChange = (e: any) => {
        setFile(e.target.files[0]);
        setImageChange(URL.createObjectURL(e.target.files[0]));
    };

    const handleUploadInfo = async (e: any) => {
        e.preventDefault();
        if (!file) return;
        const storageRef = ref(
            storage,
            `images/${userLoginData?.userName}/book/${formData.title}`
        );
        try {
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            const author = userLoginData?.userName || '';
            setFormData((prevFormData) => ({
                ...prevFormData,
                author: author,
                image: url,
            }));

            const updatedFormData = {
                ...formData,
                author: author,
                image: url,
            };
            const response = await axios.post(`${PORT}/novel/addStory`, {
                updatedFormData,
            });
            if (response.status === 200) {
                toast.success('Đăng truyện thành công!');
            }
        } catch (error) {
            console.log('post book error:', error);
        } finally {
            if (imageUpload.current) {
                imageUpload.current.value = '';
            }
            setFile(null);
        }
    };

    return (
        <div className="grid grid-cols-2 gap-4 w-full mt-8 ">
            <div className="col-span-1 rounded-[15px] box_shadow px-4  ">
                <h1 className="mt-4  roboto-bold text-[20px]">Đăng truyện</h1>
                <form className="mt-2" onSubmit={handleUploadInfo}>
                    <div className="roboto-regular text-[16px]">
                        <div>Tên truyện</div>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            className="border-2 rounded-[10px] py-1 px-4 w-full"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="roboto-regular text-[16px] mt-2">
                        <div>Giới thiệu</div>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="border-2 rounded-[10px] py-1 px-4 w-full"
                        />
                    </div>

                    <div className="roboto-regular text-[16px] mt-2">
                        <div className="flex items-center ">
                            <div>Thể loại</div>
                            <CiCirclePlus
                                className="ml-1 hover:text-red-500"
                                onClick={addInput}
                            />
                        </div>
                        {inputList.map((input, index) => (
                            <input
                                key={index}
                                type="text"
                                name="type"
                                onChange={(e) => {
                                    handleTypeChange(index, e);
                                }}
                                className="border-2 rounded-[10px] py-1 px-4 w-full mt-2"
                            />
                        ))}
                    </div>

                    <div className="roboto-regular text-[16px] mt-2">
                        <div>Ảnh bìa </div>
                        {imageChange && (
                            <div className="flex items-center justify-center py-4">
                                <Image
                                    src={imageChange}
                                    alt=""
                                    width={100}
                                    height={100}
                                    className=" w-[150px] h-[150px] rounded"
                                ></Image>
                            </div>
                        )}
                        <input
                            ref={imageUpload}
                            type="file"
                            name="image"
                            className=""
                            onChange={handleFileChange}
                        />

                        <button></button>
                    </div>

                    <div className="roboto-regular text-[16px] mt-2">
                        <input
                            ref={checkedMedssage}
                            type="checkbox"
                            className="mr-2"
                            required
                        />
                        <label>
                            Tôi đồng ý với các điều khoản dịch vụ khi đăng
                            truyện.{' '}
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="button px-2 py-1 my-4 float-end rounded-[10px] bg-[#326ddbd6] hover:bg-[#326ddb] roboto-regular text-white"
                    >
                        Tiếp theo
                    </button>
                </form>
            </div>
            <div className="col-span-1 rounded-[15px] box_shadow px-4">
                <h1 className="mt-4  roboto-bold text-[20px]">
                    Điều khoản dịch vụ
                </h1>
            </div>
            <Toaster position="top-right" />
        </div>
    );
}

export default PostStoryPage;
