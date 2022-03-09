import {environment} from '../../environments/environment';

export class AppConstants {
  public static PAYA_REDIRECT = 'https://partners.paya.com/login/';
  public static PAYA_QBO_BOARD = `${environment.payaQboUrl}/board/`;
  public static PAYA_QBO_AUTH = `${environment.payaQboUrl}/user/`;
  public static PAYA_QBO_CONNECT = `${environment.payaQboUrl}/connectToQuickbooks/`;
}
