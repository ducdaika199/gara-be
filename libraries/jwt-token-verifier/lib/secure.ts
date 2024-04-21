import { authentication } from './authentication';

export function secure(options?: {
  authenticationFuncs?: any[];
  authorizationFuncs?: any[];
}) {
  const middlewares: any[] = [];
  if (options?.authenticationFuncs && options?.authenticationFuncs.length > 0) {
    console.log('check call function secure');
    options.authenticationFuncs.forEach((item) => middlewares.push(item));
  } else {
    middlewares.push(authentication);
  }
  if (options?.authorizationFuncs && options?.authorizationFuncs?.length > 0) {
    options.authorizationFuncs.forEach((item) => middlewares.push(item));
  }
  return middlewares;
}
