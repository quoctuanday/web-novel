'use client';
import Loanding from '@/app/(main)/(profile)/loanding';
import { useUser } from '@/store/userLogin';
import { Suspense, useRef, useState } from 'react';

function CommentPage() {
    const { userLoginData, setUserLoginData } = useUser();

    return (
        <div className="">
            <Suspense fallback={<Loanding />}>
                <h1>hello</h1>
            </Suspense>
        </div>
    );
}

export default CommentPage;
