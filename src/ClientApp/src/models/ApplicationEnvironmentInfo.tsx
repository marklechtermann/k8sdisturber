export interface ApplicationEnvironmentInfo {
  hostname?: string;
  version?: string;
  ipAdresses?: string[];
  osVersion?: string;
  processorCount?: number;
  processId?: number;
  environmentVariables?: { key: string; value: string }[];
  userName?: string;
  userId?: number;
  instanceId?: string;
}
