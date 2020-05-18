export interface CourierData {
  _id: string;
  item_name: string;
  item_weight: number;
  pickup_location: string;
  drop_location: string;
  delivery_type: number;
  order_date: Date;
  imagePath: string;
  order_assigner: string;
  work_assigned: string;
  item_status: boolean;
}
