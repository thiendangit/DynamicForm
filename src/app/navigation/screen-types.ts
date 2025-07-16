/* eslint-disable @typescript-eslint/no-namespace */
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum APP_SCREEN {
  BOTTOM_TAB = 'BOTTOM_TAB',
  PROFILE = 'PROFILE',
  BUILDER = 'BUILDER',
}

export type RootStackParamList = {
  [APP_SCREEN.BOTTOM_TAB]: undefined;
  [APP_SCREEN.PROFILE]: undefined;
  [APP_SCREEN.BUILDER]: undefined;
};

export type StackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}
