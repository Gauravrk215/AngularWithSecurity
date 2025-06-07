export class RuleCopy {
  public from_tech_stack: string;
public from_object_type: string;
public from_sub_object_type: string;
public to_tech_stack: string;
public to_object_type: string;
public to_sub_object_type: string;

}

export interface Rule {
  tech_stack: string;
  object_type: string;
  sub_object_type: string;
  version: string;
  replacement_string: string;
  keyword: string;
  priority: number;
  service: string;
}
