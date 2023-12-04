import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  memberName = "Lan";
  editMode = false;
  editIndex: number | null = null;
  posts: Post[] = [];
 
  @Output() isLogout = new EventEmitter<void>()

  constructor(private postService: PostService, private router: Router,public authServise:AuthService) {
  }

  
  @Input() index: number = 0;
  @Input() post?: Post;
  comments: string[] = [];

  ngOnInit(): void {
    console.log(this.post);
    this.comments = this.postService.getComments(this.index);
  }
  delete() {
    this.postService.deleteButton(this.index);
  }
  onEdit() {
    this.router.navigate(['/post-edit', this.index])
  }
  onLike() {
    this.postService.likePost(this.index)
  }
  onAddComment(comment: string) {
    this.postService.addComment(this.index, comment);
    this.comments = this.postService.getComments(this.index); // Refresh the comments
  }
  onUpdateComment(updatedComment: string, index: number) {
    this.postService.updateComment(this.index, index, updatedComment);
    this.comments = this.postService.getComments(this.index); // Refresh the comments
    this.editMode = false;
    this.editIndex = null;
  }
  onCancelUpdate() {
    // Exit the edit mode
    this.editMode = false;
    this.editIndex = null;
  }
  onDeleteComment(commentIndex: number) {
    this.postService.deleteComment(this.index, commentIndex);
    this.comments = this.postService.getComments(this.index); // Refresh the comments
  }
  onEditComment(index: number) {
    this.editMode = true;
    this.editIndex = index;
  }
}