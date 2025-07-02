
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfile, UserProfileService } from '../../../../services/admin/user-profile.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertService } from '../../../../services/alert.service';
import { ToastrService } from 'ngx-toastr';
import { Dimensions, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
//import { ImageCroppedEvent } from '../image-cropper/interfaces/image-cropped-event.interface';
//import { ImageCropperComponent } from '../image-cropper/component/image-cropper/image-cropper.component';
@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.scss']
})
export class ProfileSettingComponent implements OnInit {
  updated = false;
  userProfile: UserProfile;
  roles = ['user', 'admin', 'mis report', 'bi report'];
  transform: ImageTransform = {};
  model=false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userProfileService: UserProfileService,
    private http: HttpClient,
    private alertService: AlertService,
    private _sanitizer: DomSanitizer,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {

    this.getUserProfile();
    this.getProfilePic();
  }
  getUserProfile() {
    this.userProfileService.getUserProfile().subscribe(res => {
      console.log(res);
      this.userProfile = res;
    })
  }

  update() {
    this.userProfileService.updateUserProfile(this.userProfile).subscribe(
      (resp) => {
        console.log(resp);
        //this.router.navigate(["../../all"], { relativeTo: this.route });
      },
      (error) => {
        console.log(error);
      }
    );
    //this.picUpload();
  }

  public profilePic: File = null;
  onSelectFile(event) {
    let flag = 0;
    const mimeType = event.target.files[0].type;
    if(mimeType.match(/image\/*/) === null ){
      this.message = 'Only Image Type Is Supported';
      flag = flag + 1;
      return;
    }
    const size = event.target.files[0].size;
    if(size > 5000000) {
      flag = flag + 1;
      this.message = 'Plese Select image file under 2 MB';
      return;
    }
    console.log('flag value = ', flag);
    if(flag === 0) {
      this.profilePic = <File> event.target.files[0];
      console.log(this.profilePic);
      const reader = new FileReader();
      this.image = this.profilePic;
      reader.readAsDataURL(this.profilePic);
      reader.onload = (_event) => {
      this.image = reader.result;
      }
      this.picUpload();
    }

  }

  message: string;
  picUpload() {
    this.userProfileService.uploadUserProfilePic(this.profilePic).subscribe(res => {
      console.log(res);
      if(res.type === HttpEventType.UploadProgress){
        console.log('Upload Progress : ', + Math.round(res.loaded / res.total * 100) + '%');
      } else if(res.type === HttpEventType.Response) {
        if (res.status === 200) {
          this.alertService.success('Image uploaded successfully');
          //this.message = 'Image uploaded successfully';
        } else {
          this.message = 'Image not uploaded';
        }
      }
    }, err => {console.log(err);
    });
  }
  image: any;
  getProfilePic() {
    this.userProfileService.getProfilePic().subscribe(res => {
      console.log(res);
      this.image = this._sanitizer.bypassSecurityTrustResourceUrl(res.image);
    }, err => {console.log(err);}
    );
  }

  /*picUpload() {
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.profilePic, this.profilePic.name);
    this.http.post('http://localhost:9119/api/upload', uploadImageData, { observe: 'response' })
      .subscribe((res) => {
        console.log(res);
        if (res.status === 200) {
          this.message = 'Image uploaded successfully';
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
      );
  }*/


  onSubmit() {
    this.updated = true;
    this.update();
  }
  imageChangedEvent: any = '';
    croppedImage: any = '';
    canvasRotation = 0;
    rotation = 0;
    scale = 1;
    showCropper = false;
    containWithinAspectRatio = false;
    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }
    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
        this.profilePic=this.croppedImage;

    }
     imageLoaded() {
      this.showCropper = true;
      console.log('Image loaded');
     }

    cropperReady(sourceImageDimensions: Dimensions) {
      console.log('Cropper ready', sourceImageDimensions);
  }
    loadImageFailed() {
        // show message
    }
    rotateLeft() {
      this.canvasRotation--;
      this.flipAfterRotate();
  }

  rotateRight() {
      this.canvasRotation++;
      this.flipAfterRotate();
  }

  private flipAfterRotate() {
      const flippedH = this.transform.flipH;
      const flippedV = this.transform.flipV;
      this.transform = {
          ...this.transform,
          flipH: flippedV,
          flipV: flippedH
      };
  }


  flipHorizontal() {
      this.transform = {
          ...this.transform,
          flipH: !this.transform.flipH
      };
  }

  flipVertical() {
      this.transform = {
          ...this.transform,
          flipV: !this.transform.flipV
      };
  }
  zoomOut() {
    this.scale -= .1;
    this.transform = {
        ...this.transform,
        scale: this.scale
    };
}

zoomIn() {
    this.scale += .1;
    this.transform = {
        ...this.transform,
        scale: this.scale
    };
}

toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
}

updateRotation() {
    this.transform = {
        ...this.transform,
        rotate: this.rotation
    };
}
openmodal(){
  this.model=true;
}
}
