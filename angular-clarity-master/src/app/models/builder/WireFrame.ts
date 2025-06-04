export interface WireFrame {
  header: Header;
  line: Line;
}
export interface Header {
section: Section[];
}
export interface Line {
section: Section[];
}
export interface Section {
id: number;
fieldName: string;
mapping: string;
dataType: string;
type_field: string;
section_num: number;
fields: Field[];
}

export interface Field {
id: number;
fieldName: string;
mapping: string;
dataType: string;
type_field: string;
section_num: number;
seq: number;
}
