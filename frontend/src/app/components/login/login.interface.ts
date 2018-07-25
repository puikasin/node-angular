import { FormGroup } from "@angular/forms";

export interface ILoginComponent {
  Url: any;
  returnURl:string;
  form: FormGroup;
  onSubmit(): void;
}

export interface ILogin{
  email:string;
  password:string;
  remember:boolean;
}