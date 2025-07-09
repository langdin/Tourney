import { Point } from './point';
import { BoutID } from './boutids';

export class Player {
  _id: string;
  name: string;
  points: Point[];
  bouts: BoutID[];
}
