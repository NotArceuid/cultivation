import { InvokeableEvent } from "./Shared/Events";

export let Log: InvokeableEvent<string> = new InvokeableEvent<string>();
Log.add((msg) => console.log(msg));
