import { Id } from './Id'

export class Task  extends Id {
    // public Id: number;
    public WorkOrderId: number;
    public GISID: number;
    public N3ID: string;
    public Activities: {Code: string, Version: number}[];
};

