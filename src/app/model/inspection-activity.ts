import { Id } from './Id'
import { Activity } from './activity';

export class InspectionActivity extends Id {
    // public Id: number;
    public WorkOrderId: number;
    public TaskId: number;
    public EquipmentId: number;
    public InspectionId: string;
    public Activity: Activity;
    public Expanded: boolean;
    public CompletedOn?: Date;
}
