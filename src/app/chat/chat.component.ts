import { Component, OnInit } from '@angular/core';
import { io, Socket} from 'socket.io-client'; 

import { environment } from 'src/environments/environment';

interface Message{
  message: string;
  username: string;
  owned?: boolean;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{
  
  socket : Socket
  nombre: string = 'topi';
  message: string = '';
  messages: Message[] = []
  
  constructor(){
    this.socket = io(environment.apiUrl)
  }

  ngOnInit(): void {
      this.socket.on('userConnected', () => {
        console.log('Un usuario se unio al chat!');
      });

      this.socket.on('messageReceived', (message: Message) =>{
        this.messages.push(message);
      })
  }

  enviarMensaje() {
    console.log('Enviar el mensaje');
    this.messages.push({
      message: this.message ,
      username: this.nombre,
      owned:true
    });

    this.socket.emit('sendMessage', {
      message: this.message,
      name: this.nombre
    });
    
  }



}
