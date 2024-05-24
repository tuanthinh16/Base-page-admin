import { NextRequest, NextResponse } from 'next/server';
import { getData, insertData, updateData, deleteData } from '../../../lib/DBHelper';
import { getToken } from 'next-auth/jwt';
import { error } from 'console';
import { ObjectId } from 'mongodb';
import { json } from 'stream/consumers';

// GET handler
const SECRET = process.env.NEXT_AUTH_SECRET;
export async function GET(req: NextRequest) {
  try {
    //const token = await getToken({ req, secret: SECRET });
    //if(!token) return NextResponse.json({error:"Unauthorize"},{status:401});
    // Lấy các tham số truy vấn từ URL
    const { searchParams } = new URL(req.url);
    const query: Record<string, any> = {};

    // Tạo bộ lọc từ các tham số truy vấn
    searchParams.forEach((value, key) => {
      query[key] = value;
    });
    const cookies = req.headers.get('cookie');
    console.log("____cookie on backend: ",cookies);
    console.log("___query: ",query);
    if(cookies){
      const users = await getData('users', query);
      return NextResponse.json(users, { status: 200 });
    }
    else{
      return NextResponse.json({ Warn: 'Must be login' }, { status: 401 });
    }
    
    
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
  }
}

// POST handler
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    console.log("__FORMDATA: ",formData)
    const body = Object.fromEntries(formData.entries());
    const cookies = req.headers.get('cookie');
    const newUser = await insertData('users', body);
    return NextResponse.json({"newUser":newUser}, { status: 200 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}

// PUT handler
export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();
    const body = Object.fromEntries(formData.entries());
    const { query, update } = body;
    const success = await updateData('users', query, update);
    return NextResponse.json({ success }, { status: success ? 200 : 404 });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Error updating user' }, { status: 500 });
  }
}

// DELETE handler
export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.nextUrl);
    const searchParams = new URLSearchParams(url.search);
    const accountId = searchParams.get('_id');

    if (!accountId) {
      return NextResponse.json({ error: 'Missing required query parameter "_id"' }, { status: 400 });
    }
    
    // Call your deleteData function passing the account_ID
    const success = await deleteData('users', {"_id":new ObjectId(accountId) });
    
    return NextResponse.json({ success }, { status: success ? 200 : 403 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Error deleting user' }, { status: 500 });
  }
}
