'use client';
import { PORT } from '@/api/port';
import { Book } from '@/schema/Book';
import { useUser } from '@/store/userLogin';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import mammoth from 'mammoth';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function PostChapterPage({ params }: { params: { id: String } }) {
    const router = useRouter();
    const { userLoginData } = useUser();
    const [typeInput, setTypeInput] = useState(true);
    const [book, setBook] = useState<Book | null>(null);
    const [fileContent, setFileContent] = useState<string>('');
    const [formData, setFormData] = useState({
        title: '',
        chapterNumber: 0,
        content: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${PORT}/novel/showStoryDetail/${params.id}`
                );
                if (response.status === 200) {
                    const data = response.data;
                    setBook(data.book);
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        chapterNumber: data.book.numberOfChapter + 1,
                    }));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [params]);
    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            content: fileContent,
        }));
    }, [fileContent]);

    const handleInputChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleFileUpload = (e: any) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            if (file.type === 'text/plain') {
                reader.onload = (e: any) => {
                    setFileContent(e.target.result);
                };
                reader.readAsText(file);
            }
            if (
                file.type ===
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            ) {
                reader.onload = async (e: any) => {
                    const arrayBuffer = e.target.result;
                    const result = await mammoth.extractRawText({
                        arrayBuffer,
                    });
                    setFileContent(result.value);
                };
                reader.readAsArrayBuffer(file);
            }
        }
    };

    const handleFormSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${PORT}/novel/addChapter/${params.id}`,
                { formData }
            );
            if (response.status === 200) {
                toast.success('Đăng chương thành công!');
                setTimeout(() => {
                    router.push('/story');
                }, 2000);
            }
        } catch (error) {
            toast.error('Đăng chương thất bại');
            console.log(error);
        }
    };

    if (!book) {
        return (
            <div className="flex items-center justify-center">
                <FaSpinner className="spin" />
            </div>
        );
    }
    return (
        <div>
            <div className="px-5  box_shadow rounded-[15px] roboto-regular ">
                <div className="py-6 roboto-bold">Thêm chương</div>
                <form className="pb-6" onSubmit={handleFormSubmit}>
                    <div className="flex items-center">
                        <div className="flex-1">
                            <div>Chương</div>
                            <input
                                type="number"
                                value={formData.chapterNumber}
                                className="rounded-[10px] border-2 outline-none py-1 mt-1 pl-2 "
                                readOnly
                                style={{ width: 'calc(100% - 4%)' }}
                            />
                        </div>
                        <div className="flex-1">
                            <div>Tên chương</div>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                className="rounded-[10px] border-2 outline-none py-1 pl-2 mt-1  w-full "
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-6">
                        <div className="flex items-center">
                            <span className="">Nội dung chương: </span>
                            <div className=" ml-1">
                                <input
                                    type="radio"
                                    name="option"
                                    id=""
                                    className="mr-1"
                                    onClick={(e) => {
                                        setTypeInput(true);
                                    }}
                                    defaultChecked
                                />
                                <label>Nhập bằng tay</label>
                            </div>
                            <div className="">
                                <input
                                    type="radio"
                                    name="option"
                                    id=""
                                    className="mr-1 ml-2"
                                    onClick={(e) => {
                                        setTypeInput(false);
                                    }}
                                />
                                <label>Đọc từ tệp .docx, .txt</label>
                            </div>
                        </div>
                        {typeInput ? (
                            <>
                                <textarea
                                    name="content"
                                    id=""
                                    className="w-full border-2 rounded-[10px] pl-2 min-h-[10rem] mt-1"
                                    value={formData.content}
                                    onChange={handleInputChange}
                                    required
                                ></textarea>
                            </>
                        ) : (
                            <>
                                <div className="mt-1">
                                    <input
                                        type="file"
                                        name=""
                                        id=""
                                        onChange={handleFileUpload}
                                    />
                                </div>
                                {fileContent && (
                                    <>
                                        <textarea
                                            className="border-2 w-full rounded mt-3 min-h-[20rem]"
                                            value={fileContent}
                                            onChange={(e) =>
                                                setFileContent(e.target.value)
                                            }
                                            required
                                        ></textarea>
                                    </>
                                )}
                            </>
                        )}

                        <button
                            type="submit"
                            className="button rounded-[10px] bg-[#2385f5] text-white py-1 px-2 mt-2"
                        >
                            Đăng chương
                        </button>
                    </div>
                </form>
            </div>
            <Toaster position="top-right" />
        </div>
    );
}

export default PostChapterPage;
