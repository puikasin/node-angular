import { FormGroup } from "@angular/forms";
import { TemplateRef } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap";


export interface IProfileComponent {
  positionItem: any[];
  form: FormGroup;
  modalRef: BsModalRef;
  onSubmit(): void;
  onConvertImage(inputFile: HTMLInputElement): void;
  openModal(template: TemplateRef<any>);
 
}
export interface IProfile {
  fullname: string;
  position: string;
  image: string;
}