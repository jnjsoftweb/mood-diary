import { WriteDiaryForm } from '@/components/WriteDiaryForm'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function WritePage() {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>새 일기 작성</CardTitle>
        </CardHeader>
        <CardContent>
          <WriteDiaryForm />
        </CardContent>
      </Card>
    </div>
  )
}
