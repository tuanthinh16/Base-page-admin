// accountModel.ts

interface ACCOUNT {
    _id: string;
    username: string;
    password: string;
    fullname: string;
    address: string;
    phone: string;
    role: string;
    lastLogin: Date;
    createTime: Date;
    modifyTime: Date;
}

export default ACCOUNT;
