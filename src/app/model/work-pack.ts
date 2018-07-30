import { Id } from './Id'

export class WorkPack extends Id {
    public Title: string;
    public StandardCode: string;
    public Standard: string;
    public StartDate: Date;
    public EndDate: Date;
    public Grouping: string;
};
