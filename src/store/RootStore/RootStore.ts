import AuthorizationStore from './AuthorizationStore';
import QueryParamsStore from './QueryParamsStore';
import UserStore from './UserStore/UserStore';

export default class RootStore {
  readonly query = new QueryParamsStore();
  readonly user = new UserStore();
  readonly authorization = new AuthorizationStore()
}
