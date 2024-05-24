// accountModel.ts

import { ObjectId } from "mongodb";

interface ACCOUNT {
    map(arg0: (account: ACCOUNT, index: number) => import("react").JSX.Element): import("react").ReactNode;
    _id: ObjectId;
    username: string;
    password: string;
    fullname: string;
    address: string;
    phone: string;
    role: string;
    lastLogin: string;
    createTime: string;
    modifyTime: string;
}

export default ACCOUNT;
