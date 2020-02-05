import * as R from "ramda";

interface callbackFunc {
    (data: any): void;
}

export class Observer {
    private subscripers: callbackFunc[] = [];

    subscripe(subscriper: callbackFunc) {
        this.subscripers.push(subscriper);
    }
    unsubscripe(subscriper: callbackFunc) {
        this.subscripers = R.filter(
            (n: callbackFunc) => n !== subscriper,
            this.subscripers
        );
    }

    emit(value: any) {
        R.map((fn: callbackFunc): void => fn(value), this.subscripers);
    }
}
