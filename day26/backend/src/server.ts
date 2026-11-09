import type { AddressInfo } from "node:net";
import { app } from "./app.js";
import { env } from "./config/env.js";

const server = app.listen(env.PORT, () => {
    const address = server.address() as AddressInfo
    console.log(`Server running at : http://localhost:${address.port}`)
})