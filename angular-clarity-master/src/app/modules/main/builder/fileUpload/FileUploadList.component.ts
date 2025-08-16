// import { Component, Input, Output, EventEmitter } from '@angular/core';

// @Component({
//     selector: 'app-file-upload-list',
//     templateUrl: './file-upload-list.component.html',
// })
// export class FileUploadListComponent {
//     @Input() fileData: any[] = [];
//     @Input() type: 'image' | 'audio' | 'video' | 'document' = 'image';
//     @Output() fileChanged = new EventEmitter<{ event: any, index: number }>();
//     @Output() deleteRow = new EventEmitter<number>();
//     @Output() addRow = new EventEmitter<void>();

//     get acceptType() {
//         switch (this.type) {
//             case 'image': return 'image/*';
//             case 'audio': return 'audio/*';
//             case 'video': return 'video/*';
//             case 'document': return 'application/pdf,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel';
//             default: return '*/*';
//         }
//     }
// }
