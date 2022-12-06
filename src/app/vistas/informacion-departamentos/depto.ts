export interface Deptos {
    [x: string]: any;
    idDepartamento: number;
    nomDepartamento: string;
    descripcionDepartamento: string;
    longitudDepartamento:number;
    latitudDepartamento:number;
  }
  
  export interface Munis {
    [x: string]: any;
    idDepartamento: number;    
    idMunicipio: number;
    nomMunicipio: string;
  }

  export interface Universidad {
    [x: string]: any;
    idDepartamento: number;    
    idUniverdidad: number;
    nomUniversidad: string;
  }
  export interface Empresa {
    [x: string]: any;
    idDepartamento: number;    
    idAnio: number;
    nomDepartamento: string;
    porcMicro : number;
    porcPequeno : number;
    porcMediano : number;
    porcGrande : number;
  }

  export interface Estimacion {
    [x: string]: any;
    idDepartamento: number;        
    nomDepartamento: string;
    idGenero: number;
    nomGenero:string;
    idAnio: number;
    cantidad : string;    
  }

  export interface Indicadores {
    [x: string]: any;
    idDepartamento: number;        
    nomDepartamento: string;
    idIndicador: number;
    nomIndicador:string;
    anio: number;
    valor : string;    
    nomTipoFormato : string;  
    nomCorto : string;  
  }
  export interface PoblacionAnio {
    [x: string]: any;
    idDepartamento: number;        
    nomDepartamento: string;
    idGenero: number;
    nomGenero:string;
    idAnio: number;
    cantidad : string;        
  }

  export interface DeptoIntecap {
    [x: string]: any;
    idDepartamento: number;        
    Anio: number;
    hombres: string;    
    mujeres:string;    
    PorcHombres : string;        
    PorcMujeres : string;        
  }
  
  
  
