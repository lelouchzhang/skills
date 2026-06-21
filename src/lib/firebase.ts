import { getDataConnect } from "@firebase/data-connect";
import { getApp, getApps, initializeApp } from "firebase/app";
import { connectorConfig } from "#/dataconnect-generated";

const firebaseConfig = {
  appId:import.meta.env.VITE_FIREBASE_APP_ID,
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:import.meta.env.VITE_FIREBASE_PROJECT_ID
}

const requiredKeys = [
  "VITE_FIREBASE_APP_ID",
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
] as const;

for (const key of requiredKeys) {
  if (!import.meta.env[key]) {
    throw new Error(`Missing required Firebase env: ${key}`);
  }
}

export const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const dataConnect = getDataConnect(firebaseApp, connectorConfig);