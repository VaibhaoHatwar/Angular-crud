import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'email', 'city', 'action'];

  dataSource: any;
  constructor(private userService: UserService,  private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userService.listUsers().subscribe(data => {
      this.dataSource = data;
    });
  }

  onDelete(id: any){
    return this.userService.deleteUser(id).subscribe(data => {
      this._snackBar.open("User deleted successfully");
      this.ngOnInit();

    }, err => {
      this._snackBar.open("Unable to delete user");
      this.ngOnInit();

    })
  }

}
