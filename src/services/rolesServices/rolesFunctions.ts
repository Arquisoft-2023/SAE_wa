export const rolesByLink = (arrayTypes, role) => {
  const rolesByAccess = {
    remision: {
      tipoRemision: ["bienestar", "docente"],
      solicitudRemision: ["bienestar", "docente"],
      primeraEscucha: ["bienestar"],
      remision: ["bienestar"]
    },
    tutorias: {
      gestionarTutor: ["bienestar"],
      verTutorias: ["bienestar"],
      gestionarTutorias: ["estudiante", "docente"]
    },
    observaciones: {
      observaciones: ["docente", "estudiante"]
    },
    gestionUsuario: {
      usuarios: ["bienestar"],
      roles: ["bienestar"],
      usuarioRoles: ["bienestar"]
    }
  };
  return arrayTypes.includes(role);
};
