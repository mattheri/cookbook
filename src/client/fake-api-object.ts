import { ApiObject } from "common/common";
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
class FakeApiObject {
  createFakeApiObject<T = any>(object: T) {
    return {
      _id: this.createFakeId(),
      ...object,
      ...this.createFakeDate(),
    } as T & ApiObject;
  }

  private createFakeId() {
    return Math.random().toString(36).slice(2);
  }

  private createFakeDate() {
    return {
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
  }
}

export default FakeApiObject;
