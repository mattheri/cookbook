const fauna = require("faunadb");
require("dotenv").config();

class Fauna {
    constructor() { 
        this.secret = process.env.FAUNA_DB_SECRET
    }

    init() {
        return {
            client: new fauna.Client({ secret: this.secret }),
            fauna
        }
    }
}

const { client } = new Fauna().init();

export { fauna, client };