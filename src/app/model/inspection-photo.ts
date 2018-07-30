import { Id } from './Id'
import { Location } from './location'
import { Observation } from './observation'

export class InspectionPhoto extends Id {
    public WorkOrderId: number;
    public TaskId: number;
    public EquipmentId: number;
    public InspectionId: string;
    public TakenOn: string;
    public TakenAt: Location;
    public Observation?: Observation;
    public Text?: string;
    public Photo?: Blob;
}
