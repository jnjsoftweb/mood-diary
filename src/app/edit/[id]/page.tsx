"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Diary, getDiaries, saveDiary } from "@/lib/diaryUtils";
import { analyzeEmotion } from "@/lib/emotionAnalysis";

export default function EditDiaryPage() {
  const [diary, setDiary] = useState<Diary | null>(null);
  const [content, setContent] = useState("");
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  useEffect(() => {
    if (id) {
      const diaries = getDiaries();
      const foundDiary = diaries.find((d: Diary) => d.id === parseInt(id));
      if (foundDiary) {
        setDiary(foundDiary);
        setContent(foundDiary.content);
      } else {
        router.push("/");
      }
    }
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (diary) {
      const updatedDiary: Diary = {
        ...diary,
        content,
        emotion: analyzeEmotion(content),
      };
      saveDiary(updatedDiary);
      router.push(`/diary/${diary.id}`);
    }
  };

  if (!diary) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">일기 수정</h1>
      <form onSubmit={handleSubmit}>
        <Textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full h-64 mb-4" />
        <Button type="submit">저장</Button>
      </form>
    </div>
  );
}
