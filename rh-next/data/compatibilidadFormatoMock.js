export function createInstitutionRecord() {
  return {
    puestoContrato: '',
    codigoPresupuestal: '',
    unidadAdscripcion: '',
    fechaAlta: '',
    fechaTermino: '',
    tipoNombramiento: '',
    remuneracion: '',
    partidaClave: '',
    ubicacionHorario: '',
    tiempoTraslado: '',
  };
}

export function getInitialCompatibilityFormData() {
  return {
    meta: {
      title: 'Formato de Compatibilidad de Empleos',
      clave: 'TECNM_T19',
    },
    applicant: {
      rfc: 'RORV740111AX7',
      apellidoPaterno: '',
      apellidoMaterno: '',
      nombres: '',
      firma: '',
    },
    requestText:
      'Atentamente solicito se autorice la compatibilidad para desempeñar los siguientes puestos, cargos, comisiones o la prestación de servicios profesionales por honorarios, informando que el puesto que ocupo actualmente es:',
    institution1: {
      title: 'Institución 1 que certifica los datos del puesto actual',
      institutionName: 'Tecnológico Nacional de México',
      compensationLabel: 'Remuneración del puesto',
      records: [
        {
          puestoContrato: 'Profesor de Asignatura C (E.S.)',
          codigoPresupuestal: 'E3525',
          unidadAdscripcion: 'Instituto Tecnológico de Ensenada',
          fechaAlta: '2009-09-01',
          fechaTermino: '',
          tipoNombramiento: '(10) Definitivo',
          remuneracion: '$3,751.50',
          partidaClave: '11007 / 1403E352506.0135201',
          ubicacionHorario:
            'Blvd. Tecnológico #150, Ex Ejido Chapultepec, Ensenada, Baja California. Lunes de 07:00 a 09:00, 12:00 a 14:00 y de 18:00 a 20:00 hrs.',
          tiempoTraslado: 'Sin dato en el formato base',
        },
        {
          puestoContrato: 'Profesor de Asignatura C (E.S.)',
          codigoPresupuestal: 'E3525',
          unidadAdscripcion: 'Instituto Tecnológico de Ensenada',
          fechaAlta: '2021-01-01',
          fechaTermino: '2021-06-30',
          tipoNombramiento: '(20) Interino',
          remuneracion: '$2,501.00',
          partidaClave: '11301 / 1403E352504.0100149',
          ubicacionHorario:
            'Blvd. Tecnológico #150, Ex Ejido Chapultepec, Ensenada, Baja California. Lunes y martes de 10:00 a 12:00 hrs.',
          tiempoTraslado: 'Sin dato en el formato base',
        },
      ],
      footnote:
        'Los contratos de honorarios no sujetos al artículo 131 del RLFPRH únicamente deben indicar fechas de inicio y término, así como entregas parciales o totales aplicables.',
    },
    institution2: {
      title: 'Institución 2 que valida los datos del puesto o contrato a desempeñar',
      institutionName: 'CETMAR No. 11',
      compensationLabel: 'Remuneración actual y de honorarios',
      records: [
        {
          puestoContrato: '',
          codigoPresupuestal: '',
          unidadAdscripcion: '',
          fechaAlta: '',
          fechaTermino: '',
          tipoNombramiento: '',
          remuneracion: '',
          partidaClave: '',
          ubicacionHorario: '',
          tiempoTraslado: '',
        },
      ],
      footnote:
        'Los contratos de honorarios no sujetos al artículo 131 del RLFPRH únicamente deben indicar fechas de inicio y término, así como entregas parciales o totales aplicables.',
    },
    signatures: {
      place: 'Ensenada',
      date: '2021-06-16',
      blocks: [
        {
          role: 'Certificó',
          institution: 'Tecnológico Nacional de México',
          position: 'Director de Personal',
          name: 'Lic. Javier Muñoz Dueñas',
        },
        {
          role: 'Validó',
          institution: 'Tecnológico Nacional de México',
          position: 'Director de Personal',
          name: 'Lic. Javier Muñoz Dueñas',
        },
        {
          role: 'Autorizó',
          institution: 'Tecnológico Nacional de México',
          position: 'Director de Personal',
          name: 'Lic. Javier Muñoz Dueñas',
        },
      ],
      note:
        'En caso de que el dictamen corresponda a la DGDHO, este formato deberá acompañarse del oficio respectivo.',
    },
    approval: {
      status: 'autorizado',
      fechaInicio: '2021-01-01',
      fechaFin: '2021-06-30',
      observations:
        'La autorización se mantiene vigente mientras no cambien los supuestos que sirvieron de base para su otorgamiento.',
      note:
        'Este documento deberá contar con el sello de ambas instituciones.',
    },
    checklist: {
      date: '2021-06-16',
      analystName: 'Christian Guillermo Hernández Hernández',
      analystPosition: 'Jefe del Departamento de Recursos Humanos',
      analystSignature: '',
      directorName: 'Valentín Arquímedes Sánchez Beltrán',
      directorSignature: '',
      items: [
        {
          id: 'i-1',
          section: 'I. Se hace constar que',
          label:
            'Se cuenta con la descripción y perfil del puesto que el solicitante ocupa actualmente.',
          institution1: 'si',
          institution2: '',
        },
        {
          id: 'i-2',
          section: 'I. Se hace constar que',
          label:
            'Se cuenta con la descripción y perfil del puesto que se pretende ocupar.',
          institution1: 'si',
          institution2: 'si',
        },
        {
          id: 'ii-1',
          section: 'II. Las funciones a desarrollar en los puestos',
          label: 'a) ¿Son excluyentes entre sí?',
          institution1: 'no',
          institution2: 'no',
        },
        {
          id: 'ii-2',
          section: 'II. Las funciones a desarrollar en los puestos',
          label: 'b) ¿Implican o pudieran originar conflicto de intereses?',
          institution1: 'no',
          institution2: 'no',
        },
        {
          id: 'iii-1',
          section:
            'III. Existe la posibilidad de desempeñar los puestos adecuadamente en razón de',
          label: 'a) El horario y jornada de trabajo que a cada puesto corresponde.',
          institution1: 'si',
          institution2: 'si',
        },
        {
          id: 'iii-2',
          section:
            'III. Existe la posibilidad de desempeñar los puestos adecuadamente en razón de',
          label:
            'b) Las particularidades, características, exigencias y condiciones de los puestos de que se trate.',
          institution1: 'si',
          institution2: 'si',
        },
        {
          id: 'iii-3',
          section:
            'III. Existe la posibilidad de desempeñar los puestos adecuadamente en razón de',
          label:
            'c) La ubicación de los centros de trabajo y del domicilio del servidor público.',
          institution1: 'si',
          institution2: 'si',
        },
        {
          id: 'iii-4',
          section:
            'III. Existe la posibilidad de desempeñar los puestos adecuadamente en razón de',
          label:
            'd) ¿El servidor público manifestó expresamente no contar con licencia, con o sin goce de sueldo?',
          institution1: 'si',
          institution2: 'si',
        },
        {
          id: 'iii-5',
          section:
            'III. Existe la posibilidad de desempeñar los puestos adecuadamente en razón de',
          label: 'e) ¿Existe prohibición legal o contractual para emitir la compatibilidad?',
          institution1: 'no',
          institution2: 'no',
        },
        {
          id: 'iii-6',
          section:
            'III. Existe la posibilidad de desempeñar los puestos adecuadamente en razón de',
          label:
            'f) Las remuneraciones a percibir con la presente compatibilidad rebasan el límite establecido en el artículo 127 constitucional.',
          institution1: 'no',
          institution2: 'no',
        },
        {
          id: 'iii-7',
          section:
            'III. Existe la posibilidad de desempeñar los puestos adecuadamente en razón de',
          label: 'g) ¿Se trata de un trabajo técnico calificado o de alta especialización?',
          institution1: 'si',
          institution2: 'si',
        },
        {
          id: 'iii-8',
          section:
            'III. Existe la posibilidad de desempeñar los puestos adecuadamente en razón de',
          label:
            'h) Número de horas, actividades docentes, funciones, horarios asignados y lugares en que habrán de realizarse.',
          institution1: 'si',
          institution2: 'si',
        },
        {
          id: 'iv-1',
          section:
            'IV. Si al recibir las remuneraciones del puesto a desempeñar se rebasa el límite aplicable',
          label:
            '¿Se rebasa el límite previsto en el Manual de Percepciones de la Administración Pública Federal?',
          institution1: 'no',
          institution2: 'no',
        },
      ],
    },
  };
}