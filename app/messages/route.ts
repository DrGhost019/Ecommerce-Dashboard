import { NextResponse } from 'next/server';

const mockMessages = [
  {
    id: 1,
    title: "Special Product Discount",
    description: "20% discount on new Kanky Kitadakate shoes",
    time: "5 minutes ago",
    isRead: false,
  },
  {
    id: 2,
    title: "Product Discount",
    description: "15% discount on new season backpacks",
    time: "1 hour ago",
    isRead: false,
  },
];

export async function GET() {
  await new Promise(resolve => setTimeout(resolve, 200));
  return NextResponse.json(mockMessages);
}