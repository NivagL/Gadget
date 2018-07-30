import { Id } from './Id'

export class Observation  extends Id {
    public Activity: {Code: string, Version: number};
    public Code: string;
    public Group: string;
    public Text: string;
    public Type: string;
    public ValidCodes: number[];
    public Mandatory?: boolean;
};
