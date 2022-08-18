import { injectable } from "inversify";
import { object } from "yup";

interface ApiResponseObject {
  __typename?: string;
}

@injectable()
class TypenameRemove {
  remove<T extends ApiResponseObject>(responeObject: T): T {
    if (responeObject.__typename) {
      delete responeObject.__typename;
    }

    return responeObject;
  }
}

export default TypenameRemove;
