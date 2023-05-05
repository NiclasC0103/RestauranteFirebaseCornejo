import { Firestore,setDoc,doc,collection, WithFieldValue, DocumentData, query,
getDocs,collectionData,deleteDoc} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BdService {


  constructor(private firestore:Firestore) { }

  createId(enlace:string){
    const ref = doc(collection(this.firestore, enlace));
    return ref.id;
  }

  async add<T extends WithFieldValue<DocumentData>>(data:T,enlace:string,id:string){
    const ref = doc(this.firestore,enlace,id);
    return await setDoc(ref, data);
  }

  get<T>(enlace:string):Observable<T[]>{
    const ref = collection(this.firestore,enlace);
    return collectionData(ref,{idField:'id'}) as Observable<T[]>;
  }

  delete<T>(enlace:string,id:string){
    const ruta:string = `${enlace}/${id}`
    const ref = doc(this.firestore,ruta);
    return deleteDoc(ref);
  }

  async getChanges(enlace:string,converter:any){
    const q = query(collection(this.firestore, enlace));
    const querySnapshot = await getDocs(q);
    return querySnapshot;
  }
  edit(){

  }
}
