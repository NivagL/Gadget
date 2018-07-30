import { Id } from './Id'
import { Observation } from './observation';

export class Activity extends Id {
    public Code: string;
    public Version: number;
    public Name: string;
    public Observations?: Array<Observation>;
}

