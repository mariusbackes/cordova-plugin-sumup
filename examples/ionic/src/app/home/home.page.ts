import { Component } from '@angular/core';
import { SumUp } from '@ionic-native/sum-up/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html'
})
export class HomePage {
  public sumupResult: any = {};

  // Access Token
  // How to create, can you read in README.md
  private accessToken = 'YOUR_ACCESS_TOKEN';

  constructor(private sumUp: SumUp) {}

  private async login(): Promise<void> {
    try {
      this.sumupResult = await this.sumUp.login(this.accessToken);
    } catch (e) {
      this.sumupResult = e;
    }
  }

  private async auth(): Promise<void> {
    try {
      this.sumupResult = await this.sumUp.auth(this.accessToken);
    } catch (e) {
      this.sumupResult = e;
    }
  }

  private async prepare(): Promise<void> {
    try {
      this.sumupResult = await this.sumUp.prepare();
    } catch (e) {
      this.sumupResult = e;
    }
  }

  private async settings(): Promise<void> {
    try {
      this.sumupResult = await this.sumUp.getSettings();
    } catch (e) {
      this.sumupResult = e;
    }
  }

  private async isLoggedIn(): Promise<void> {
    try {
      this.sumupResult = await this.sumUp.isLoggedIn();
    } catch (e) {
      this.sumupResult = e;
    }
  }

  private async pay(): Promise<void> {
    try {
      this.sumupResult = await this.sumUp.pay(10.01, 'Title', 'EUR');
    } catch (e) {
      this.sumupResult = e;
    }
  }

  private async logout(): Promise<void> {
    try {
      this.sumupResult = await this.sumUp.logout();
    } catch (e) {
      this.sumupResult = e;
    }
  }

}
