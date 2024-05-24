"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ListUser from '../components/ListUser';
import { useSession } from 'next-auth/react';

const UserManager = () => {

  const { data: session, status: sessionStatus } = useSession();
  
  return (
    <div>
      <ListUser />
    </div>
  )
}

export default UserManager
