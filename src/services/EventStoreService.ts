import {injectable} from 'inversify';
import IEventStore from '../interfaces/eventStore';

@injectable()
export class EventStoreService implements IEventStore {
  private events: string[] = [];

  push(event: string) {
    this.events.push(event);
  }
}
