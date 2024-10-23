'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Diary, saveDiary } from "@/lib/diaryUtils"
import { analyzeEmotion } from "@/lib/emotionAnalysis"

interface WriteDiaryFormProps {
  diary?: Diary;
}

export function WriteDiaryForm({ diary }: WriteDiaryFormProps) {
  const [content, setContent] = useState(diary?.content || '')
  const [date, setDate] = useState<Date | undefined>(diary ? new Date(diary.date) : new Date())
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (diary) {
      setContent(diary.content)
      setDate(new Date(diary.date))
    }
  }, [diary])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsAnalyzing(true)
    
    try {
      const emotion = await analyzeEmotion(content)
      
      const newDiary: Diary = {
        id: diary?.id || Date.now(),
        date: date?.toISOString() || new Date().toISOString(),
        content,
        emotion
      }

      saveDiary(newDiary)
      router.push('/')
    } catch (error) {
      console.error('Error submitting diary:', error);
      // 여기에 사용자에게 오류를 알리는 로직을 추가할 수 있습니다.
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>날짜를 선택하세요</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="오늘의 일기를 작성해주세요..."
        required
        className="min-h-[200px]"
      />
      <Button type="submit" disabled={isAnalyzing}>
        {isAnalyzing ? '감정 분석 중...' : (diary ? '수정하기' : '저장하기')}
      </Button>
    </form>
  )
}
