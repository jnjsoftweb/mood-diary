import Link from 'next/link'
import { DiaryList } from '@/components/DiaryList'

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">MoodDiary</h1>
      <Link href="/write" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mb-4 inline-block">
        새 일기 작성
      </Link>
      <DiaryList />
    </div>
  )
}
