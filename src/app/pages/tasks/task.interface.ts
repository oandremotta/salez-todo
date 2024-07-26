import { Timestamp } from 'firebase/firestore';

export interface Task {
  id?: string;
  title?: string;
  description: string;
  status: 'pendente' | 'em andamento' | 'concluído';
  created_at: Timestamp;
  exp_date: Timestamp;
  userName?: string;
  user_id: string;
}
