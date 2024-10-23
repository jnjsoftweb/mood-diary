'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { WriteDiaryForm } from "@/components/WriteDiaryForm"
import { Diary, getDiaries, deleteDiary } from "@/lib/diaryUtils"

export default function DiaryPage() {
  const [diary, setDiary] = useState<Diary | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const params = useParams()
  const router = useRouter()

  useEffect(() => {
    const diaries = getDiaries()
    const foundDiary = diaries.find((d: Diary) => d.id === Number(params.id))
    if (foundDiary) {
      setDiary(foundDiary)
    } else {
      router.push('/')
    }
  }, [params.id, router])

  const handleDelete = () => {
    if (diary) {
      deleteDiary(diary.id)
      router.push('/')
    }
  }

  if (!diary) return <div>Loading...</div>

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{new Date(diary.date).toLocaleDateString()} 일기</CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <WriteDiaryForm diary={diary} />
          ) : (
            <>
              <p className="mb-4">{diary.content}</p>
              <p className="mb-4">감정: {diary.emotion}</p>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/">
            <Button variant="outline">홈으로 돌아가기</Button>
          </Link>
          {!isEditing && (
            <div>
              <Button onClick={() => setIsEditing(true)} className="mr-2">수정</Button>
              <Button onClick={handleDelete} variant="destructive">삭제</Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
