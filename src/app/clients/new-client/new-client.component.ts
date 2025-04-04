import { Component, Inject, OnDestroy } from '@angular/core';
import { SERVICES_TOKEN } from '../../services/service.token';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { ClientModelForm } from '../client.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { ClientFormComponent } from '../components/client-form/client-form.component';
import { IClientService } from '../../services/api-client/clients/iclients.service';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-client',
  imports: [ClientFormComponent, CommonModule],
  templateUrl: './new-client.component.html',
  styleUrl: './new-client.component.css',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.CLIENT, useClass: ClientsService },
    { provide: SERVICES_TOKEN.HTTP.SNACKBAR, useClass: SnackbarManagerService }

  ]
})
export class NewClientComponent implements OnDestroy {

  private httpSubscription?: Subscription


  constructor(
    @Inject(SERVICES_TOKEN.HTTP.CLIENT) private readonly httpService: IClientService,
    @Inject(SERVICES_TOKEN.HTTP.SNACKBAR) private readonly snackBarManager: ISnackbarManagerService,
    private readonly router: Router,
  ) { }

  ngOnDestroy(): void {
    if (this.httpSubscription) {
      this.httpSubscription.unsubscribe()
    }
  }

  onSubmitClient(value: ClientModelForm) {
    const { id, ...request } = value
    console.log(id)
    console.log(request)

    this.httpSubscription = this.httpService.save(request).subscribe(_ => {
      this.snackBarManager.show('Usuário cadastrado com sucesso')
      this.router.navigate(['clients/list'])
    })
  }


}
