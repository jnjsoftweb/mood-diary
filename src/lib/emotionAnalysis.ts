import { Smile, Meh, Frown, Angry } from "lucide-react";

export const getEmotionFeedback = (emotion: string) => {
  switch (emotion.toLowerCase()) {
    case "happy":
      return { color: "#FFD700", icon: Smile };
    case "sad":
      return { color: "#1E90FF", icon: Frown };
    case "angry":
      return { color: "#FF6347", icon: Angry };
    case "excited":
      return { color: "#FF4500", icon: Smile };
    default:
      return { color: "#808080", icon: Meh };
  }
};

// 간단한 감정 분석 함수 추가
export const analyzeEmotion = (content: string): string => {
  const lowercaseContent = content.toLowerCase();
  if (lowercaseContent.includes("happy") || lowercaseContent.includes("joy")) {
    return "happy";
  } else if (lowercaseContent.includes("sad") || lowercaseContent.includes("depressed")) {
    return "sad";
  } else if (lowercaseContent.includes("angry") || lowercaseContent.includes("mad")) {
    return "angry";
  } else if (lowercaseContent.includes("excited") || lowercaseContent.includes("thrilled")) {
    return "excited";
  } else {
    return "neutral";
  }
};
