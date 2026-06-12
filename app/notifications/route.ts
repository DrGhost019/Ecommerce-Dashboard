import { NextResponse } from 'next/server';

const mockNotifications = [
  { id: 1, name: "Sarah Johnson", action: "started following you", time: "2 minutes ago", isRead: false },
  { id: 2, name: "Michael Chen", action: "started following you", time: "15 minutes ago", isRead: false },
  { id: 3, name: "Emma Wilson", action: "started following you", time: "1 hour ago", isRead: false },
  { id: 4, name: "James Rodriguez", action: "started following you", time: "2 hours ago", isRead: false },
  { id: 5, name: "Olivia Martinez", action: "started following you", time: "3 hours ago", isRead: false },
  { id: 6, name: "William Brown", action: "started following you", time: "5 hours ago", isRead: false },
  { id: 7, name: "Sophia Taylor", action: "started following you", time: "8 hours ago", isRead: false },
  { id: 8, name: "Benjamin Lee", action: "started following you", time: "1 day ago", isRead: false },
];

export async function GET() {
  await new Promise(resolve => setTimeout(resolve, 200));
  return NextResponse.json(mockNotifications);
}