import { Id } from './Id'
import { Observation } from './observation'

export class InspectionObservation  extends Id {
    public WorkOrderId: number;
    public TaskId: number;
    public EquipmentId: number;
    public InspectionId: string;
    public ActivityId: string;
    public ObservationId: string;
    public Observation: Observation;

    //Can the observation be taken
    public Accessible: boolean; 
    //result...push the code into the document??
    public SelectedCode?: number;
    
    public Document?: string;
    public Notes?: string;
};
