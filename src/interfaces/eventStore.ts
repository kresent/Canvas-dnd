export default interface IEventStore {
  push: (event: string) => void;
}
