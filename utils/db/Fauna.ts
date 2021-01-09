import fauna from "faunadb";

class Fauna {
    secret: string;

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