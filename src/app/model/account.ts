import { Id } from './Id'

export class Account extends Id 
{
    // public _id: string;
    // public _rev: string;
    public Inspector: string;
    public Network: string;
    public EMail: string;
    public Phone: string;
    public Mobile: string;
}
