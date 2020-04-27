import { Routes } from "@angular/router";

import { AccountDetailComponent } from './account/account-detail.component';
import { AccountNewComponent } from './account/account-new.component';
import { AccountComponent } from "./account/account.component";

import { BotDetailComponent } from "./bot/bot-detail.component";
import { BotNewComponent } from "./bot/bot-new.component";
import { BotComponent } from "./bot/bot.component";

import { GatewayDetailComponent } from './gateway/gateway-detail.component';
import { GatewayNewComponent } from "./gateway/gateway-new.component";
import { GatewayComponent } from "./gateway/gateway.component";

import { SensorDetailComponent } from "./sensor/sensor-detail.component";
import { SensorNewComponent } from "./sensor/sensor-new.component";
import { SensorComponent } from "./sensor/sensor.component";

export const DatabasesRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "account",
        children: [
          {
            path: '',
            component: AccountComponent,
          },
          {
            path: 'new',
            component: AccountNewComponent,
          },
          {
            path: ':id',
            component: AccountDetailComponent,
          },                    
        ]
      },      
      {
        path: "bot",
        children: [
          {
            path: '',
            component: BotComponent,
          },
          {
            path: 'new',
            component: BotNewComponent,
          },
          {
            path: ':id',
            component: BotDetailComponent,
          },                    
        ]
      },
      {
        path: "gateway",
        children: [
          {
            path: '',
            component: GatewayComponent,
          },
          {
            path: 'new',
            component: GatewayNewComponent,
          },
          {
            path: ':id',
            component: GatewayDetailComponent,
          },                    
        ]
      },      
      {
        path: "sensor",
        children: [
          {
            path: '',
            component: SensorComponent,
          },
          {
            path: 'new',
            component: SensorNewComponent,
          },
          {
            path: ':id',
            component: SensorDetailComponent,
          },                    
        ]
      }      
    ]
  },
];
