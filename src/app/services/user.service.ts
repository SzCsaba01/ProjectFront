import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChangePasswordDto } from '../models/User/ChangePasswordDto';
import { SendForgotPasswordEmailDto } from '../models/User/SendForgotPasswordEmailDto';
import { UserRegisterDto } from '../models/User/UserRegisterDto';
import { GetUserDto } from '../models/User/GetUserDto';
import { EditUserDto } from '../models/User/EditUserDto';
import { UserSearchDto } from '../models/User/UserSearchDto';
import { GetSearchedUserDto } from '../models/User/GetSearchedUserDto';
import { UserPaginationDto } from '../models/User/UserPaginationDto';
import { GetFriendListDto } from '../models/User/GetFriendListDto';
import { DeleteFriendDto } from '../models/User/DeleteFriendDto';


const options = {
  responseType: 'text' as 'json',
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _url = 'User'

  constructor(private http: HttpClient) { }
  
  public register(userRegister: UserRegisterDto){
    return this.http.post(`${environment.apiUrl}/${this._url}/Registration`, userRegister);
  }

  public sendForgotPasswordEmail(sendForgotPasswordEmailDto: SendForgotPasswordEmailDto){
    return this.http.post(`${environment.apiUrl}/${this._url}/ForgotPassword`, sendForgotPasswordEmailDto);
  }

  public changePassword(changePasswordDto: ChangePasswordDto){
    return this.http.post(`${environment.apiUrl}/${this._url}/ChangePassword`, changePasswordDto);
  }

  public getUserIdByResetToken(token: string): Observable<Guid>{
    return this.http.get<Guid>(`${environment.apiUrl}/${this._url}/GetUserIdByResetPasswordToken?token=${token}`);
  }

  public confirmRegistration(resetPasswordToken: string): Observable<string> {
    return this.http.post<string>(`${environment.apiUrl}/${this._url}/ConfirmRegistration?resetPasswordToken=${resetPasswordToken}`, resetPasswordToken);
  }

  public getUserProfilePictureUrl(id: Guid) : Observable<string>{
    return this.http.get<string>(`${environment.apiUrl}/${this._url}/GetProfilePictureUrl?Id=${id}`, options);
  }

  public getUserProfileDetailsById(id: Guid) : Observable<GetUserDto>{
    return this.http.get<GetUserDto>(`${environment.apiUrl}/${this._url}/GetUserById?id=${id}`);
  }

  public changeUserProfilePicture(changeUserProfilePicture: FormData){
    return this.http.put(`${environment.apiUrl}/${this._url}/ChangeProfilePicture`, changeUserProfilePicture);
  }

  public editUserDetails(editUserDto: EditUserDto){
    return this.http.put(`${environment.apiUrl}/${this._url}/EditUser`, editUserDto);
  }

  public getSearchedUsersByUsername(userSearchDto: UserSearchDto): Observable<UserPaginationDto>{
    return this.http.post<UserPaginationDto>(`${environment.apiUrl}/${this._url}/GetSearchedUsersByUserName`, userSearchDto);
  }

  public getFriendList(id: Guid): Observable<GetFriendListDto>{
    return this.http.get<GetFriendListDto>(`${environment.apiUrl}/${this._url}/GetFriendList?Id=${id}`);
  }

  public deleteFriend(deleteFriendDto: DeleteFriendDto){
    return this.http.post(`${environment.apiUrl}/${this._url}/DeleteFriend`, deleteFriendDto);
  }

  public getUsersPaginated(page: number):Observable<UserPaginationDto>{
    return this.http.get<UserPaginationDto>(`${environment.apiUrl}/${this._url}/GetUsersPaginated?page=${page}`);
  }
  public getSearchedUsersByUserName(userSearch: UserSearchDto): Observable<UserPaginationDto>{
    return this.http.post<UserPaginationDto>(`${environment.apiUrl}/${this._url}/GetAllSearchedUsersByUsername`, userSearch);
  }

  public getSearchedUsersByEmail(userSearch: UserSearchDto): Observable<UserPaginationDto>{
    return this.http.post<UserPaginationDto>(`${environment.apiUrl}/${this._url}/GetAllSearchedUsersByEmail`, userSearch);
  }

  public deleteUser(username: string){
    return this.http.delete(`${environment.apiUrl}/${this._url}/DeleteUser?username=${username}`);
  }

  public generateXMLForUser(username: string){
    return this.http.post(`${environment.apiUrl}/${this._url}/GenerateXMLFileForUser?username=${username}`, null);
  }
}
