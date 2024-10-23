export async function analyzeEmotion(content: string): Promise<string> {
  try {
    console.log('Sending content for analysis:', content);
    const response = await fetch('/api/analyze-emotion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error('Failed to analyze emotion');
    }

    const data = await response.json();
    console.log('Received data:', data);
    return data.emotion;
  } catch (error) {
    console.error('Error analyzing emotion:', error);
    return 'neutral';
  }
}
