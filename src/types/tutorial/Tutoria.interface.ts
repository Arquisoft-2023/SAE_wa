export enum tipo_estado{
    solicitada = "Solicitada",
    rechazada = "Rechazada",
    programada = "Programada",
    no_realizada = "No Realizada",
    realizada = "Realizada"
}

export enum tipo_lugar{
    virtual = "Virtual",
    presencial = "Presencial"
}

export interface tutoria{
    Id?: string;
    fecha: string;
    lugar: tipo_lugar;
    estado: tipo_estado;
    objetivo?: string;
    acuerdo?: string;
    observacionesTutor?: string;
    observacionesEstudiante?: string;
}

// export type tutoria_sin_id = Omit<tutoria, '_id'>;
// export type tutoria_reporte = Omit<tutoria, '_id' | 'observaciones_estudiante' | 'observaciones_tutor'>;