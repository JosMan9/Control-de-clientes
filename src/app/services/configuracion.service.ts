import { Injectable } from "@angular/core";
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/compat/firestore';
import { Configuracion } from '../model/configuracion.model';
import { config, Observable } from 'rxjs';

@Injectable()
export class ConfiguracionService {
    configuracionDoc: AngularFirestoreDocument<Configuracion>;
    configuracion: Observable<Configuracion>;

    id = '1';

    constructor(private db: AngularFirestore) {}

    getConfiguracion(): Observable<Configuracion> {
      this.configuracionDoc = this.db.doc<Configuracion>(`configuracion/${this.id}`);
      this.configuracion = this.configuracionDoc.valueChanges();
      return this.configuracion;
    }

    modificarConfiguracion(configuracion: Configuracion) {
      this.configuracionDoc = this.db.doc<Configuracion>(`configuracion/${this.id}`);
      this.configuracionDoc.update(configuracion);
    }

}
