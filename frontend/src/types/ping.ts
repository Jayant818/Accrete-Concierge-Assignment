export interface Ping {
  id: string;
  text: string;
  ts: number;
  fromMe: boolean;
}

export interface PingWindowProps {
  pings: Ping[];
}
