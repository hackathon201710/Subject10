import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HistoryPage } from "../pages/historyPage/history";
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FormPage} from '../pages/formPage/formPage';
import {PictureService} from "../service/PictureService";
import {PictureCard} from "../components/picture.card.component";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PictureCard,
    HistoryPage,
    FormPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FormPage,
    HistoryPage,
    PictureCard
  ],
  providers: [
    PictureService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
