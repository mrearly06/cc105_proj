import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { Storage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { getDownloadURL, ref, uploadString } from '@angular/fire/storage';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userEmail: string = '';
  selectedImage: any;
  private storage: Storage = inject(Storage);

  constructor(private authService: AuthService, storage: Storage) {   
    this.storage = storage; 
  }

  ngOnInit(): void {
    this.userEmail = this.authService.getCurrentUserEmail();
    this.selectedImage = localStorage.getItem('profilePic'); // Retrieve the image URL from the local storage
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      }
  
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  submitImage() {
    if (this.selectedImage) {
      const filePath = `/images/${new Date().getTime()}_image`; // Generate a unique file path
      const storageRef = ref(this.storage, filePath);
      const task = uploadString(storageRef, this.selectedImage, 'data_url');
  
      // Handle the promise returned by uploadString
      task.then((uploadResult) => {
        // Get the download URL after the upload completes
        getDownloadURL(storageRef).then(downloadURL => {
          console.log('Image URL:', downloadURL);
          localStorage.setItem('profilePic', downloadURL); // Store the image URL in the local storage
        });
      }).catch((error) => {
        console.error('Upload failed:', error);
      });
    } else {
      console.log('No image selected');
    }
  }
}