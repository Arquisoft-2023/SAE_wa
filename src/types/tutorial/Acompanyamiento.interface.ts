import { observacion } from "./Observacion.interface";
import { tutoria } from "./Tutoria.interface";

export enum rol {
  Docente = "docente",
  Estudiante = "estudiante",
  Bienestar = "bienestar"
}

export enum tipo_Tutor {
  Actual = "Actual",
  Antiguo = "Antiguo"
}

export interface acompanyamiento {
  Id?: string;
  usuarioUnEstudiante: string;
  usuarioUnTutor: string;
  esTutor?: tipo_Tutor;
  listaTutoria?: tutoria[];
  listaObservacion?: observacion[];
}

// export type acompanyamiento_sin_id = Omit<acompanyamiento, '_id_acompanyamiento'>;
// export type acompanyamiento_tutoria = Omit<acompanyamiento, 'lista_observacion'>;
// export type acompanyamiento_tutoria_sin_id = Omit<acompanyamiento, 'lista_observacion' | '_id_acompanyamiento'>;
// export type acompanyamiento_observacion = Omit<acompanyamiento, 'lista_tutoria' | '_id_acompanyamiento'>;
