import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from "@angular/forms";
import {DataService} from '../data.service'
@Component({
  selector: 'app-tutor',
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.css']
})
export class TutorComponent implements OnInit {
  sessions : any = [
  
  ]
  tutors : any = [
  ]
  closeModal: string = '';
  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private dataService: DataService) {}
  triggerModal(content: any) {
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
  checkoutForm = this.formBuilder.group({
    name: '',
    tutorsName: '',
    date: '',
    start_date: '',
    end_date: '',
    duration: '',

  });
  changeTutor(e:any) {
    this.tutorsName!.setValue(e.target.value, {
      onlySelf: true
    })

  }


  // Getter method to access formcontrols
  get tutorsName() {
    return this.checkoutForm.get('tutorsName');
  }

  onSubmit(): void {
    // Process checkout data here
    this.sessions.push({
      "name" :  this.checkoutForm.value.name,
      "start" :  this.checkoutForm.value.start_date,
      "end" :  this.checkoutForm.value.end_date,
      "duration":  this.checkoutForm.value.duration

    })
    const date =  this.checkoutForm.value.date
    const session={
      "name" :  this.checkoutForm.value.name,
      "startTime" :  date + ' ' + this.checkoutForm.value.start_date,
      "endTime" :   date + ' ' + this.checkoutForm.value.end_date,  
      "tutor_id" : this.tutorsName?.value
      }
    this.dataService.addSession(session).subscribe((data:any)=>{
    })
  this.checkoutForm.reset();

  }
  ngOnInit(): void {
    this.dataService.getTutors().subscribe((data:any)=>{
        this.tutors = data
    })

    this.dataService.getSessions().subscribe((data:any)=>{
      this.sessions = data
  })
  }

}
