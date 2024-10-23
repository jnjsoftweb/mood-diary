"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getDiaries, Diary } from "@/lib/diaryUtils";
import { getEmotionFeedback } from "@/lib/emotionAnalysis";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Smile, Meh, Frown, Angry } from "lucide-react"; // 아이콘 import

export default function Home() {
  const [entries, setEntries] = useState<Diary[]>([]);
  const router = useRouter();

  useEffect(() => {
    setEntries(getDiaries());
  }, []);

  const handleWriteDiary = () => {
    router.push("/write");
  };

  // 감정에 따른 아이콘 컴포넌트를 반환하는 함수
  const getEmotionIcon = (emotion: string) => {
    switch (emotion.toLowerCase()) {
      case "happy":
        return <Smile className="mr-2" />;
      case "sad":
        return <Frown className="mr-2" />;
      case "angry":
        return <Angry className="mr-2" />;
      default:
        return <Meh className="mr-2" />;
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">일기 목록</h1>
        <Button onClick={handleWriteDiary}>일기 쓰기</Button>
      </div>
      <ul>
        {entries.map((entry: Diary) => {
          const { color } = getEmotionFeedback(entry.emotion);
          return (
            <li key={entry.id} className="mb-2">
              <Link href={`/diary/${entry.id}`}>
                <div className="flex items-center">
                  {getEmotionIcon(entry.emotion)}
                  <span style={{ color }}>
                    {new Date(entry.date).toLocaleDateString()} - {entry.content.substring(0, 50)}...
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
