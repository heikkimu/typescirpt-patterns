import { Observer } from "./observer";
import * as R from "ramda";

class Client {
    constructor(public state: string = "Dog") {}
    public subscriper = (value: any) => (this.state = value);
}

function clientGenerator(prototype: any, count: any): any[] {
    return R.map(() => new prototype(), Array(count));
}

test("Observer invokes the state change", () => {
    const clients = clientGenerator(Client, 5);
    const observer = new Observer();
    const message = "Cat";
    // Subscripe the clients
    R.map((client: Client) => observer.subscripe(client.subscriper), clients);

    // Emit the message
    observer.emit(message);

    // See if the state actually changed
    R.map((client: Client) => expect(client.state).toBe(message), clients);
});

test("Unssubscripe unsubribes the object", () => {
    const clients = clientGenerator(Client, 5);
    const observer = new Observer();
    const message = "Cat";

    // Subscripe the clients
    R.map((client: Client) => observer.subscripe(client.subscriper), clients);
    observer.unsubscripe(clients[0].subscriper);

    observer.emit(message);

    expect(clients[0].state).not.toBe(message);
    expect(clients[1].state).toBe(message);
})
