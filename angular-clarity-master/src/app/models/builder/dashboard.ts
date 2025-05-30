export interface WidgetModel {
  name: string;
  identifier: string;
}
export interface SubmenuItem {
  name: string;
  identifier: string;
}

export interface WidgetModel1 {
  name: string;
  submenu?: SubmenuItem[];
  showSubmenu?: boolean; // Optional property to control submenu visibility
  identifier: string;
}

export interface DashboardContentModel {
  cols: number;
  rows: number;
  y: number;
  x: number;
  chartid: number;
  component?: any;
  name: string;
  type?:string;
}

export interface DashboardModel {
  id: number;
  username: string;
  dashboard: Array<DashboardContentModel>;
}


export interface DashboardContentModel2 {
  cols: number;
  rows: number;
  y: number;
  x: number;
  chartid: number;
  charttitle?: string;
  component?: any;
  name: string;
  type?: string;
  values?:Array<value>;
  imgoption?:Array<value>;
  keyValue?:string;
  fieldtext?:any;
  dropdown_type?:string;
  imageURL?:string;
}

export interface DashboardModel2 {
  id: number;
  username: string;
  dashboard: Array<DashboardContentModel2>;
}

export class value{
  label?:any="";
  value?:any="";
}
export class value1{
  label1?:any="";
  value1?:any="";
}


export const WidgetsMock: WidgetModel[] = [
  {
      name: 'Radar Chart',
      identifier: 'radar_chart'
  },
  {
      name: 'Doughnut Chart',
      identifier: 'doughnut_chart'
  },
  {
      name: 'Line Chart',
      identifier: 'line_chart'
  },
  {
  name: 'Bar Chart',
  identifier: 'bar_chart'
  },
  {
  name: 'Pie Chart',
  identifier: 'pie_chart'
  },
  {
  name: 'Polar Area Chart',
  identifier: 'polar_area_chart'
  },
  {
  name: 'Bubble Chart',
  identifier: 'bubble_chart'
  },
  {
  name: 'Scatter Chart',
  identifier: 'scatter_chart'
  },
  {
  name: 'Dynamic Chart',
  identifier: 'dynamic_chart'
  },
  {
  name: 'Financial Chart',
  identifier: 'financial_chart'
  },
  {
  name: 'To Do',
  identifier: 'to_do_chart'
  }
]
