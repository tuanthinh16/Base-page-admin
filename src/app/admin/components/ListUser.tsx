import ACCOUNT from '@/app/model/account'
import { ActionDelete, ActionEdit, ActionUpdate, ActionAdd } from '@/configApplication/configApplication'
import MessageManager from '@/providers/MessageManager'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'

const ListUser=() => {
  const { data: session, status: sessionStatus } = useSession();
  const [listData,SetListData] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [message,setMessage] = useState('');
  const [action,setAction] = useState(0);
  const [currentAccount,setCurrentAccount] = useState<ACCOUNT|null>();
  const {enqueueSnackbar} = useSnackbar();
  
  useEffect(() => {
    loadData();
  }, []);
  const loadData = async ()=>{
    const response = await axios.get('/api/accounts?',{
        headers:{
            'Content-Type':'application/json',
            
        },withCredentials: true,
    });
    if(response.status === 200){
        const user = response.data;
        SetListData(user);
    }
  }
  if (sessionStatus === 'loading') {
    return <div className='text-center m-auto'>Loading...</div>;
  }
  if (!session) {
    return <div className='m-auto'>
      <h1>401 - Unauthorize</h1>
        Please log in to view the accounts.
      </div>;
  }
  const ProcessDelete = async ()=>{

    try {
      const response = await axios.delete(`/api/accounts?_id=${currentAccount?._id}`,{
      headers:{
        'Content-Type':'application/json',
        Authorization: `Bearer ${session?.jwt}`
        },
        withCredentials: true,
      })
      if(response.status == 200){
        loadData();
        enqueueSnackbar('Delete Account SuccessFully',{variant:'success'})
      }
    } catch (error) {
      console.log("____Error when delete account");
    }
  }
  const ProcessEdit =()=>{

  }
  const ProcessAdd =()=>{
    
  }
  const ProcessUpdate =()=>{
    
  }
  const handleEdit=(account:ACCOUNT)=>{
    
  }
  const handleDelete = (account:ACCOUNT)=>{
    try {
      setMessage("Bạn có muốn xóa bỏ dữ liệu?");
      setAction(ActionDelete);
      setCurrentAccount(account);
      setShowDialog(true);
    } catch (error) {
      
    }
  }
  const handleChangeRole = (account:ACCOUNT)=>{
    try {
      
    } catch (error) {
      
    }
  }
  const handleConfirm = () =>{
    try {
      action == ActionDelete ? ProcessDelete():action == ActionEdit?ProcessEdit():action == ActionAdd?ProcessAdd():action== ActionUpdate?ProcessUpdate():"";
      setShowDialog(false);
    } catch (error) {
      
    }
  }

  return (
    <div className="min-w-screen">
      <table className="min-w-max bg-white border border-gray-300">
        <thead>
          <tr className='bg-gray-300'>
            <th className="py-2 px-4 border-b">STT</th>
            <th className="py-2 px-4 border-b">Fullname</th>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Address</th>
            <th className="py-2 px-4 border-b">Phone</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">CreateTime</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listData?.map((account:ACCOUNT, index:number) => (
            <tr key={account._id} className={`border-b ${account.role === 'admin' ? 'bg-green-200' : account.role === 'staff' ? 'bg-yellow-200' : ''}`}>
              <td className="py-2 px-4  text-center">{index + 1}</td>
              <td className="py-2 px-4 ">{account.fullname}</td>
              <td className="py-2 px-4 ">{account.username}</td>
              <td className="py-2 px-4 ">{account.address}</td>
              <td className="py-2 px-4 ">{account.phone}</td>
              <td className="py-2 px-4 ">{account.role}</td>
              <td className="py-2 px-4 ">
                {account.createTime}
              </td>
              <td className="text-center flex justify-between m-auto">
                <div className="relative group inline-block">
                  <button className= "px-2 py-1 rounded mr-2 "
                    onClick={()=>handleEdit(account)}>
                    <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-max bg-black text-white text-xs rounded-md py-1 px-2 opacity-0 group-hover:opacity-50 transition-opacity">Edit user</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-blue-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                  </button>
                </div>
                <div className="relative group inline-block">
                  <button className=" px-2 py-1 rounded mr-2"
                   onClick={()=> handleDelete(account)}>
                  <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-max bg-black text-white text-xs rounded-md py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">Delete user</span>
                    
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                  </div>
                <div className="relative group inline-block">
                  <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-max bg-black text-white text-xs rounded-md py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">Change role</span>
                    <button className="px-2 py-1 rounded"
                    onClick={()=> handleChangeRole(account)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-yellow-500 font-bold">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                    </svg>
                  </button>
                  </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <MessageManager 
          open={showDialog} 
          onClose={() => setShowDialog(false)} 
          onConfirm={()=>handleConfirm()} 
          text={message}
        />
    </div>
  )
}

export default ListUser;

