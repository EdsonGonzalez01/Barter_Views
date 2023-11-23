import { Component, OnInit } from '@angular/core';
import { io, Socket} from 'socket.io-client'; 

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{

  socket : Socket

  constructor(){
    this.socket = io(environment.apiUrl)
  }

  ngOnInit(): void {
      
  }

}
