import { Component, OnInit } from '@angular/core';
import { io, Socket } from 'socket.io-client';
 
import { environment } from 'src/environments/environment';
 
interface Message {
  message: string;
  username: string;
  owned?: boolean;
}
 
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
 
  socket: Socket;
  nombre: string = 'topi';
  message: string = '';
  messages: Message[] = [];
 
  constructor() {
    this.socket = io(environment.apiUrl);
  }
 
  ngOnInit(): void {
    this.socket.on('userConnected', () => {
      console.log('Un usuario se unió al chat!');
    });
 
    this.socket.on('messageReceived', (message: Message) => {
      if (message && message.message && message.username) {
        console.log('Mensaje recibido en el cliente:', message);
        this.messages.push(message);
      } else {
        console.error('Invalid message format:', message);
      }
    });
   
  }
 
  enviarMensaje() {
    console.log('Enviar el mensaje');
    const newMessage: Message = {
      message: this.message,
      username: this.nombre,
      owned: true
    };
 
    this.messages.push(newMessage);
 
    this.socket.emit('messageSent', newMessage);
 
    console.log('New message:', newMessage);
  }
 
}
 
