import { Id } from './Id'

// import { Task } from './task';
// import { Equipment } from './equipment';
// import { Activity } from './activity';
// import { InspectionActivity } from './inspection-activity';

import { AccessDetails } from './access';
import { Location } from './location';

export class Inspection  extends Id {
    public WorkOrderId: number;
    public TaskId: number;
    public EquipmentId: number;
    
    public SiteAddress: string;
    public GISID: number;
    public Name: string;
    public Type: string;
    public GCValue: string;
    public Location: Location;
    
    public Inspector: string;
    public CreatedOn: string; //Date;
    public Status: string; 
    
    public Accessible: boolean; 
    public Access: AccessDetails; 
    public Notes: string; 
}
