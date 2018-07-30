import { Id } from './Id'

export class AccessDetails extends Id {
    // TODO **GL** 
    // public WorkOrderId: number;
    // public TaskId: number;
    // public EquipmentId: number;
    // public InspectionId: number;

    public ContactName: string;
    public ContactPhone: string;
    public EMail: string;

    public Pin: string;
    public Code: string;
    public KeyLocation: string;
    public NoticePeriod: string;

    public OnSiteInduction: string;
    public SiteInstructions: string;

    public Photo?: Blob;
}
