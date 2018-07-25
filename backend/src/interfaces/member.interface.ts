
import { IAccount } from './app.interfaces';
import { Document } from 'mongoose';
export interface IMemberDocument extends IAccount, Document { }