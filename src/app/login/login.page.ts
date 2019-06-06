import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public user: any = {
    name: "",
    email: "",
    password: ""
  };

  constructor(
    private navCtrl: NavController, 
    private alertCtrl: AlertController,
    private httpClient: HttpClient
    ) {}

  // navToExplore(){
  //   this.navCtrl.navigateForward('tabs');
  // }
  
  ngOnInit() {
  }

  submit() {
    console.log("Submitting to the server.");
    console.log(this.user);
    this.httpClient
      .post("http://localhost:3000/api/users", this.user)
      .subscribe(
        (response: any) => {
          console.log(response);
          //pass by id / query param and then can get
          this.navCtrl.navigateForward('page1', {queryParams: {
            userId: response.id
          }}); 
        },
        (err) => {
          if(err.error.message.indexOf("Duplicate entry") != -1) {
            this.presentAlert();
          }
          //could also do
          // alert(err.error.message);
        }
      );
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      subHeader: 'User already exists with this email.',
      message: 'Please try again.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
