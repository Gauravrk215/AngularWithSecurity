export interface WidgetModel {
  name: string;
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
}

export interface DashboardModel {
  id: number;
  username: string;
  dashboard: Array<DashboardContentModel>;
}

export const WidgetsMock: WidgetModel[] = [
  // {
  //     name: 'Text field',
  //     identifier: 'text_field'
  // },
  {
    name: 'Text area',
    identifier: 'text_area'
  },
  {
    name: 'Table field',
    identifier: 'table_field'
  },
  // {
  //   name: 'Background Color',
  //   identifier: 'background_color'
  // },
  // {
  //   name: 'Box field',
  //   identifier: 'box_field'
  // },
  {
    name: 'Image field',
    identifier: 'img_field'
  },
  {
    name: 'Line field',
    identifier: 'line_field'
  },
  {
    name: 'QR code',
    identifier: 'qr_code'
  }
]
