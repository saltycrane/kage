/* @flow */

export type ApiStatus = {|
  error: ?string,
  loading: boolean,
  success: boolean,
|};

export type Auth = {|
  token: ?string,
  uid: ?string,
|};

export type CurrentUser =
  | {|
      displayName: string,
      email: string,
      emailVerified: boolean,
      isAnonymous: boolean,
      photoURL: string,
      providerId: ?string,
      providerData: Array<*>,
      token: string,
      uid: string,
    |}
  | null;

export type Task = {|
  completed?: boolean,
  completedAt?: number,
  createdAt: number,
  id: string,
  isDeleted?: boolean,
  tags?: Array<string>,
  text: string,
|};

export type Place = Object;

export type SelectedModal = null | "reauth" | "signin" | "signup";

export type User = {|
  createdAt: number,
  email: string,
  id: string,
  username?: string,
|};
