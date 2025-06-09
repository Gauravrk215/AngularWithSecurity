import {book} from '../../models/fnd/book';

export class university  {
  public id: number;
  public name: string;
  public email: string;
  public subject: string;
  public phone: number;
  public books: book[];

}
