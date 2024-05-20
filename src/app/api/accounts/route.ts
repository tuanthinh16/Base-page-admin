import { NextRequest, NextResponse } from 'next/server';
import { getData, insertData, updateData, deleteData } from '../../../lib/DBHelper';

// GET handler
export async function GET(req: NextRequest) {
  try {
    // Lấy các tham số truy vấn từ URL
    const { searchParams } = new URL(req.url);
    const query: Record<string, any> = {};

    // Tạo bộ lọc từ các tham số truy vấn
    searchParams.forEach((value, key) => {
      query[key] = value;
    });

    const users = await getData('users', query);
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
  }
}

// POST handler
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const body = Object.fromEntries(formData.entries());
    const newUser = await insertData('users', body);
    return NextResponse.json(newUser, { status: 201 });
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
    const formData = await req.formData();
    const body = Object.fromEntries(formData.entries());
    const query = body;
    const success = await deleteData('users', query);
    return NextResponse.json({ success }, { status: success ? 200 : 404 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Error deleting user' }, { status: 500 });
  }
}
