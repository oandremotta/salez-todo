import { Injectable } from '@angular/core';
import { Observable, from, map, catchError, switchMap, of, forkJoin, combineLatest } from 'rxjs';
import { Firestore, Timestamp, addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, updateDoc, where } from '@angular/fire/firestore';
import { User } from '../users/user.interface';
import { Task } from './task.interface';
import { UserService } from '../users/user.service';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private firestore: Firestore, private userService: UserService) { }

  getTasks(titleFilter?: string, userNameFilter?: string): Observable<any[]> {
    const tasksCollection = collection(this.firestore, 'tasks');
    let taskQuery = query(tasksCollection, orderBy('title'));

    return from(getDocs(taskQuery)).pipe(
      switchMap(querySnapshot => {
        const tasksWithUsers$ = querySnapshot.docs.map(doc => {
          const data = doc.data() as Task;
          const userId = data?.user_id;
          const taskWithDates = {
            ...data,
            exp_date: this.convertTimestamp(data.exp_date),
            created_at: this.convertTimestamp(data.created_at)
          };

          if (userId) {
            return this.userService.getUserById(userId).pipe(
              map(user => ({
                id: doc.id,
                ...taskWithDates,
                userName: user ? user.name : 'Unknown'
              }))
            );
          }
          return of({
            id: doc.id,
            ...taskWithDates,
            userName: 'Unknown'
          });
        });

        return combineLatest(tasksWithUsers$).pipe(
          map(tasks => tasks.filter(task =>
            (!titleFilter || task.title?.includes(titleFilter)) &&
            (!userNameFilter || task.userName.includes(userNameFilter))
          ))
        );
      }),
      catchError(error => {
        console.error("Error getting tasks: ", error);
        throw error;
      })
    );
  }

  async addTask(tas: Task) {
    try {
      const userCollection = collection(this.firestore, 'tasks');
      await addDoc(userCollection, tas);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  async updateTask(id: string, task: Task) {
    try {
      const taskDoc = doc(this.firestore, 'tasks', id);

      const updatedTask = {
        ...task,
      };

      await updateDoc(taskDoc, updatedTask);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  }

  protected convertTimestamp(timestamp: Timestamp): Date {
    if (timestamp instanceof Timestamp) {
      return new Date(timestamp.seconds * 1000);
    }
    return timestamp;
  }

}
