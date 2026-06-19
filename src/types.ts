export interface Lesson {
  id: string;
  title: string;
  titleTa: string;
  duration: string;
  description: string;
  unlocked: boolean;
  videoUrl: string;
}

export interface Module {
  id: string;
  title: string;
  titleTa: string;
  lessons: Lesson[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
  commentTa: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

export interface CanvasElement {
  id: string;
  type: 'text' | 'image' | 'shape';
  content: string;
  color: string;
  fontSize: number;
  x: number;
  y: number;
  width: number;
  height: number;
}
