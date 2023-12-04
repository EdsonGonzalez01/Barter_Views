import { Component, OnInit } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/interfaces/user';

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
  userForm: FormGroup;
  user: User = {} as User;
  socket: Socket;
  nombre: string = '';
  message: string = '';
  messages: Message[] = [];
 
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.socket = io(environment.apiUrl);
    this.userForm = this.formBuilder.group({
      name: [''], 
      _id: ['']
    });
  }
 
  ngOnInit(): void {
    this.socket.on('userConnected', () => {
      console.log('Un usuario se unió al chat!');
    });
 
    this.socket.on('messageReceived', (message: Message) => {
      if (message && message.message && message.username) {
        console.log('Mensaje recibido en el cliente:', message);
        message.owned = false;
        this.messages.push(message);
      } else {
        console.error('Invalid message format:', message);
      }
    });
    this.userService.getUser().subscribe(user => {
      console.log(user)
      this.user = user;
      this.userForm.patchValue({
        name: user.name, 
        location: user._id
      });
      this.nombre = this.userForm.get('name')?.value;
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