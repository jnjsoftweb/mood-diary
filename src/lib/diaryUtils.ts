export interface Diary {
  id: number;
  date: string;
  content: string;
  emotion: string;
}

export function getDiaries(): Diary[] {
  return JSON.parse(localStorage.getItem('diaries') || '[]');
}

export function saveDiary(diary: Diary) {
  const diaries = getDiaries();
  const index = diaries.findIndex(d => d.id === diary.id);
  if (index !== -1) {
    diaries[index] = diary;
  } else {
    diaries.push(diary);
  }
  localStorage.setItem('diaries', JSON.stringify(diaries));
}

export function deleteDiary(id: number) {
  const diaries = getDiaries();
  const updatedDiaries = diaries.filter(d => d.id !== id);
  localStorage.setItem('diaries', JSON.stringify(updatedDiaries));
}
