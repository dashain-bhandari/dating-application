import User from '../users/user.entity';
import { Socket } from 'socket.io';

type AuthPayload={
  userId:string;
}
export type AuthenticatedSocket=Socket & AuthPayload
