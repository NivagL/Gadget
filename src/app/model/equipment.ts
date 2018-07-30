import { Id } from './Id'
import { Location } from './location'

export class Equipment  extends Id {
    // public Id: number;
    public GISID: number; 
    public Name: string;
    public Type: string;
    public SiteAddress: string;
    public GCValue: string;
    public Location: Location; 
};

