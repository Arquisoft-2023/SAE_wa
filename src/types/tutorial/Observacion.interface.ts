export interface observacion{
    Id?: string;
    fecha: string;
    descripcion: string;
}

// export type observacion_sin_id = Omit<observacion, 'id_observacion'>;