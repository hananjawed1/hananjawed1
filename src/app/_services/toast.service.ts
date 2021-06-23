import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
 
  show(message: string, title: string) { 
    $('.toast-body').text(message);
    //$('.toast-header strong').text(title);
    $('.toast').toast('show');
  }

  success(message: string, title: string){
    $('.toast-body').text(message);
    // $('.toast-header strong').text(title);
    $('.toast').toast('show');
    $('.toast').addClass('success');
  }

  error(message: string, title: string){
    $('.toast-body').text(message);
    // $('.toast-header strong').text(title);
    $('.toast').toast('show');
    $('.toast').addClass('danger');
  } 

  warning(message: string, title: string){
    $('.toast-body').text(message);
    // $('.toast-header strong').text(title);
    $('.toast').toast('show');
    $('.toast').addClass('warning');
  }
}
