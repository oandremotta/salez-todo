import { Injectable } from '@angular/core';
import { Observable, from, map, catchError } from 'rxjs';
import { Firestore, addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from '@angular/fire/firestore';
import { User } from './user.interface';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: Firestore) { }

  getUsers(nameFilter?: string): Observable<User[]> {
    const dataRef = collection(this.firestore, 'users');
    let userQuery;

    if (nameFilter) {
      // Adiciona um filtro se o nome estiver presente
      userQuery = query(dataRef, where('name', '==', nameFilter), orderBy('name'));
    } else {
      // Ordena todos os documentos pelo campo 'name'
      userQuery = query(dataRef, orderBy('name'));
    }

    return from(getDocs(userQuery)).pipe(
      map(querySnapshot =>
        querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data() as User
        }))
      ),
      catchError(error => {
        console.error("Error getting documents: ", error);
        throw error;
      })
    );
  }


  async addUser(user: User) {
    try {
      const userCollection = collection(this.firestore, 'users');
      await addDoc(userCollection, user);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  async updateUser(id: string, user: Partial<User>) {
    try {
      // Referência ao documento específico usando o ID
      const userDoc = doc(this.firestore, 'users', id);

      // Objeto para armazenar as atualizações
      const updateData: { [key: string]: any } = {};
      if (user.name !== undefined) {
        updateData['name'] = user.name;
      }
      if (user.role !== undefined) {
        updateData['role'] = user.role;
      }

      // Atualizar o documento no Firestore
      await updateDoc(userDoc, updateData);
      console.log("Document updated successfully");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  }

  async deleteUser(id: string) {
    try {
      // Referência ao documento específico usando o ID
      const userDoc = doc(this.firestore, 'users', id);

      // Deletar o documento no Firestore
      await deleteDoc(userDoc);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  }

}

