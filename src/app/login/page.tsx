"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import ACCOUNT from '../model/account';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { ISODateString } from 'next-auth';
import { JWT } from 'next-auth/jwt';


function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { data: token, status: sessionStatus } = useSession();
    const router = useRouter();
    const {enqueueSnackbar} = useSnackbar();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await signIn("credentials", {
            redirect: false,
            username,
            password,
        });
        if(response?.url){
            if(token){
                console.log("___TOKEN",token);
                
            }
        }
        console.log("___RESPONSE",response);
    };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800">Đăng nhập</h2>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label className="block text-gray-700 mb-2">Tên người dùng:</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 mb-2">Mật khẩu:</label>
            <input
              type="password"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600"
            >
              Đăng nhập
            </button>
            <Link href={"/register"} className='text-blue-800 hover:text-red-600 px-2 py-3'>{"Chưa có tài khoản? Đăng kí ngay"}</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;