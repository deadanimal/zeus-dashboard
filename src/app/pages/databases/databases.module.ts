import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ComponentsModule } from "../../components/components.module";

import { BsDropdownModule } from "ngx-bootstrap";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";

import { AccountDetailComponent } from './account/account-detail.component';
import { AccountNewComponent } from './account/account-new.component';
import { AccountComponent } from "./account/account.component";

import { GatewayDetailComponent } from './gateway/gateway-detail.component';
import { GatewayNewComponent } from "./gateway/gateway-new.component";
import { GatewayComponent } from "./gateway/gateway.component";

import { RouterModule } from "@angular/router";
import { DatabasesRoutes } from "./databases.routing";


let componentList = [
  AccountDetailComponent,
  AccountNewComponent,
  AccountComponent,

  GatewayDetailComponent,
  GatewayNewComponent,
  GatewayComponent,
]

@NgModule({
  declarations: componentList,
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    NgxDatatableModule,
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(DatabasesRoutes)
  ],
  exports: componentList
})
export class DatabasesModule {}
