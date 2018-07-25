import { FormGroup } from "@angular/forms";
import { BsModalRef } from "ngx-bootstrap";

export interface IChangePasswordComponent {
  modalRef:BsModalRef;
  form: FormGroup;

  onSubmit();
}

export interface IChangePassword {
  old_pass: string;
  new_pass: string;
}