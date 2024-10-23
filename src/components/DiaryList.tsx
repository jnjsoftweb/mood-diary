'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Diary {
  id: number
  date: string
  content: string
  emotion: string
}

export function DiaryList() {
  const [diaries, setDiaries] = useState<Diary[]>([])

  useEffect(() => {
    const storedDiaries = JSON.parse(localStorage.getItem('diaries') || '[]')
    setDiaries(storedDiaries)
  }, [])

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case 'happy': return 'bg-yellow-200'
      case 'sad': return 'bg-blue-200'
      case 'angry': return 'bg-red-200'
      case 'excited': return 'bg-orange-200'
      default: return 'bg-gray-200'
    }
  }

  return (
    <div className="space-y-4">
      {diaries.map((diary) => (
        <div key={diary.id} className={`p-4 rounded-lg ${getEmotionColor(diary.emotion)}`}>
          <h2 className="text-lg font-semibold">{new Date(diary.date).toLocaleDateString()}</h2>
          <p className="mt-2">{diary.content.substring(0, 100)}...</p>
          <Link href={`/diary/${diary.id}`} className="mt-2 inline-block text-blue-500 hover:underline">
            자세히 보기
          </Link>
        </div>
      ))}
    </div>
  )
}
