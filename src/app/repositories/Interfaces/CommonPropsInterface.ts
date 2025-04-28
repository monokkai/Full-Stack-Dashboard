interface IObjectable {
  toObject(): object;
}

export interface CommonPropsInterface {
  item: IObjectable;
  onSave: () => void;
}
