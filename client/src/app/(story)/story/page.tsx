'use client';
import { PORT } from '@/api/port';
import { Book } from '@/schema/Book';
import { useUser } from '@/store/userLogin';
import axios from 'axios';
import { format } from 'date-fns';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';

function StoryPage() {
    const { userLoginData } = useUser();
    const [books, setBook] = useState<Book[]>([]);
    const handleSearchClick = () => {
        console.log('search click');
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${PORT}/novel/showStory/${userLoginData?.userName}`
                );
                if (response.status === 200) {
                    const data = response.data;
                    setBook(data.book);
                    console.log(data.book);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [userLoginData]);

    return (
        <div>
            <div className="px-5 box_shadow rounded-[15px] roboto-regular ">
                <div className="relative max-w-[20%] ">
                    <input
                        type="text"
                        className="rounded-[10px] border-2 p-1 w-full mt-6"
                        placeholder="Tìm kiếm"
                    />
                    <CiSearch
                        onClick={handleSearchClick}
                        className="absolute right-[5%] top-[55%] transition translate-y-[-1/2]"
                    />
                </div>
                <div className="grid grid-cols-10 mt-6 border-b-2 pb-1">
                    <div className="col-span-3  pl-4"> Truyện</div>
                    <div className="col-span-2"> Thời gian</div>
                    <div className="col-span-2"> Trạng thái</div>
                    <div className="col-span-3"></div>
                </div>
                <div className="pb-6">
                    {books.map((book) => (
                        <div
                            className="grid grid-cols-10 py-3 border-b-2 "
                            key={book._id}
                        >
                            <div className="flex items-center col-span-3  pl-4">
                                <Image
                                    src={book.image}
                                    alt=""
                                    width={100}
                                    height={100}
                                    className="w-[60px] h-[80px] rounded mr-3"
                                ></Image>
                                {book.title}
                            </div>
                            <div className="flex items-center col-span-2">
                                {book.createdAt
                                    ? format(
                                          new Date(book.createdAt),
                                          'HH:mm:ss dd/MM/yyyy '
                                      )
                                    : 'invalid date'}
                            </div>
                            <div className="flex items-center col-span-2">
                                {book.status}
                            </div>
                            <div className="flex items-center col-span-3"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default StoryPage;
