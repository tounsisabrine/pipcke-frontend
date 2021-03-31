import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from "@angular/forms";
import {DataService} from '../data.service'




@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
tutors : any = [
]
sessions : any = [

]



  ngOnInit(): void {
    this.dataService.getTutors().subscribe((data:any)=>{
      this.tutors = data
  })

  }
  closeModal: string = '';

  isSubmitted = false;

  constructor(private modalService: NgbModal, public fb: FormBuilder, private dataService: DataService) {}
  
  changeSession(e:any) {
    this.sessionName!.setValue(e.target.value, {
      onlySelf: true
    })
  }


  /*########### Form ###########*/
  registrationForm = this.fb.group({
    sessionName: ['', [Validators.required]],
    client: ['', [Validators.required]]
  })

  // Getter method to access formcontrols
  get sessionName() {
    return this.registrationForm.get('sessionName');
  }

  get client()  {
    return this.registrationForm.get('client');
  }
  /*########### Template Driven Form ###########*/
  onSubmit() {
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      return false;
    } else {
      this.dataService.bookSession(this.registrationForm.value.sessionName,this.registrationForm.value.client).subscribe((data)=>{
      })

      alert(JSON.stringify(this.registrationForm.value))
    }
      return true;
  }
    
  triggerModal(content: any,id:string) {
    this.dataService.getTutSessions(id).subscribe((data:any)=>{
        this.sessions = data
    })
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
