"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Diary, getDiaries, deleteDiary } from "@/lib/diaryUtils";
import { getEmotionFeedback } from "@/lib/emotionAnalysis";

export default function DiaryPage() {
  const [diary, setDiary] = useState<Diary | null>(null);
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  useEffect(() => {
    if (id) {
      const diaries = getDiaries();
      const foundDiary = diaries.find((d: Diary) => d.id === parseInt(id));
      if (foundDiary) {
        setDiary(foundDiary);
      } else {
        router.push("/");
      }
    }
  }, [id, router]);

  const handleDelete = () => {
    if (diary) {
      deleteDiary(diary.id);
      router.push("/");
    }
  };

  const handleEdit = () => {
    if (diary) {
      router.push(`/edit/${diary.id}`);
    }
  };

  const handleList = () => {
    router.push("/");
  };

  if (!diary) return <div>Loading...</div>;

  const { color, icon: IconComponent } = getEmotionFeedback(diary.emotion);

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center">
        <IconComponent size={24} color={color} className="mr-2" />
        <h1 className="text-2xl font-bold">{new Date(diary.date).toLocaleDateString()}</h1>
      </div>
      <p className="mb-4" style={{ color }}>
        {diary.content}
      </p>
      <p>감정: {diary.emotion}</p>
      <div className="mt-4 space-x-2">
        <Button onClick={handleList}>목록</Button>
        <Button onClick={handleEdit}>수정</Button>
        <Button onClick={handleDelete} variant="destructive">
          삭제
        </Button>
      </div>
    </div>
  );
}
